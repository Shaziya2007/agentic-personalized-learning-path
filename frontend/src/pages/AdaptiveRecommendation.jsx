import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import assessmentService from "../services/assessmentService";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import Button from "../components/Button";
import PerformanceBadge from "../components/PerformanceBadge";
import LoadingState from "../components/LoadingState";
import {
  IconSparkles,
  IconRoadmap
} from "../components/Icons";

export const AdaptiveRecommendation = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const { applyAdaptiveModification } = useLearning();

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function loadRecommendation() {
      setLoading(true);
      try {
        const data = await assessmentService.getAdaptiveRecommendation(resultId);
        setRecommendation(data);
      } catch (err) {
        console.error("Failed to load adaptive recommendation:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendation();
  }, [resultId]);

  const handleApplyChanges = () => {
    if (recommendation) {
      applyAdaptiveModification(recommendation);
      setApplied(true);
      setTimeout(() => {
        navigate("/roadmap");
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "4rem 0" }}>
        <LoadingState message="Synthesizing Adaptive Recommendation..." subMessage="Computing roadmap mutations based on your assessment results..." />
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="page-container">
        <Card>
          <h3>Recommendation Not Available</h3>
          <p>Unable to retrieve adaptive recommendation details.</p>
          <Link to="/roadmap">
            <Button variant="primary" style={{ marginTop: "1rem" }}>
              Back to Roadmap
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isWeak = recommendation.performanceLevel === "WEAK";
  const isStrong = recommendation.performanceLevel === "STRONG";
  const isModerate = recommendation.performanceLevel === "MODERATE";

  return (
    <div className="page-container">
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: isWeak ? "var(--danger-light)" : isStrong ? "var(--success-light)" : "var(--primary-light)", color: isWeak ? "var(--danger)" : isStrong ? "var(--success)" : "var(--primary)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <IconSparkles size={14} /> Core Adaptive Learning Engine
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Adaptive Roadmap Recommendation
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Real-time curriculum re-orchestration responding to diagnostic assessment: <strong>{recommendation.topicTitle}</strong>
          </p>
        </div>

        {/* Global Adaptation Lifecycle Flowchart */}
        <Card style={{ marginBottom: "1.75rem", background: "var(--bg-card)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>System Adaptation Lifecycle</h3>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              Outcome-Based Closed-Loop Feedback
            </span>
          </div>

          <div className="adaptive-flow">
            <div className="flow-step completed">
              <div className="flow-step-circle">1</div>
              <div className="flow-step-title">Previous Path</div>
              <div className="flow-step-desc">Original Curriculum</div>
            </div>
            <div className="flow-connector" />

            <div className="flow-step completed">
              <div className="flow-step-circle">2</div>
              <div className="flow-step-title">Assessment</div>
              <div className="flow-step-desc">5-Item Diagnostic</div>
            </div>
            <div className="flow-connector" />

            <div className="flow-step completed">
              <div className="flow-step-circle">3</div>
              <div className="flow-step-title">Analysis</div>
              <div className="flow-step-desc">Score: {recommendation.score}%</div>
            </div>
            <div className="flow-connector" />

            <div className={`flow-step ${isWeak ? "alert" : "completed"}`}>
              <div className="flow-step-circle">4</div>
              <div className="flow-step-title">Area Detection</div>
              <div className="flow-step-desc">{isWeak ? "Gaps Flagged" : "Validated"}</div>
            </div>
            <div className="flow-connector" />

            <div className="flow-step active">
              <div className="flow-step-circle">5</div>
              <div className="flow-step-title">Updated Path</div>
              <div className="flow-step-desc">{isWeak ? "Remedial Path" : isStrong ? "Accelerated" : "Reinforced"}</div>
            </div>
          </div>
        </Card>

        {/* "Why was my learning path changed?" Card */}
        <Card style={{ marginBottom: "1.75rem", borderLeft: `5px solid ${isWeak ? "var(--danger)" : isStrong ? "var(--success)" : "var(--primary)"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Why was my learning path changed?
            </h3>
            <PerformanceBadge level={recommendation.performanceLevel} />
          </div>

          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            {recommendation.explanation}
          </p>

          {/* Conditional Path Specific Visualization */}
          {isWeak && (
            <div style={{ background: "var(--danger-light)", border: "1px solid var(--danger-border)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--danger)", marginBottom: "0.5rem" }}>
                REMEDIAL ADAPTIVE PATHWAY:
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.85rem" }}>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--danger-border)", fontWeight: 600 }}>
                  Weak Concept
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--danger-border)", fontWeight: 600 }}>
                  Prerequisite Topic Injected
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--danger-border)", fontWeight: 600 }}>
                  Targeted Remedial Learning
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--danger-border)", fontWeight: 600 }}>
                  Scheduled Reassessment
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--danger-border)", fontWeight: 600 }}>
                  Continue Core Roadmap
                </span>
              </div>
            </div>
          )}

          {isStrong && (
            <div style={{ background: "var(--success-light)", border: "1px solid var(--success-border)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--success)", marginBottom: "0.5rem" }}>
                ACCELERATED ADVANCED PATHWAY:
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.85rem" }}>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--success-border)", fontWeight: 600 }}>
                  Strong Performance (80%+)
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--success-border)", fontWeight: 600 }}>
                  Skip Redundant Reinforcement
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--success-border)", fontWeight: 600 }}>
                  Honors Elective Unlocked
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--success-border)", fontWeight: 600 }}>
                  Accelerated Roadmap Continuation
                </span>
              </div>
            </div>
          )}

          {isModerate && (
            <div style={{ background: "var(--primary-light)", border: "1px solid var(--primary-border)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                TARGETED REINFORCEMENT PATHWAY:
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.85rem" }}>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--primary-border)", fontWeight: 600 }}>
                  Moderate Performance (50-79%)
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--primary-border)", fontWeight: 600 }}>
                  Targeted Reinforcement Drills
                </span>
                <span>→</span>
                <span style={{ background: "#fff", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--primary-border)", fontWeight: 600 }}>
                  Regular Progression to Next Topic
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Dynamic Action Card: Injected Topic Preview */}
        {recommendation.injectedTopic && (
          <Card
            title={isWeak ? "Injected Prerequisite / Remedial Module" : "Unlocked Advanced Honors Elective"}
            subtitle="Automatically added to your active roadmap by the adaptive engine"
            style={{ marginBottom: "1.75rem", background: isWeak ? "#fffdfd" : "#fdfdff" }}
          >
            <div style={{ background: "var(--bg-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                  {recommendation.injectedTopic.topicName}
                </h4>
                <PerformanceBadge status={recommendation.injectedTopic.status} />
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                {recommendation.injectedTopic.learningObjective}
              </p>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Estimated Effort: <strong>{recommendation.injectedTopic.estimatedHours} Hours</strong> • Outcome Alignment: <strong>{recommendation.injectedTopic.co}</strong>
              </div>
            </div>

            <Button
              variant={isWeak ? "danger" : "primary"}
              onClick={handleApplyChanges}
              disabled={applied}
              icon={IconSparkles}
            >
              {applied ? "Roadmap Updated! Redirecting..." : "Apply Adapted Changes to My Roadmap"}
            </Button>
          </Card>
        )}

        {/* Detailed Adaptation Sequence Steps */}
        <Card title="Detailed Adaptation Log" subtitle="Formal audit trail of curriculum mutations">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {recommendation.adaptationSteps?.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-subtle)"
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {step.stepNumber}
                </div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.75rem" }}>
          <Link to="/roadmap">
            <Button variant="secondary" icon={IconRoadmap}>View Roadmap</Button>
          </Link>
          <Link to="/progress">
            <Button variant="outline">View Progress Tracking →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveRecommendation;
