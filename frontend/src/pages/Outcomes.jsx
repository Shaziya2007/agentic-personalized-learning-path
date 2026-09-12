import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import OutcomeCard from "../components/OutcomeCard";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import {
  IconOutcomes,
  IconRoadmap
} from "../components/Icons";

export const Outcomes = () => {
  const { courseOutcomes, programOutcomes } = useLearning();
  const [activeTab, setActiveTab] = useState("CO"); // "CO" | "PO"

  // Aggregate stats
  const totalCOs = courseOutcomes.length;
  const passedCOs = courseOutcomes.filter((c) => c.currentAttainment >= c.targetAttainment).length;
  const avgCOAttainment = totalCOs
    ? Math.round(courseOutcomes.reduce((acc, c) => acc + c.currentAttainment, 0) / totalCOs)
    : 0;

  const totalPOs = programOutcomes.length;
  const passedPOs = programOutcomes.filter((p) => p.currentAttainment >= p.targetAttainment).length;
  const avgPOAttainment = totalPOs
    ? Math.round(programOutcomes.reduce((acc, p) => acc + p.currentAttainment, 0) / totalPOs)
    : 0;

  return (
    <div className="page-container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--purple-light)", color: "var(--purple)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <IconOutcomes size={14} /> Academic Accreditation Standard
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Outcome-Based Education (OBE) Alignment
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Predefined academic Course Outcomes (COs) and Program Outcomes (POs) aligned with Bloom's Revised Taxonomy.
          </p>
        </div>

        <Link to="/roadmap">
          <Button variant="outline" icon={IconRoadmap}>
            View Mapped Roadmap
          </Button>
        </Link>
      </div>

      {/* Top Academic Benchmark Cards */}
      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        {/* Course Outcomes Attainment Summary */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--purple)", textTransform: "uppercase" }}>
                Course Outcomes (CO) Attainment
              </span>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--purple)", marginTop: "0.2rem" }}>
                {avgCOAttainment}%
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {passedCOs} of {totalCOs} COs Attained
              </span>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target Benchmark: 70%</div>
            </div>
          </div>
          <ProgressBar value={avgCOAttainment} showPercentage={false} height={8} variant="primary" />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            COs measure specific technical and cognitive capabilities acquired within this learning path.
          </p>
        </Card>

        {/* Program Outcomes Attainment Summary */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--success)", textTransform: "uppercase" }}>
                Program Outcomes (PO) Attainment
              </span>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--success)", marginTop: "0.2rem" }}>
                {avgPOAttainment}%
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {passedPOs} of {totalPOs} POs Attained
              </span>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target Benchmark: 70%</div>
            </div>
          </div>
          <ProgressBar value={avgPOAttainment} showPercentage={false} height={8} variant="success" />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            POs represent broader engineering attributes defined by national academic regulatory bodies (e.g., NBA / ABET).
          </p>
        </Card>
      </div>

      {/* Tabs Navigation: Course Outcomes vs Program Outcomes */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => setActiveTab("CO")}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            borderBottom: activeTab === "CO" ? "3px solid var(--purple)" : "3px solid transparent",
            color: activeTab === "CO" ? "var(--purple)" : "var(--text-muted)",
            cursor: "pointer"
          }}
        >
          Course Outcomes (CO1 - CO5)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PO")}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            borderBottom: activeTab === "PO" ? "3px solid var(--success)" : "3px solid transparent",
            color: activeTab === "PO" ? "var(--success)" : "var(--text-muted)",
            cursor: "pointer"
          }}
        >
          Program Outcomes (PO1 - PO5)
        </button>
      </div>

      {/* Tab Content 1: Course Outcomes View */}
      {activeTab === "CO" && (
        <div>
          <div style={{ marginBottom: "1.25rem", background: "var(--bg-subtle)", padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Predefined Academic Rule:</strong> All Course Outcomes are strictly determined by curriculum syllabus requirements. Attainment is dynamically updated via continuous diagnostic assessments.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {courseOutcomes.map((co) => (
              <OutcomeCard key={co.id} outcome={co} type="CO" />
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Program Outcomes View */}
      {activeTab === "PO" && (
        <div>
          <div style={{ marginBottom: "1.25rem", background: "var(--bg-subtle)", padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Graduate Engineering Attributes:</strong> Program Outcomes map to broad foundational disciplines, problem analysis, and modern tool competency.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {programOutcomes.map((po) => {
              const isMet = po.currentAttainment >= po.targetAttainment;
              return (
                <Card key={po.id} style={{ marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#166534", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                        {po.code}
                      </span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "0.4rem" }}>
                        {po.title}
                      </h4>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "1.35rem", fontWeight: 800, color: isMet ? "var(--success)" : "var(--warning)" }}>
                        {po.currentAttainment}%
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target: {po.targetAttainment}%</div>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "0.85rem", lineHeight: 1.45 }}>
                    {po.description}
                  </p>

                  <ProgressBar value={po.currentAttainment} target={po.targetAttainment} showPercentage={false} height={6} />

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.85rem", fontSize: "0.78rem" }}>
                    <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Aligned Course Outcomes:</span>
                    {po.alignedCOs.map((coId) => (
                      <span
                        key={coId}
                        style={{
                          background: "var(--purple-light)",
                          color: "var(--purple)",
                          border: "1px solid var(--purple-border)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "4px",
                          fontWeight: 700
                        }}
                      >
                        {coId}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Outcomes;
