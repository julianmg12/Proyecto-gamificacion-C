// src/ui/FriendSearch.jsx
import React, { useState } from "react";
import { useFriends } from "../contexts/FriendsContext";

export default function FriendSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const { searchUsers, sendInvite, currentUserId } = useFriends();

  const doSearch = () => setResults(searchUsers(q, currentUserId));

  const handleInvite = (id) => {
    const res = sendInvite(currentUserId, id);
    if (res?.error) alert(res.error);
    else doSearch();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Buscar usuarios</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca por nombre o usuario"
          style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e6e0f6" }}
        />
        <button onClick={doSearch} style={{ padding: "8px 12px", borderRadius: 8 }}>Buscar</button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {results.map((u) => (
          <li key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {(u.displayName || u.username).charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{u.displayName || u.username}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{u.username} • {u.relation}</div>
            </div>

            {u.relation === "none" && <button onClick={() => handleInvite(u.id)}>Invitar</button>}
            {u.relation === "outgoing" && <button disabled>Invitación enviada</button>}
            {u.relation === "incoming" && <button disabled>Te invitó</button>}
            {u.relation === "friend" && <button disabled>Amigo</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
