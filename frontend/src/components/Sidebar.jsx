import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconDashboard,
  IconRoadmap,
  IconSparkles,
  IconAssessment,
  IconProgress,
  IconOutcomes,
  IconProfile,
  IconRefreshCw,
  IconX
} from "./Icons";
import { useLearning } from "../context/LearningContext";

export const Sidebar = ({ isOpen, onClose }) => {
  const { resetDemoData } = useLearning();

  const navItems = [
    { label: "Dashboard", to: "/", icon: IconDashboard },
    { label: "My Learning Path", to: "/roadmap", icon: IconRoadmap },
    { label: "Create Learning Path", to: "/create-learning-path", icon: IconSparkles },
    { label: "Assessments", to: "/topics/T201", icon: IconAssessment },
    { label: "Progress Tracking", to: "/progress", icon: IconProgress },
    { label: "CO / PO Outcomes", to: "/outcomes", icon: IconOutcomes },
    { label: "Profile / Settings", to: "/profile", icon: IconProfile }
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <IconRoadmap size={20} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>AdaptivePath</span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>OBE Learning System</span>
        </div>
        {isOpen && (
          <button
            type="button"
            onClick={onClose}
            style={{ color: "var(--text-muted)", padding: "0.25rem" }}
            aria-label="Close sidebar"
          >
            <IconX size={18} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset all local roadmap and assessment simulation data to default?")) {
              resetDemoData();
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            marginBottom: "0.75rem",
            width: "100%",
            padding: "0.4rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            cursor: "pointer"
          }}
        >
          <IconRefreshCw size={14} />
          <span>Reset Demo Data</span>
        </button>

        <div className="sidebar-project-tag">
          <strong>Outcome-Based Education</strong>
          <br />
          College Project Demonstration
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
