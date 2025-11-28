// src/contexts/FriendsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "tuDiario_friends_demo_v1";
const FriendsContext = createContext(null);

const initialState = () => {
  const users = [
    { id: 1, username: "you", displayName: "Tú (usuario actual)", avatar: "" },
    { id: 2, username: "ana", displayName: "Ana Pérez", avatar: "" },
    { id: 3, username: "carlos", displayName: "Carlos Gómez", avatar: "" },
    { id: 4, username: "laura", displayName: "Laura Ruiz", avatar: "" },
    { id: 5, username: "maria", displayName: "María López", avatar: "" },
    { id: 6, username: "pedro", displayName: "Pedro Torres", avatar: "" },
    { id: 7, username: "sofia", displayName: "Sofía Díaz", avatar: "" },
  ];

  const friendRequests = [
    { id: 1, senderId: 2, receiverId: 1, status: "pending" },
    { id: 2, senderId: 3, receiverId: 1, status: "pending" },
    { id: 3, senderId: 1, receiverId: 4, status: "pending" },
  ];

  const friendships = [
    [1, 5],
    [1, 6],
  ];

  return { users, friendRequests, friendships, nextRequestId: 4 };
};

export function FriendsProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
      return initialState();
    } catch (e) {
      console.error("FriendsContext init error", e);
      return initialState();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const isFriend = (a, b) => {
    const [x, y] = a < b ? [a, b] : [b, a];
    return state.friendships.some((pair) => pair[0] === x && pair[1] === y);
  };

  const getRequestBetween = (a, b) => {
    return state.friendRequests.find(
      (fr) =>
        (fr.senderId === a && fr.receiverId === b) ||
        (fr.senderId === b && fr.receiverId === a)
    );
  };

  const sendInvite = (senderId, receiverId) => {
    if (senderId === receiverId) return { error: "No puedes invitarte a ti mismo" };
    if (isFriend(senderId, receiverId)) return { error: "Ya son amigos" };

    const existing = getRequestBetween(senderId, receiverId);
    if (existing) {
      if (existing.senderId === receiverId && existing.status === "pending") {
        return acceptRequest(existing.id, senderId);
      }
      return { error: "Ya existe una solicitud entre estos usuarios" };
    }

    const newReq = {
      id: state.nextRequestId,
      senderId,
      receiverId,
      status: "pending",
    };
    setState((prev) => ({
      ...prev,
      friendRequests: [newReq, ...prev.friendRequests],
      nextRequestId: prev.nextRequestId + 1,
    }));
    return { ok: true, request: newReq };
  };

  const acceptRequest = (requestId, actorId) => {
    const req = state.friendRequests.find((r) => r.id === requestId);
    if (!req) return { error: "Solicitud no encontrada" };
    if (req.receiverId !== actorId) return { error: "No puedes aceptar esta solicitud" };
    if (req.status !== "pending") return { error: "Solicitud no pendiente" };

    const a = Math.min(req.senderId, req.receiverId),
      b = Math.max(req.senderId, req.receiverId);

    setState((prev) => {
      const newReqs = prev.friendRequests.map((r) =>
        r.id === requestId ? { ...r, status: "accepted" } : r
      );
      const already = prev.friendships.some((pair) => pair[0] === a && pair[1] === b);
      const newFriends = already ? prev.friendships : [[a, b], ...prev.friendships];
      return { ...prev, friendRequests: newReqs, friendships: newFriends };
    });

    return { ok: true };
  };

  const rejectRequest = (requestId, actorId) => {
    const req = state.friendRequests.find((r) => r.id === requestId);
    if (!req) return { error: "Solicitud no encontrada" };
    if (req.receiverId !== actorId) return { error: "No puedes rechazar esta solicitud" };
    if (req.status !== "pending") return { error: "Solicitud no pendiente" };

    setState((prev) => ({
      ...prev,
      friendRequests: prev.friendRequests.map((r) =>
        r.id === requestId ? { ...r, status: "rejected" } : r
      ),
    }));
    return { ok: true };
  };

  const cancelOutgoing = (requestId, actorId) => {
    const req = state.friendRequests.find((r) => r.id === requestId);
    if (!req) return { error: "Solicitud no encontrada" };
    if (req.senderId !== actorId) return { error: "No puedes cancelar esta solicitud" };
    if (req.status !== "pending") return { error: "Solicitud no pendiente" };

    setState((prev) => ({
      ...prev,
      friendRequests: prev.friendRequests.map((r) =>
        r.id === requestId ? { ...r, status: "cancelled" } : r
      ),
    }));
    return { ok: true };
  };

  const unfriend = (userA, userB) => {
    const a = Math.min(userA, userB),
      b = Math.max(userA, userB);
    setState((prev) => ({
      ...prev,
      friendships: prev.friendships.filter((pair) => !(pair[0] === a && pair[1] === b)),
    }));
    return { ok: true };
  };

  const getIncomingRequests = (userId) =>
    state.friendRequests.filter((r) => r.receiverId === userId && r.status === "pending");
  const getOutgoingRequests = (userId) =>
    state.friendRequests.filter((r) => r.senderId === userId && r.status === "pending");
  const getFriends = (userId) =>
    state.friendships
      .filter((pair) => pair[0] === userId || pair[1] === userId)
      .map((pair) => (pair[0] === userId ? pair[1] : pair[0]))
      .map((id) => state.users.find((u) => u.id === id));

  const searchUsers = (q, currentUserId) => {
    const term = (q || "").toLowerCase().trim();
    return state.users
      .filter((u) => u.id !== currentUserId && ((u.username || "").toLowerCase().includes(term) || (u.displayName || "").toLowerCase().includes(term)))
      .map((u) => {
        if (isFriend(currentUserId, u.id)) return { ...u, relation: "friend" };
        const existing = getRequestBetween(currentUserId, u.id);
        if (existing) {
          if (existing.senderId === currentUserId) return { ...u, relation: existing.status === "pending" ? "outgoing" : existing.status };
          return { ...u, relation: existing.status === "pending" ? "incoming" : existing.status };
        }
        return { ...u, relation: "none" };
      });
  };

  return (
    <FriendsContext.Provider
      value={{
        state,
        sendInvite,
        acceptRequest,
        rejectRequest,
        cancelOutgoing,
        unfriend,
        getIncomingRequests,
        getOutgoingRequests,
        getFriends,
        searchUsers,
        currentUserId: 1,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export const useFriends = () => {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error("useFriends must be used inside FriendsProvider");
  return ctx;
};
