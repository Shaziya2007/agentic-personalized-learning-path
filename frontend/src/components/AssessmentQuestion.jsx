import React from "react";
import Card from "./Card";

export const AssessmentQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption
}) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <Card className="assessment-question-card" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", background: "var(--primary-light)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-sm)" }}>
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.conceptTested && (
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Concept: {question.conceptTested}
          </span>
        )}
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.4 }}>
        {question.question}
      </h3>

      {/* Multiple-Choice Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;

          return (
            <div
              key={idx}
              onClick={() => onSelectOption(idx)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "0.85rem 1rem",
                borderRadius: "var(--radius-md)",
                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                background: isSelected ? "var(--primary-light)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "var(--transition)"
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-full)",
                  background: isSelected ? "var(--primary)" : "var(--bg-subtle)",
                  color: isSelected ? "#fff" : "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  flexShrink: 0
                }}
              >
                {letters[idx] || idx + 1}
              </div>

              <span style={{ fontSize: "0.92rem", color: isSelected ? "var(--primary-hover)" : "var(--text-primary)", fontWeight: isSelected ? 600 : 400 }}>
                {option}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AssessmentQuestion;
