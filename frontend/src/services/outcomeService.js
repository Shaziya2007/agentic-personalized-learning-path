/**
 * Outcome-Based Education (OBE) & Progress Service
 * 
 * Handles academic Course Outcomes (COs), Program Outcomes (POs),
 * Bloom's Taxonomy metrics, attainment calculations, and progress history.
 * 
 * Target Spring Boot endpoints:
 * - GET /api/outcomes/cos
 * - GET /api/outcomes/pos
 * - GET /api/progress/metrics
 * - GET /api/progress/activities
 */
import { PREDEFINED_COS, PREDEFINED_POS, INITIAL_ACTIVITIES } from "../data/mockData";

export const outcomeService = {
  /**
   * Get all predefined Course Outcomes with current attainment levels
   */
  async getCourseOutcomes() {
    try {
      const saved = localStorage.getItem("course_outcomes");
      if (saved) {
        return JSON.parse(saved);
      }
      return PREDEFINED_COS;
    } catch {
      return PREDEFINED_COS;
    }
  },

  /**
   * Get all predefined Program Outcomes with attainment levels
   */
  async getProgramOutcomes() {
    try {
      const saved = localStorage.getItem("program_outcomes");
      if (saved) {
        return JSON.parse(saved);
      }
      return PREDEFINED_POS;
    } catch {
      return PREDEFINED_POS;
    }
  },

  /**
   * Update attainment after assessment completion
   */
  async updateAttainmentOnAssessment(coCode, score) {
    try {
      const cos = await this.getCourseOutcomes();
      const updatedCos = cos.map((co) => {
        if (co.code === coCode) {
          // Weighted moving average of attainment
          const updated = Math.round(co.currentAttainment * 0.7 + score * 0.3);
          return { ...co, currentAttainment: Math.min(100, Math.max(0, updated)) };
        }
        return co;
      });
      localStorage.setItem("course_outcomes", JSON.stringify(updatedCos));

      // Update aligned POs
      const pos = await this.getProgramOutcomes();
      const updatedPos = pos.map((po) => {
        if (po.alignedCOs.includes(coCode)) {
          const updated = Math.round(po.currentAttainment * 0.75 + score * 0.25);
          return { ...po, currentAttainment: Math.min(100, Math.max(0, updated)) };
        }
        return po;
      });
      localStorage.setItem("program_outcomes", JSON.stringify(updatedPos));

      return { cos: updatedCos, pos: updatedPos };
    } catch (error) {
      console.error("Failed to update attainment:", error);
    }
  },

  /**
   * Get recent learner activity trail
   */
  async getRecentActivities() {
    try {
      const saved = localStorage.getItem("recent_activities");
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  },

  /**
   * Log a new activity in the local demo session
   */
  logActivity(activity) {
    const existing = JSON.parse(localStorage.getItem("recent_activities") || JSON.stringify(INITIAL_ACTIVITIES));
    const updated = [
      {
        id: `act-${Date.now()}`,
        timestamp: "Just now",
        ...activity
      },
      ...existing.slice(0, 9)
    ];
    localStorage.setItem("recent_activities", JSON.stringify(updated));
    return updated;
  }
};

export default outcomeService;
