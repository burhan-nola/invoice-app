import React from "react";
import "../styles/loader/loading.css";

export const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <span className="loader"></span>
    </div>
  );
};
