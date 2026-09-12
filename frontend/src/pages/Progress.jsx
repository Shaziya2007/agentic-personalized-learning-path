import React from "react";
import { Link } from "react-router-dom";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import PerformanceBadge from "../components/PerformanceBadge";
import Button from "../components/Button";
import {
  IconProgress,
  IconCheckCircle,
  IconClock,
  IconAssessment,
  IconRoadmap
} from "../components/Icons";

export const Progress = () => {
  const { roadmap, activities } = useLearning();

  const totalTopics = roadmap?.totalTopics || 8;
  const completedTopics = roadmap?.completedTopics || 3;
  const remainingTopics = Math.max(0, totalTopics - completedTopics);
  const overallPercentage = roadmap?.overallProgress || 0;

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
            Academic Telemetry
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Progress Tracking & Analytics
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Real-time monitoring of curriculum completion, phase pacing, and diagnostic evaluation history.
          </p>
        </div>

        <Link to="/roadmap">
          <Button variant="primary" icon={IconRoadmap}>
            View Roadmap
          </Button>
        </Link>
      </div>

      {/* High-Level Progress Metric Cards */}
      <div className="grid-4" style={{ marginBottom: "1.75rem" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>OVERALL COMPLETION</span>
            <IconCheckCircle size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "0.5rem" }}>
            {overallPercentage}%
          </div>
          <ProgressBar value={overallPercentage} showPercentage={false} height={6} />
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>COMPLETED TOPICS</span>
            <IconCheckCircle size={18} style={{ color: "var(--success)" }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--success)" }}>
            {completedTopics}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Modules verified & passed</span>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>REMAINING TOPICS</span>
            <IconClock size={18} style={{ color: "var(--warning)" }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--warning)" }}>
            {remainingTopics}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Modules scheduled in active phases</span>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>ESTIMATED HOURS</span>
            <IconProgress size={18} style={{ color: "var(--purple)" }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--purple)" }}>
            {roadmap?.availableHoursPerWeek || 12}h
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target pace: {roadmap?.targetDuration || "8 Weeks"}</span>
        </Card>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column: Phase by Phase Completion & Assessment History */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Phase-wise Completion Breakdown */}
          <Card title="Curriculum Phase Breakdown" subtitle="Detailed breakdown of topic completion per phase">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {roadmap?.phases?.map((phase) => {
                const total = phase.topics.length;
                const completed = phase.topics.filter((t) => t.status === "Completed").length;
                const percent = Math.round((completed / (total || 1)) * 100);

                return (
                  <div
                    key={phase.id}
                    style={{
                      background: "var(--bg-subtle)",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <div>
                        <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          Phase {phase.phaseNumber}: {phase.title}
                        </h4>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{phase.duration}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontWeight: 800, fontSize: "1.1rem", color: percent === 100 ? "var(--success)" : "var(--primary)" }}>
                          {percent}%
                        </span>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          {completed} / {total} Topics
                        </div>
                      </div>
                    </div>

                    <ProgressBar value={percent} showPercentage={false} height={8} />

                    {/* Sub topics chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
                      {phase.topics.map((topic) => (
                        <Link
                          key={topic.id}
                          to={`/topics/${topic.id}`}
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-color)",
                            background: topic.status === "Completed" ? "var(--success-light)" : topic.status === "Needs Review" ? "var(--danger-light)" : "var(--bg-card)",
                            color: topic.status === "Completed" ? "var(--success)" : topic.status === "Needs Review" ? "var(--danger)" : "var(--text-primary)",
                            textDecoration: "none",
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem"
                          }}
                        >
                          <span>{topic.id}</span>
                          <span>•</span>
                          <span>{topic.status}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Assessment Scores History Log */}
          <Card title="Assessment Score Telemetry" subtitle="Recorded diagnostic assessments and cognitive verification tests">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    Algorithmic Complexity & Big-O Notation (T101)
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Verified on 2026-09-08 • Outcome CO1 / PO1
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--success)" }}>90%</span>
                  <div><PerformanceBadge level="STRONG" /></div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    Data Structures: Trees, Hash Maps & Graphs (T102)
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Verified on 2026-09-11 • Outcome CO1 / PO2
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--success)" }}>85%</span>
                  <div><PerformanceBadge level="STRONG" /></div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    Architectural Patterns & REST Contract Design (T201)
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    In Diagnostic Session • Outcome CO2 / PO3
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Link to="/assessment/T201">
                    <Button size="sm" variant="outline" icon={IconAssessment}>
                      Attempt Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card title="Recent Activity Audit" subtitle="Chronological timeline of learner interactions">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {activities?.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    paddingBottom: "0.85rem",
                    borderBottom: "1px solid var(--border-color)"
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--primary)",
                      marginTop: "0.4rem",
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.86rem", color: "var(--text-primary)" }}>
                        {activity.title}
                      </span>
                      {activity.badge && (
                        <span style={{ fontSize: "0.7rem", background: "var(--bg-subtle)", padding: "0.1rem 0.4rem", borderRadius: "3px", fontWeight: 600 }}>
                          {activity.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem", lineHeight: 1.4 }}>
                      {activity.description}
                    </p>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
