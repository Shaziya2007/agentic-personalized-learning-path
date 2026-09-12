import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import roadmapService from "../services/roadmapService";
import Card from "../components/Card";
import Button from "../components/Button";
import PerformanceBadge from "../components/PerformanceBadge";
import LoadingState from "../components/LoadingState";
import {
  IconAssessment,
  IconBookOpen,
  IconTarget
} from "../components/Icons";

export const TopicDetails = () => {
  const { topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopic() {
      setLoading(true);
      try {
        const data = await roadmapService.getTopicDetails(topicId || "T201");
        setTopic(data);
      } catch (err) {
        console.error("Failed to load topic details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "4rem 0" }}>
        <LoadingState message="Loading Topic Details..." />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="page-container">
        <Card>
          <h3>Topic Not Found</h3>
          <p>The requested topic could not be located.</p>
          <Link to="/roadmap">
            <Button variant="primary" style={{ marginTop: "1rem" }}>
              Return to Roadmap
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Breadcrumb Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        <Link to="/roadmap">Roadmap</Link>
        <span>/</span>
        <span>{topic.phaseTitle || "Phase Details"}</span>
        <span>/</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{topic.id}</span>
      </div>

      {/* Main Header Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "1.75rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "var(--bg-subtle)", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>
              {topic.id}
            </span>
            <PerformanceBadge status={topic.status} />
            <PerformanceBadge type={topic.co} />
            <PerformanceBadge type={topic.po} />
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            {topic.topicName}
          </h1>
        </div>

        {/* Assessment Action Button */}
        <div>
          <Link to={`/assessment/${topic.id}`}>
            <Button variant="primary" size="lg" icon={IconAssessment} iconPosition="left">
              Take Assessment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column: Conceptual Content & Activities */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* 1. Learning Objective */}
          <Card title="Learning Objective" subtitle="Competency standard expected upon module completion">
            <div style={{ background: "var(--primary-light)", border: "1px solid var(--primary-border)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--primary)", fontWeight: 600, lineHeight: 1.5 }}>
                {topic.learningObjective}
              </p>
            </div>
          </Card>

          {/* 2. Concept Explanation */}
          <Card title="Concept Overview & Deep Dive" subtitle="Theoretical and architectural principles">
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {topic.explanation}
            </p>
          </Card>

          {/* 3. Hands-on Activities */}
          <Card title="Practical Engineering Activities" subtitle="Tasks designed to evaluate real-world problem solving">
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {topic.activities?.map((activity, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                    color: "var(--text-primary)"
                  }}
                >
                  <div style={{ width: "22px", height: "22px", borderRadius: "var(--radius-full)", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>
                    {idx + 1}
                  </div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right Column: Outcomes, Resources & Milestone */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* OBE Alignment Box */}
          <Card title="Outcome-Based Education">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "var(--purple-light)", border: "1px solid var(--purple-border)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--purple)" }}>COURSE OUTCOME: {topic.co}</span>
                <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  Directly contributes to CO attainment percentage in your academic profile.
                </p>
              </div>

              <div style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#166534" }}>PROGRAM OUTCOME: {topic.po}</span>
                <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", marginTop: "0.25rem" }}>
                  Aligns with institutional graduate engineering attributes.
                </p>
              </div>
            </div>
          </Card>

          {/* Module Milestone */}
          {topic.milestone && (
            <Card title="Module Milestone">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <IconTarget size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.15rem" }} />
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500 }}>
                  {topic.milestone}
                </p>
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Estimated Effort: <strong>{topic.estimatedHours} Hours</strong>
              </div>
            </Card>
          )}

          {/* Curated Resources */}
          <Card title="Learning Resources">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {topic.resources?.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-subtle)",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <IconBookOpen size={16} style={{ color: "var(--primary)" }} />
                    <span style={{ fontWeight: 600 }}>{res.title}</span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "var(--bg-card)", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>
                    {res.type}
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
