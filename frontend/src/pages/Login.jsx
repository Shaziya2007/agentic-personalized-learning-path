import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Card from "../components/Card";
import Button from "../components/Button";
import { IconRoadmap, IconArrowRight } from "../components/Icons";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("alex.rivera@university.edu");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid university email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <Card style={{ maxWidth: "440px", width: "100%", padding: "2rem" }}>
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
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Personalized & Adaptive Learning Paths with OBE Alignment
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
            <label className="form-label" htmlFor="email">University Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label className="form-label" htmlFor="password">Password</label>
              <span style={{ fontSize: "0.78rem", color: "var(--primary)" }}>Demo: Any password</span>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
            {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}
          </Button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: 600 }}>
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
