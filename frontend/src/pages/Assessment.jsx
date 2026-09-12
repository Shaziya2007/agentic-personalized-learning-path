import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assessmentService from "../services/assessmentService";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import Button from "../components/Button";
import AssessmentQuestion from "../components/AssessmentQuestion";
import LoadingState from "../components/LoadingState";
import { IconAssessment, IconArrowRight } from "../components/Icons";

export const Assessment = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { submitAssessment } = useLearning();

  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);
      try {
        const data = await assessmentService.getAssessmentByTopic(topicId || "T201");
        setAssessmentData(data);
      } catch (_err) { console.error(_err);
        setError("Failed to load assessment questions. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [topicId]);

  const handleSelectOption = (optionIndex) => {
    const currentQ = assessmentData.questions[currentQuestionIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const totalQuestions = assessmentData.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    try {
      setIsSubmitting(true);
      const result = await submitAssessment(topicId || "T201", selectedAnswers);
      navigate(`/assessment-result/${result.resultId}`);
    } catch (_err) { console.error(_err);
      setError("Failed to submit assessment evaluation.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "4rem 0" }}>
        <LoadingState message="Preparing Assessment Environment..." subMessage="Loading diagnostic items aligned with Course Outcomes..." />
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
        <Card style={{ maxWidth: "520px", width: "100%", padding: "2rem" }}>
          <LoadingState
            message="Analyzing Assessment Performance..."
            subMessage="Evaluating correct answers, calculating CO attainment, and synthesizing adaptive path recommendation..."
          />
        </Card>
      </div>
    );
  }

  const currentQ = assessmentData.questions[currentQuestionIndex];
  const totalQ = assessmentData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQ - 1;

  return (
    <div className="page-container">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Assessment Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Diagnostic Outcome Assessment
            </span>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.2rem" }}>
              {assessmentData.topicTitle}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", background: "var(--purple-light)", color: "var(--purple)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
              {assessmentData.courseOutcome}
            </span>
            <span style={{ fontSize: "0.75rem", background: "#f0fdf4", color: "#166534", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
              {assessmentData.programOutcome}
            </span>
          </div>
        </div>

        {/* Question Stepper Indicator */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {assessmentData.questions.map((q, idx) => {
            const hasAnswer = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentQuestionIndex;

            return (
              <div
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  flex: 1,
                  height: "8px",
                  borderRadius: "var(--radius-full)",
                  background: isCurrent ? "var(--primary)" : hasAnswer ? "var(--success)" : "var(--border-color)",
                  cursor: "pointer",
                  transition: "var(--transition)"
                }}
                title={`Question ${idx + 1}`}
              />
            );
          })}
        </div>

        {error && (
          <div style={{ background: "var(--danger-light)", color: "var(--danger)", padding: "0.75rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.85rem" }}>
            {error}
          </div>
        )}

        {/* Active Question Render */}
        <AssessmentQuestion
          question={currentQ}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQ}
          selectedOption={selectedAnswers[currentQ.id]}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation & Submit Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous Question
          </Button>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            {!isLastQuestion ? (
              <Button
                variant="primary"
                onClick={handleNext}
                icon={IconArrowRight}
                iconPosition="right"
              >
                Next Question →
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                icon={IconAssessment}
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
