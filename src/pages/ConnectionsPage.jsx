// src/pages/ConnectionsPage.jsx
import React from "react";
import FriendSearch from "../ui/FriendSearch";
import IncomingRequests from "../ui/IncomingRequests";
import OutgoingRequests from "../ui/OutgoingRequests";
import FriendList from "../ui/FriendList";

export default function ConnectionsPage() {
  return (
    <div style={{ padding: 20, maxWidth: 960, margin: "0 auto" }}>
            <h2
          style={{
            marginBottom: "20px",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Mis contactos
        </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div>
          <FriendSearch />
          <FriendList />
        </div>
        <div>
          <IncomingRequests />
          <OutgoingRequests />
        </div>
      </div>
    </div>
  );
}
