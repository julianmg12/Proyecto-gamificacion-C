// src/ui/IncomingRequests.jsx
import React, { useEffect, useState } from "react";
import { useFriends } from "../contexts/FriendsContext";

export default function IncomingRequests() {
  const { getIncomingRequests, state, acceptRequest, rejectRequest, currentUserId } = useFriends();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getIncomingRequests(currentUserId));
  }, [state]);

  const accept = (id) => {
    const res = acceptRequest(id, currentUserId);
    if (res?.error) alert(res.error);
    else setList(getIncomingRequests(currentUserId));
  };
  const reject = (id) => {
    const res = rejectRequest(id, currentUserId);
    if (res?.error) alert(res.error);
    else setList(getIncomingRequests(currentUserId));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Invitaciones recibidas</h3>
      {list.length === 0 ? <div>No hay invitaciones</div> : (
        <ul>
          {list.map((r) => {
            const u = state.users.find((x) => x.id === r.senderId);
            return (
              <li key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(u.displayName || u.username).charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{u.displayName}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{u.username}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => accept(r.id)}>Aceptar</button>
                  <button onClick={() => reject(r.id)}>Rechazar</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
