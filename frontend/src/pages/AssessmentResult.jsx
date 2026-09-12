import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import assessmentService from "../services/assessmentService";
import Card from "../components/Card";
import ScoreCard from "../components/ScoreCard";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import {
  IconSparkles,
  IconArrowRight,
  IconAlertTriangle,
  IconCheckCircle,
  IconRefreshCw
} from "../components/Icons";

export const AssessmentResult = () => {
  const { resultId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    async function loadResult() {
      setLoading(true);
      try {
        const data = await assessmentService.getAssessmentResult(resultId);
        setResult(data);
      } catch (err) {
        console.error("Failed to fetch assessment result:", err);
      } finally {
        setLoading(false);
      }
    }
    loadResult();
  }, [resultId]);

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "4rem 0" }}>
        <LoadingState message="Loading Assessment Analysis..." />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="page-container">
        <Card>
          <h3>Result Not Found</h3>
          <p>No assessment result was found for this session.</p>
          <Link to="/">
            <Button variant="primary" style={{ marginTop: "1rem" }}>
              Return to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Next step messages based on adaptive logic
  let nextStepTitle = "Additional Practice Recommended";
  let nextStepDesc = "Additional practice is recommended to solidify architectural concepts.";
  let actionColor = "var(--primary)";

  if (result.performanceLevel === "STRONG") {
    nextStepTitle = "Accelerated Path Available";
    nextStepDesc = "You're ready to move faster. Advanced learning may be recommended.";
    actionColor = "var(--success)";
  } else if (result.performanceLevel === "WEAK") {
    nextStepTitle = "Remedial Learning Required";
    nextStepDesc = "Remedial learning and reassessment are recommended.";
    actionColor = "var(--danger)";
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Performance Evaluation Complete
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Assessment Result: {result.topicTitle}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Outcome Alignment: <strong>{result.co}</strong> • Program Outcome: <strong>{result.po}</strong>
          </p>
        </div>

        {/* Score Card & Performance Level */}
        <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
          <ScoreCard
            score={result.score}
            correctCount={result.correctCount}
            totalQuestions={result.totalQuestions}
            performanceLevel={result.performanceLevel}
          />

          {/* What happens next Card */}
          <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <IconSparkles size={20} style={{ color: actionColor }} />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  What happens next?
                </h3>
              </div>

              <div
                style={{
                  padding: "0.9rem 1rem",
                  borderRadius: "var(--radius-md)",
                  background: result.performanceLevel === "STRONG" ? "var(--success-light)" : result.performanceLevel === "WEAK" ? "var(--danger-light)" : "var(--primary-light)",
                  border: `1px solid ${result.performanceLevel === "STRONG" ? "var(--success-border)" : result.performanceLevel === "WEAK" ? "var(--danger-border)" : "var(--primary-border)"}`,
                  marginBottom: "1rem"
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: actionColor, marginBottom: "0.25rem" }}>
                  {nextStepTitle}
                </div>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                  {result.nextStepRecommendation || nextStepDesc}
                </p>
              </div>

              {/* Weak Concepts Detected */}
              {result.weakConcepts && result.weakConcepts.length > 0 ? (
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                    Detected Weak Concept Areas:
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {result.weakConcepts.map((concept, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--danger)" }}>
                        <IconAlertTriangle size={14} />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--success)", fontSize: "0.85rem", fontWeight: 600 }}>
                  <IconCheckCircle size={16} />
                  <span>No concept weaknesses identified. Ready for honors content!</span>
                </div>
              )}
            </div>

            {/* Link to Adaptive Recommendation */}
            <div style={{ marginTop: "1.5rem" }}>
              <Link to={`/adaptive-recommendation/${result.resultId}`}>
                <Button
                  variant="primary"
                  size="md"
                  style={{ width: "100%" }}
                  icon={IconArrowRight}
                  iconPosition="right"
                >
                  View Adaptive Roadmap Recommendation
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Detailed Question Review Accordion */}
        <Card style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Question Review & Explanations</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Inspect correct options and diagnostic rationale
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowReview(!showReview)}
            >
              {showReview ? "Hide Review" : "Inspect All Questions"}
            </Button>
          </div>

          {showReview && result.questionBreakdown && (
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {result.questionBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    border: item.isCorrect ? "1px solid var(--success-border)" : "1px solid var(--danger-border)",
                    background: item.isCorrect ? "var(--success-light)" : "var(--danger-light)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Question {idx + 1}: {item.conceptTested}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: item.isCorrect ? "var(--success)" : "var(--danger)" }}>
                      {item.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500, marginBottom: "0.5rem" }}>
                    {item.question}
                  </p>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", background: "#fff", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                    <strong>Explanation:</strong> {item.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/roadmap">
            <Button variant="secondary">Return to Roadmap</Button>
          </Link>
          <Link to={`/assessment/${result.topicId}`}>
            <Button variant="outline" icon={IconRefreshCw}>Retake Diagnostic</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
