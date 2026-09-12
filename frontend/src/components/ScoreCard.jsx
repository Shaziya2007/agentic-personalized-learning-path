import React from "react";
import PerformanceBadge from "./PerformanceBadge";

export const ScoreCard = ({
  score = 0,
  correctCount = 0,
  totalQuestions = 5,
  performanceLevel = "MODERATE",
  title = "Assessment Score",
  className = ""
}) => {
  let scoreColor = "var(--warning)";
  let bgColor = "var(--warning-light)";
  let borderColor = "var(--warning-border)";

  if (score >= 80) {
    scoreColor = "var(--success)";
    bgColor = "var(--success-light)";
    borderColor = "var(--success-border)";
  } else if (score < 50) {
    scoreColor = "var(--danger)";
    bgColor = "var(--danger-light)";
    borderColor = "var(--danger-border)";
  }

  return (
    <div
      className={`card ${className}`}
      style={{
        background: bgColor,
        borderColor: borderColor,
        textAlign: "center",
        padding: "1.75rem 1.25rem"
      }}
    >
      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {title}
      </span>
      <div style={{ fontSize: "3rem", fontWeight: 800, color: scoreColor, margin: "0.5rem 0" }}>
        {score}%
      </div>
      <div style={{ marginBottom: "0.75rem" }}>
        <PerformanceBadge level={performanceLevel} />
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <strong>{correctCount}</strong> of <strong>{totalQuestions}</strong> questions answered correctly
      </p>
    </div>
  );
};

export default ScoreCard;
