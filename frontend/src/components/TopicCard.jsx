import React, { useState } from "react";
import { Link } from "react-router-dom";
import PerformanceBadge from "./PerformanceBadge";
import Button from "./Button";
import {
  IconBookOpen,
  IconChevronDown,
  IconChevronRight,
  IconClock,
  IconTarget,
  IconSparkles
} from "./Icons";

export const TopicCard = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColorBorder = () => {
    switch (topic.status) {
      case "Completed":
        return "2px solid var(--success-border)";
      case "In Progress":
        return "2px solid var(--primary-border)";
      case "Needs Review":
        return "2px solid var(--danger-border)";
      default:
        return "1px solid var(--border-color)";
    }
  };

  return (
    <div
      className="card"
      style={{
        border: getStatusColorBorder(),
        marginBottom: "1rem",
        background: topic.isRemedial ? "#fffbfb" : topic.isAdvanced ? "#fbfaff" : "var(--bg-card)",
        transition: "var(--transition)"
      }}
    >
      {/* Top Meta Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.6rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
            {topic.id}
          </span>
          <PerformanceBadge status={topic.status} />
          {topic.co && <PerformanceBadge type={topic.co} />}
          {topic.po && <PerformanceBadge type={topic.po} />}
          {topic.isRemedial && (
            <span style={{ fontSize: "0.72rem", background: "var(--danger-light)", color: "var(--danger)", border: "1px solid var(--danger-border)", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700 }}>
              Remedial Adaptation
            </span>
          )}
          {topic.isAdvanced && (
            <span style={{ fontSize: "0.72rem", background: "var(--purple-light)", color: "var(--purple)", border: "1px solid var(--purple-border)", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <IconSparkles size={12} /> Honors Elective
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <IconClock size={14} />
          <span>{topic.estimatedHours} hrs</span>
        </div>
      </div>

      {/* Main Topic Title */}
      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
        {topic.topicName}
      </h4>

      {/* Learning Objective */}
      <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "0.85rem", lineHeight: 1.45 }}>
        <strong>Objective:</strong> {topic.learningObjective}
      </p>

      {/* Milestone Snippet */}
      {topic.milestone && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", marginBottom: "0.85rem" }}>
          <IconTarget size={14} style={{ color: "var(--primary)" }} />
          <span><strong>Milestone:</strong> {topic.milestone}</span>
        </div>
      )}

      {/* Expandable Resources & Activities Section */}
      {isExpanded && (
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", marginTop: "0.5rem" }}>
          {/* Resources */}
          {topic.resources && topic.resources.length > 0 && (
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Curated Learning Resources:
              </span>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.3rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {topic.resources.map((res, i) => (
                  <li key={i} style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <IconBookOpen size={13} style={{ color: "var(--primary)" }} />
                    <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{res.title}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>
                      {res.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Activities */}
          {topic.activities && topic.activities.length > 0 && (
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Hands-on Engineering Activities:
              </span>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", marginTop: "0.3rem", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {topic.activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ fontSize: "0.82rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          {isExpanded ? <IconChevronDown size={15} /> : <IconChevronRight size={15} />}
          {isExpanded ? "Hide Details" : "View Resources & Activities"}
        </button>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to={`/topics/${topic.id}`}>
            <Button size="sm" variant={topic.status === "Completed" ? "secondary" : "primary"}>
              {topic.status === "Completed" ? "Review Topic" : "Start Topic"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
