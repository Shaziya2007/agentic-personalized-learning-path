import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import PerformanceBadge from "../components/PerformanceBadge";
import {
  IconSparkles,
  IconArrowRight,
  IconBookOpen,
  IconTarget,
  IconAssessment,
  IconOutcomes
} from "../components/Icons";

export const Dashboard = () => {
  const { user } = useAuth();
  const { roadmap, courseOutcomes, programOutcomes, latestResult } = useLearning();

  // Find active topic
  let activeTopic = null;
  let activePhase = null;
  if (roadmap?.phases) {
    for (const phase of roadmap.phases) {
      const found = phase.topics.find((t) => t.status === "In Progress" || t.status === "Needs Review");
      if (found) {
        activeTopic = found;
        activePhase = phase;
        break;
      }
    }
    // Fallback to first uncompleted topic
    if (!activeTopic) {
      for (const phase of roadmap.phases) {
        const found = phase.topics.find((t) => t.status !== "Completed");
        if (found) {
          activeTopic = found;
          activePhase = phase;
          break;
        }
      }
    }
  }

  // Calculate average CO and PO attainment
  const avgCO = courseOutcomes.length
    ? Math.round(courseOutcomes.reduce((acc, c) => acc + c.currentAttainment, 0) / courseOutcomes.length)
    : 0;

  const avgPO = programOutcomes.length
    ? Math.round(programOutcomes.reduce((acc, p) => acc + p.currentAttainment, 0) / programOutcomes.length)
    : 0;

  return (
    <div className="page-container">
      {/* Top Banner & Welcome Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "2rem"
        }}
      >
        <div>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Student Learning Dashboard
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Welcome back, {user?.name || "Student"}! 👋
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Current Goal: <strong style={{ color: "var(--text-primary)" }}>{roadmap?.learningGoal}</strong>
          </p>
        </div>

        {/* Primary Action CTAs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/create-learning-path">
            <Button variant="outline" icon={IconSparkles}>
              Create Learning Path
            </Button>
          </Link>
          {activeTopic && (
            <Link to={`/topics/${activeTopic.id}`}>
              <Button variant="primary" icon={IconArrowRight} iconPosition="right">
                Continue Learning
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid-4" style={{ marginBottom: "1.75rem" }}>
        {/* Overall Progress Card */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>OVERALL PROGRESS</span>
            <IconTarget size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--primary)", marginBottom: "0.5rem" }}>
            {roadmap?.overallProgress}%
          </div>
          <ProgressBar value={roadmap?.overallProgress || 0} showPercentage={false} height={6} />
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            {roadmap?.completedTopics} of {roadmap?.totalTopics} topics completed
          </div>
        </Card>

        {/* Current Topic & Phase */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>CURRENT TOPIC</span>
            <IconBookOpen size={18} style={{ color: "var(--warning)" }} />
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {activeTopic ? activeTopic.topicName : "All topics completed"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Phase {activePhase?.phaseNumber || 1}: {activePhase?.title?.slice(0, 20)}...
            </span>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            {activeTopic && <PerformanceBadge status={activeTopic.status} />}
          </div>
        </Card>

        {/* Latest Assessment Status */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>LATEST SCORE</span>
            <IconAssessment size={18} style={{ color: "var(--purple)" }} />
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: latestResult ? (latestResult.score >= 80 ? "var(--success)" : latestResult.score >= 50 ? "var(--warning)" : "var(--danger)") : "var(--text-muted)", marginBottom: "0.25rem" }}>
            {latestResult ? `${latestResult.score}%` : "85%"}
          </div>
          <div>
            <PerformanceBadge level={latestResult?.performanceLevel || "STRONG"} />
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            Status: {latestResult?.statusText || "Strong Performance"}
          </div>
        </Card>

        {/* OBE Attainment Summary */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>OBE ATTAINMENT</span>
            <IconOutcomes size={18} style={{ color: "var(--success)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--purple)" }}>CO: {avgCO}%</span>
            <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--success)" }}>PO: {avgPO}%</span>
          </div>
          <ProgressBar value={avgCO} showPercentage={false} height={6} variant="primary" />
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            Aligned with 5 Course & Program Outcomes
          </div>
        </Card>
      </div>

      {/* Main Content Area: Active Path Overview & Quick Navigation */}
      <div className="grid-3" style={{ gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column: Current Module Focus */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {activeTopic && (
            <Card
              title="Next Action: Continue Active Learning Module"
              subtitle={`Aligned with Course Outcome ${activeTopic.co} and Program Outcome ${activeTopic.po}`}
              headerAction={
                <Link to={`/topics/${activeTopic.id}`}>
                  <Button size="sm" variant="primary" icon={IconArrowRight} iconPosition="right">
                    Open Topic
                  </Button>
                </Link>
              }
            >
              <div style={{ background: "var(--bg-subtle)", padding: "1.25rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {activeTopic.topicName}
                  </h3>
                  <PerformanceBadge status={activeTopic.status} />
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                  {activeTopic.learningObjective}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <span><strong>Duration:</strong> {activeTopic.estimatedHours} Hours</span>
                  <span><strong>Milestone:</strong> {activeTopic.milestone}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link to={`/topics/${activeTopic.id}`}>
                  <Button variant="secondary" size="sm" icon={IconBookOpen}>
                    Study Module Material
                  </Button>
                </Link>
                <Link to={`/assessment/${activeTopic.id}`}>
                  <Button variant="outline" size="sm" icon={IconAssessment}>
                    Take Topic Assessment
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Quick Roadmap Timeline preview */}
          <Card
            title="Roadmap Phases Overview"
            subtitle="Adaptive structure synthesized based on your target skills"
            headerAction={
              <Link to="/roadmap" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                View All Phases →
              </Link>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {roadmap?.phases?.map((phase) => {
                const phaseCompleted = phase.topics.filter(t => t.status === "Completed").length;
                const percent = Math.round((phaseCompleted / (phase.topics.length || 1)) * 100);

                return (
                  <div
                    key={phase.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-card)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "var(--radius-full)",
                          background: percent === 100 ? "var(--success)" : "var(--primary-light)",
                          color: percent === 100 ? "#fff" : "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          fontWeight: 700
                        }}
                      >
                        {percent === 100 ? "✓" : phase.phaseNumber}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          Phase {phase.phaseNumber}: {phase.title}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {phase.duration} • {phaseCompleted}/{phase.topics.length} topics
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "120px" }}>
                      <ProgressBar value={percent} showPercentage={true} height={5} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: OBE Snapshot & Adaptive Logic Insights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Core Adaptive Logic Legend */}
          <Card
            title="Adaptive Assessment Logic"
            subtitle="How the system personalizes your path"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", background: "var(--success-light)", border: "1px solid var(--success-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--success)" }}>Score &ge; 80% (Strong)</span>
                  <span style={{ fontSize: "0.72rem", background: "#fff", padding: "0.1rem 0.4rem", borderRadius: "4px", color: "var(--success)", fontWeight: 700 }}>Pass</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                  Faster progression & unlocked advanced honors electives.
                </p>
              </div>

              <div style={{ padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", background: "var(--primary-light)", border: "1px solid var(--primary-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)" }}>Score 50% - 79% (Moderate)</span>
                  <span style={{ fontSize: "0.72rem", background: "#fff", padding: "0.1rem 0.4rem", borderRadius: "4px", color: "var(--primary)", fontWeight: 700 }}>Pass</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                  Proceeds on path with targeted reinforcement drills.
                </p>
              </div>

              <div style={{ padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", background: "var(--danger-light)", border: "1px solid var(--danger-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--danger)" }}>Score &lt; 50% (Weak)</span>
                  <span style={{ fontSize: "0.72rem", background: "#fff", padding: "0.1rem 0.4rem", borderRadius: "4px", color: "var(--danger)", fontWeight: 700 }}>Remedial</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                  Weak concepts detected; injects prerequisite remedial modules and schedules reassessment.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <Link to="/adaptive-recommendation/demo">
                <Button variant="outline" size="sm" style={{ width: "100%" }}>
                  Explore Adaptive Engine View
                </Button>
              </Link>
            </div>
          </Card>

          {/* OBE Course Outcomes Snapshot */}
          <Card
            title="Course Outcomes (CO)"
            subtitle="Attainment vs Benchmark"
            headerAction={
              <Link to="/outcomes" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                Details →
              </Link>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {courseOutcomes.slice(0, 4).map((co) => (
                <div key={co.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: 600 }}>{co.code}: {co.title.slice(0, 22)}...</span>
                    <span style={{ fontWeight: 700, color: co.currentAttainment >= co.targetAttainment ? "var(--success)" : "var(--warning)" }}>
                      {co.currentAttainment}%
                    </span>
                  </div>
                  <ProgressBar value={co.currentAttainment} target={co.targetAttainment} showPercentage={false} height={5} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
