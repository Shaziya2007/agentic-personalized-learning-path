/**
 * Roadmap Service Layer
 * 
 * Handles generation of personalized learning paths via LLM backend,
 * phase navigation, topic retrieval, and progress status tracking.
 * 
 * Target Spring Boot endpoints:
 * - GET  /api/roadmaps/current
 * - POST /api/roadmaps/generate
 * - GET  /api/topics/{topicId}
 * - PUT  /api/topics/{topicId}/status
 */
import { INITIAL_ROADMAP } from "../data/mockData";

export const roadmapService = {
  /**
   * Fetch current active learning roadmap
   */
  async getRoadmap() {
    try {
      const saved = localStorage.getItem("active_roadmap");
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_ROADMAP;
    } catch (error) {
      console.warn("Using mock roadmap data fallback:", error);
      return INITIAL_ROADMAP;
    }
  },

  /**
   * Request LLM to generate a personalized learning path
   */
  async generateRoadmap(profile) {
    // Simulated generation delay for realistic presentation
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newRoadmap = {
      ...INITIAL_ROADMAP,
      id: `roadmap-${Date.now()}`,
      learningGoal: profile.learningGoal || INITIAL_ROADMAP.learningGoal,
      targetDuration: profile.targetDuration || INITIAL_ROADMAP.targetDuration,
      availableHoursPerWeek: profile.availableHoursPerWeek || INITIAL_ROADMAP.availableHoursPerWeek,
      generatedAt: new Date().toISOString()
    };

    localStorage.setItem("active_roadmap", JSON.stringify(newRoadmap));
    return newRoadmap;
  },

  /**
   * Get single topic details by ID
   */
  async getTopicDetails(topicId) {
    const roadmap = await this.getRoadmap();
    for (const phase of roadmap.phases) {
      const found = phase.topics.find((t) => t.id === topicId);
      if (found) {
        return { ...found, phaseTitle: phase.title, phaseNumber: phase.phaseNumber };
      }
    }

    // Fallback topic if not found
    return {
      id: topicId,
      topicName: "Topic Details",
      learningObjective: "Master foundational engineering concepts aligned with Course Outcomes.",
      explanation: "Comprehensive instructional overview and algorithmic analysis for this module.",
      resources: [
        { title: "Standard Specification Guide", type: "Reading", url: "#" },
        { title: "Video Lecture Series", type: "Video", url: "#" }
      ],
      activities: [
        "Complete hands-on implementation lab.",
        "Perform algorithmic complexity verification."
      ],
      milestone: "Diagnostic outcome assessment pass.",
      co: "CO1",
      po: "PO1",
      status: "In Progress",
      estimatedHours: 4
    };
  },

  /**
   * Update topic status in roadmap
   */
  async updateTopicStatus(topicId, newStatus, score = null) {
    const roadmap = await this.getRoadmap();

    const newPhases = roadmap.phases.map((phase) => {
      const newTopics = phase.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            status: newStatus,
            score: score !== null ? score : t.score
          };
        }
        return t;
      });
      return { ...phase, topics: newTopics };
    });

    // Recalculate totals
    let total = 0;
    let completed = 0;
    newPhases.forEach((p) => {
      p.topics.forEach((t) => {
        total++;
        if (t.status === "Completed") completed++;
      });
    });

    const updatedRoadmap = {
      ...roadmap,
      phases: newPhases,
      totalTopics: total,
      completedTopics: completed,
      overallProgress: Math.round((completed / (total || 1)) * 100)
    };

    localStorage.setItem("active_roadmap", JSON.stringify(updatedRoadmap));
    return updatedRoadmap;
  },

  /**
   * Save full updated roadmap (used when adaptive modifications occur)
   */
  saveRoadmap(roadmap) {
    localStorage.setItem("active_roadmap", JSON.stringify(roadmap));
    return roadmap;
  }
};

export default roadmapService;
