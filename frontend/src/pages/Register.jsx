import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Card from "../components/Card";
import Button from "../components/Button";
import { IconRoadmap, IconArrowRight } from "../components/Icons";

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid university email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({ name, email, password });
      navigate("/learner-profile");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <Card style={{ maxWidth: "480px", width: "100%", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-lg)",
              background: "var(--primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.75rem"
            }}
          >
            <IconRoadmap size={24} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Create Student Account
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Join the Outcome-Based Adaptive Learning Platform
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "var(--danger-light)",
              border: "1px solid var(--danger-border)",
              color: "var(--danger)",
              padding: "0.65rem 0.85rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              marginBottom: "1.25rem"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">University Email</label>
            <input
              id="reg-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: "100%", marginTop: "0.5rem" }}
            disabled={isSubmitting}
            icon={IconArrowRight}
            iconPosition="right"
          >
            {isSubmitting ? "Creating Account..." : "Register & Setup Profile"}
          </Button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: 600 }}>
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
