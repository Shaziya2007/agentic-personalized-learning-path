import React from "react";
import { IconSparkles } from "./Icons";

export const LoadingState = ({
  message = "Loading...",
  subMessage = "Aligning learning path with Course Outcomes...",
  isGenerating = false
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "var(--radius-full)",
          background: "var(--primary-light)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          boxShadow: "0 0 0 8px rgba(37, 99, 235, 0.1)",
          animation: "pulse 2s infinite"
        }}
      >
        <IconSparkles size={28} />
      </div>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
        {message}
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: "420px" }}>
        {subMessage}
      </p>

      {isGenerating && (
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", maxWidth: "340px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--success)" }}>
            <span>✓</span> <span>Synthesizing student profile & weak areas</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--success)" }}>
            <span>✓</span> <span>Mapping Course Outcomes (CO1 - CO5)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--primary)" }}>
            <span>●</span> <span>Generating phases, topics, and milestones...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
