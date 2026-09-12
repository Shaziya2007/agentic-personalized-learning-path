import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconMenu } from "./Icons";

export const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ST";

  return (
    <header className="navbar">
      <div className="navbar-brand-group">
        <button
          type="button"
          className="navbar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <IconMenu size={20} />
        </button>

        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div className="brand-badge">OBE • AI</div>
          <span className="brand-title">AdaptivePath</span>
        </Link>
      </div>

      <div className="navbar-actions">
        <Link to="/profile" className="user-quick-profile">
          <div className="user-avatar">{initials}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="user-meta-name">{user?.name || "Student"}</span>
            <span className="user-meta-role">Learner ({user?.experienceLevel || "Beginner"})</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
