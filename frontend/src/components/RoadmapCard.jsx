import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import { IconRoadmap, IconClock, IconBookOpen } from "./Icons";

export const RoadmapCard = ({ roadmap }) => {
  return (
    <Card className="roadmap-summary-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Active Learning Roadmap
          </span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.25rem" }}>
            {roadmap.learningGoal}
          </h2>
        </div>
        <Link to="/roadmap">
          <Button size="sm" variant="outline" icon={IconRoadmap}>
            View Full Roadmap
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <ProgressBar
          value={roadmap.overallProgress}
          label="Overall Roadmap Completion"
          height={10}
        />
      </div>

      <div className="grid-3" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconBookOpen size={16} style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Topic Progress</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>
              {roadmap.completedTopics} / {roadmap.totalTopics} Topics
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconClock size={16} style={{ color: "var(--warning)" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Weekly Commitment</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>
              {roadmap.availableHoursPerWeek} Hours / Week
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconRoadmap size={16} style={{ color: "var(--success)" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target Duration</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>
              {roadmap.targetDuration}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoadmapCard;
