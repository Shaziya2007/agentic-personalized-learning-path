import React from "react";
import TopicCard from "./TopicCard";
import { IconTarget } from "./Icons";

export const PhaseCard = ({ phase, onStartTopic }) => {
  const completedCount = phase.topics.filter(t => t.status === "Completed").length;
  const isPhaseCompleted = completedCount === phase.topics.length && phase.topics.length > 0;

  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* Phase Header Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--bg-subtle)",
          padding: "1rem 1.25rem",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          border: "1px solid var(--border-color)",
          borderBottom: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-md)",
              background: isPhaseCompleted ? "var(--success)" : "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.95rem"
            }}
          >
            {phase.phaseNumber}
          </div>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Phase {phase.phaseNumber}: {phase.title}
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{phase.duration}</span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: isPhaseCompleted ? "var(--success)" : "var(--primary)" }}>
            {completedCount} / {phase.topics.length} Topics Completed
          </span>
        </div>
      </div>

      {/* Phase Description & Milestone Body */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderTop: "none",
          padding: "1.25rem",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          {phase.description}
        </p>

        {phase.milestone && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--primary-light)", border: "1px solid var(--primary-border)", padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.84rem", color: "var(--primary)" }}>
            <IconTarget size={16} />
            <span><strong>Phase Milestone:</strong> {phase.milestone}</span>
          </div>
        )}

        {/* Topics List */}
        <div style={{ marginTop: "1rem" }}>
          {phase.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} onStart={onStartTopic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;
