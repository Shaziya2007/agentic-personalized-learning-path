import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { IconCheckCircle, IconSparkles } from "../components/Icons";

export const LearnerProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    learningGoal: user?.learningGoal || "Full-Stack Cloud Architecture & Distributed Systems",
    currentSkills: user?.currentSkills || "JavaScript, HTML/CSS, Basic Python, Git",
    experienceLevel: user?.experienceLevel || "Beginner",
    weakAreas: user?.weakAreas || "Data Structures & Algorithms, Asynchronous Concurrency, SQL Optimization",
    availableHoursPerWeek: user?.availableHoursPerWeek || 12,
    targetDuration: user?.targetDuration || "8 Weeks"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await updateProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to save learner profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-container">
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.75rem" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Student Information & Configuration
          </span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            Learner Profile
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Configure your technical background, cognitive pacing, and outcome expectations for personalized roadmap generation.
          </p>
        </div>

        {savedSuccess && (
          <div
            style={{
              background: "var(--success-light)",
              border: "1px solid var(--success-border)",
              color: "var(--success)",
              padding: "0.85rem 1rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              fontWeight: 600
            }}
          >
            <IconCheckCircle size={18} />
            <span>Profile successfully updated! Your learning criteria are ready.</span>
          </div>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            {/* Student Basic Meta */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Student Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">University Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Learning Goal */}
            <div className="form-group">
              <label className="form-label" htmlFor="learningGoal">Learning Goal / Specialization Target</label>
              <input
                id="learningGoal"
                type="text"
                name="learningGoal"
                className="form-input"
                value={formData.learningGoal}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Web Architecture & Distributed Cloud Systems"
                required
              />
              <span className="form-hint">
                The primary engineering competency or career track you are targeting.
              </span>
            </div>

            {/* Current Skills */}
            <div className="form-group">
              <label className="form-label" htmlFor="currentSkills">Current Skills & Technologies</label>
              <textarea
                id="currentSkills"
                name="currentSkills"
                className="form-textarea"
                value={formData.currentSkills}
                onChange={handleChange}
                placeholder="e.g. JavaScript (ES6+), HTML5/CSS3, Git, Basic SQL"
                required
              />
              <span className="form-hint">
                List languages, tools, and libraries you have prior familiarity with.
              </span>
            </div>

            {/* Experience Level & Available Hours */}
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label" htmlFor="experienceLevel">Experience Level</label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  className="form-select"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <span className="form-hint">Guides initial difficulty & depth.</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="availableHoursPerWeek">Available Hours / Week</label>
                <input
                  id="availableHoursPerWeek"
                  type="number"
                  name="availableHoursPerWeek"
                  className="form-input"
                  min="2"
                  max="60"
                  value={formData.availableHoursPerWeek}
                  onChange={handleChange}
                  required
                />
                <span className="form-hint">Weekly dedicated study hours.</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="targetDuration">Target Duration</label>
                <input
                  id="targetDuration"
                  type="text"
                  name="targetDuration"
                  className="form-input"
                  value={formData.targetDuration}
                  onChange={handleChange}
                  placeholder="e.g. 8 Weeks"
                  required
                />
                <span className="form-hint">Desired completion timeframe.</span>
              </div>
            </div>

            {/* Weak Areas */}
            <div className="form-group">
              <label className="form-label" htmlFor="weakAreas">Identified Weak Areas & Knowledge Gaps</label>
              <textarea
                id="weakAreas"
                name="weakAreas"
                className="form-textarea"
                value={formData.weakAreas}
                onChange={handleChange}
                placeholder="e.g. Asymptotic Analysis, Concurrency Hazards, Complex SQL JOIN optimizations"
                required
              />
              <span className="form-hint">
                The adaptive engine injects foundational prerequisites and diagnostic checkpoints for these areas.
              </span>
            </div>

            {/* Form Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/create-learning-path")}
                icon={IconSparkles}
              >
                Proceed to Generate Path
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                icon={IconCheckCircle}
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LearnerProfile;
