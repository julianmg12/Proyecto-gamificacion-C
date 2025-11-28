// src/pages/ConnectionsPage.jsx
import React from "react";
import FriendSearch from "../ui/FriendSearch";
import IncomingRequests from "../ui/IncomingRequests";
import OutgoingRequests from "../ui/OutgoingRequests";
import FriendList from "../ui/FriendList";

export default function ConnectionsPage() {
  return (
    <div style={{ padding: 20, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ color: "#2a007f" }}>Conexiones</h1>
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
