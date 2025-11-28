// src/ui/OutgoingRequests.jsx
import React, { useEffect, useState } from "react";
import { useFriends } from "../contexts/FriendsContext";

export default function OutgoingRequests() {
  const { getOutgoingRequests, state, cancelOutgoing, currentUserId } = useFriends();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getOutgoingRequests(currentUserId));
  }, [state]);

  const cancel = (id) => {
    const res = cancelOutgoing(id, currentUserId);
    if (res?.error) alert(res.error);
    else setList(getOutgoingRequests(currentUserId));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Invitaciones enviadas</h3>
      {list.length === 0 ? <div>No has enviado invitaciones</div> : (
        <ul>
          {list.map((r) => {
            const u = state.users.find((x) => x.id === r.receiverId);
            return (
              <li key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(u.displayName || u.username).charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{u.displayName}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{u.username}</div>
                </div>
                <button onClick={() => cancel(r.id)}>Cancelar</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
