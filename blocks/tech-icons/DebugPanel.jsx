// DebugPanel.js
import React from "react";

const DebugPanel = ({ data = {}, visible = false }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0.5em",
        right: "0.5em",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#0f0",
        fontSize: "0.75em",
        padding: "1em",
        borderRadius: "0.5em",
        zIndex: 9999,
        maxWidth: "300px",
        overflowWrap: "break-word",
      }}
    >
      <h4 style={{ marginTop: 0, color: "#0f0" }}>Debug Info</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugPanel;
