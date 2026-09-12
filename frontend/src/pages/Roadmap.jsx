import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLearning } from "../context/LearningContext";
import PhaseCard from "../components/PhaseCard";
import RoadmapCard from "../components/RoadmapCard";
import Button from "../components/Button";
import { IconSparkles, IconOutcomes } from "../components/Icons";

export const Roadmap = () => {
  const navigate = useNavigate();
  const { roadmap } = useLearning();

  const handleStartTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem"
        }}
      >
        <div>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Curriculum Structure
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Generated Learning Roadmap
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Hierarchical breakdown of learning phases, topics, outcome mappings, and milestones.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/outcomes">
            <Button variant="outline" size="sm" icon={IconOutcomes}>
              View CO/PO Attainment
            </Button>
          </Link>
          <Link to="/create-learning-path">
            <Button variant="secondary" size="sm" icon={IconSparkles}>
              Regenerate Path
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Level Roadmap Summary Card */}
      <div style={{ marginBottom: "2.5rem" }}>
        <RoadmapCard roadmap={roadmap} />
      </div>

      {/* Roadmap Phase Timeline */}
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Roadmap Progression Timeline
          </h2>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>
            {roadmap?.phases?.length || 0} Sequential Phases
          </span>
        </div>

        {roadmap?.phases?.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            onStartTopic={handleStartTopic}
          />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
