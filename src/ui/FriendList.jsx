// src/ui/FriendList.jsx
import React, { useEffect, useState } from "react";
import { useFriends } from "../contexts/FriendsContext";

export default function FriendList() {
  const { getFriends, state, currentUserId, unfriend } = useFriends();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getFriends(currentUserId));
  }, [state]);

  const handleUnfriend = (id) => {
    if (!confirm("¿Deseas eliminar a este amigo?")) return;
    unfriend(currentUserId, id);
    setList(getFriends(currentUserId));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Mis amigos</h3>
      {list.length === 0 ? <div>No tienes amigos aún</div> : (
        <ul>
          {list.map((u) => (
            <li key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #eee" }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {(u.displayName || u.username).charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{u.displayName}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{u.username}</div>
              </div>
              <button onClick={() => handleUnfriend(u.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
