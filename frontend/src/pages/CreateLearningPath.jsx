import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLearning } from "../context/LearningContext";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import { IconSparkles } from "../components/Icons";

export const CreateLearningPath = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { generateLearningPath } = useLearning();

  const [formData, setFormData] = useState({
    learningGoal: user?.learningGoal || "Full-Stack Cloud Architecture & Distributed Systems",
    currentSkills: user?.currentSkills || "JavaScript, HTML/CSS, Basic Python, Git",
    experienceLevel: user?.experienceLevel || "Beginner",
    weakAreas: user?.weakAreas || "Data Structures & Algorithms, Asynchronous Concurrency, SQL Optimization",
    availableHoursPerWeek: user?.availableHoursPerWeek || 12,
    targetDuration: user?.targetDuration || "8 Weeks"
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      await generateLearningPath(formData);
      navigate("/roadmap");
    } catch (err) {
      console.error("Path generation failed:", err);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
        <Card style={{ maxWidth: "560px", width: "100%", padding: "2.5rem" }}>
          <LoadingState
            message="Generating Personalized Learning Path..."
            subMessage="Our LLM engine is aligning your parameters with predefined Course Outcomes (COs) and Program Outcomes (POs)."
            isGenerating={true}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--primary-light)", color: "var(--primary)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <IconSparkles size={14} /> AI-Powered Curriculum Synthesis
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Create Personalized Learning Path
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
            Specify your academic objectives, current capabilities, and target duration. The system will build a structured roadmap mapped to Bloom’s Taxonomy and Course Outcomes.
          </p>
        </div>

        <Card>
          <form onSubmit={handleGenerate}>
            {/* 1. Learning Goal */}
            <div className="form-group">
              <label className="form-label" htmlFor="learningGoal">
                1. Target Learning Goal
              </label>
              <input
                id="learningGoal"
                type="text"
                name="learningGoal"
                className="form-input"
                value={formData.learningGoal}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Web Architecture with Microservices"
                required
              />
              <span className="form-hint">
                The primary engineering domain and end goal of your roadmap.
              </span>
            </div>

            {/* 2. Current Skills */}
            <div className="form-group">
              <label className="form-label" htmlFor="currentSkills">
                2. Current Skills & Prerequisite Knowledge
              </label>
              <textarea
                id="currentSkills"
                name="currentSkills"
                className="form-textarea"
                value={formData.currentSkills}
                onChange={handleChange}
                placeholder="e.g. JavaScript, HTML/CSS, Basic Python"
                required
              />
              <span className="form-hint">
                Helps the generator bypass redundant topics you have already mastered.
              </span>
            </div>

            {/* 3. Experience Level & Duration */}
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label" htmlFor="experienceLevel">
                  3. Experience Level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  className="form-select"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Beginner">Beginner (Foundational)</option>
                  <option value="Intermediate">Intermediate (Practitioner)</option>
                  <option value="Advanced">Advanced (Specialist)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="availableHoursPerWeek">
                  4. Available Hours / Week
                </label>
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
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="targetDuration">
                  5. Target Duration
                </label>
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
              </div>
            </div>

            {/* 4. Weak Areas */}
            <div className="form-group">
              <label className="form-label" htmlFor="weakAreas">
                6. Weak Areas & Identified Gaps
              </label>
              <textarea
                id="weakAreas"
                name="weakAreas"
                className="form-textarea"
                value={formData.weakAreas}
                onChange={handleChange}
                placeholder="e.g. Algorithmic Big-O Analysis, Asynchronous Event Loops, Database Locks"
                required
              />
              <span className="form-hint">
                The adaptive engine creates special remedial modules and checkpoints for these identified areas.
              </span>
            </div>

            {/* OBE Information Notice */}
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-color)",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                margin: "1.5rem 0",
                fontSize: "0.82rem",
                color: "var(--text-secondary)"
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>Outcome-Based Education Alignment:</strong>
              <br />
              The generated roadmap will automatically distribute topics across predefined Course Outcomes (CO1 - CO5) and Program Outcomes (PO1 - PO5) using Bloom's Taxonomy cognitive progression.
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={IconSparkles}
                iconPosition="left"
              >
                Generate Learning Path
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateLearningPath;
