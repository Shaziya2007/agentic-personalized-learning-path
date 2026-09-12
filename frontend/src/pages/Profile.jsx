import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import Button from "../components/Button";
import PerformanceBadge from "../components/PerformanceBadge";
import {
  IconLogOut,
  IconRefreshCw
} from "../components/Icons";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { resetDemoData } = useLearning();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all mock assessment scores and simulated path modifications?")) {
      resetDemoData();
      alert("Demonstration state reset successfully!");
    }
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Account Management
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Student Profile & Platform Settings
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Manage identity attributes, academic parameters, and authentication session states.
          </p>
        </div>

        {/* Profile Details Card */}
        <Card style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "var(--radius-full)",
                background: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 800
              }}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "ST"}
            </div>

            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {user?.name || "Alex Rivera"}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                {user?.email || "alex.rivera@university.edu"} • ID: {user?.studentId || "CSE-2026-0482"}
              </p>
              <div style={{ marginTop: "0.4rem" }}>
                <PerformanceBadge level={user?.experienceLevel || "Beginner"} />
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Active Learning Goal
              </span>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.2rem" }}>
                {user?.learningGoal || "Full-Stack Cloud Architecture & Distributed Systems"}
              </p>
            </div>

            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Weekly Target Commitment
              </span>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.2rem" }}>
                {user?.availableHoursPerWeek || 12} Hours / Week ({user?.targetDuration || "8 Weeks"})
              </p>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Recorded Skills & Foundations
              </span>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                {user?.currentSkills || "JavaScript, HTML/CSS, Basic Python, Git"}
              </p>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Weak Areas Flagged for Remediation
              </span>
              <p style={{ fontSize: "0.88rem", color: "var(--danger)", marginTop: "0.2rem" }}>
                {user?.weakAreas || "Data Structures & Algorithms, Asynchronous Concurrency, SQL Optimization"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
            <Link to="/learner-profile">
              <Button variant="primary">Edit Profile</Button>
            </Link>
          </div>
        </Card>

        {/* Backend & Architecture Integration Info */}
        <Card title="Spring Boot Backend Integration" subtitle="Ready for JWT authentication & REST connection" style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            <p style={{ marginBottom: "0.75rem" }}>
              This frontend uses an isolated service architecture with endpoints configured via <code>VITE_API_BASE_URL</code>.
              When connecting your Spring Boot microservice:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <li>Provide JWT Bearer tokens via <code>POST /api/auth/login</code>.</li>
              <li>Spring Security filters will validate endpoints seamlessly.</li>
              <li>Service layers in <code>src/services/</code> map directly to your backend controller routes.</li>
            </ul>
          </div>
        </Card>

        {/* Danger Zone / Demo Controls */}
        <Card title="System Session & Demo Controls" subtitle="Actions for presentation and reset">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Reset Demo State</div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Clears all session-stored assessment answers and restores original roadmap.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleResetData} icon={IconRefreshCw}>
              Reset Demo State
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--danger)" }}>Sign Out</div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                End session and return to login page.
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={handleLogout} icon={IconLogOut}>
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
