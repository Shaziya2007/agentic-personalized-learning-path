import React from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PerformanceBadge from "./PerformanceBadge";
import { IconCheckCircle, IconTarget } from "./Icons";

export const OutcomeCard = ({ outcome }) => {
  const isTargetMet = outcome.currentAttainment >= outcome.targetAttainment;

  return (
    <Card className="outcome-card" style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <PerformanceBadge type={outcome.code} />
            {outcome.bloomLevel && (
              <span style={{ fontSize: "0.75rem", color: "var(--purple)", background: "var(--purple-light)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                {outcome.bloomLevel}
              </span>
            )}
          </div>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{outcome.title}</h4>
        </div>
        <div style={{ textAlign: "right", minWidth: "110px" }}>
          <span style={{ fontSize: "1.35rem", fontWeight: 800, color: isTargetMet ? "var(--success)" : "var(--warning)" }}>
            {outcome.currentAttainment}%
          </span>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Target: {outcome.targetAttainment}%
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.45 }}>
        {outcome.description}
      </p>

      {/* Attainment Visualizer */}
      <div style={{ marginBottom: "1rem" }}>
        <ProgressBar
          value={outcome.currentAttainment}
          target={outcome.targetAttainment}
          showPercentage={false}
          height={7}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
          <span>Attainment Level</span>
          <span style={{ color: isTargetMet ? "var(--success)" : "var(--warning)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {isTargetMet ? <IconCheckCircle size={13} /> : <IconTarget size={13} />}
            {isTargetMet ? "Outcome Target Achieved" : "Needs Targeted Attainment"}
          </span>
        </div>
      </div>

      {/* Related Learning Objectives */}
      {outcome.relatedLearningObjectives && outcome.relatedLearningObjectives.length > 0 && (
        <div style={{ marginTop: "0.75rem", background: "var(--bg-subtle)", padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
            Mapped Learning Objectives:
          </div>
          <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {outcome.relatedLearningObjectives.map((lo, idx) => (
              <li key={idx}>{lo}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Aligned Topics */}
      {outcome.contributingTopicIds && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.85rem", fontSize: "0.78rem" }}>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Contributing Modules:</span>
          {outcome.contributingTopicIds.map((tid) => (
            <span
              key={tid}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600
              }}
            >
              {tid}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default OutcomeCard;
