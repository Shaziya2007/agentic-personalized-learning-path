import React, { createContext, useState, useEffect } from "react";
import roadmapService from "../services/roadmapService";
import assessmentService from "../services/assessmentService";
import outcomeService from "../services/outcomeService";
import { INITIAL_ROADMAP, PREDEFINED_COS, PREDEFINED_POS, INITIAL_ACTIVITIES } from "../data/mockData";

export const LearningContext = createContext(null);

export const LearningProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState(INITIAL_ROADMAP);
  const [courseOutcomes, setCourseOutcomes] = useState(PREDEFINED_COS);
  const [programOutcomes, setProgramOutcomes] = useState(PREDEFINED_POS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [latestResult, setLatestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data from services
  useEffect(() => {
    async function loadData() {
      try {
        const [rMap, cos, pos, acts] = await Promise.all([
          roadmapService.getRoadmap(),
          outcomeService.getCourseOutcomes(),
          outcomeService.getProgramOutcomes(),
          outcomeService.getRecentActivities()
        ]);
        setRoadmap(rMap);
        setCourseOutcomes(cos);
        setProgramOutcomes(pos);
        setActivities(acts);

        // Check for latest assessment result in session
        const latestId = sessionStorage.getItem("latest_result_id");
        if (latestId) {
          const res = await assessmentService.getAssessmentResult(latestId);
          setLatestResult(res);
        }
      } catch (err) {
        console.error("Failed to load initial learning data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /**
   * Request LLM to generate a new path based on learner criteria
   */
  const generateLearningPath = async (profileData) => {
    setLoading(true);
    try {
      const newRoadmap = await roadmapService.generateRoadmap(profileData);
      setRoadmap(newRoadmap);

      outcomeService.logActivity({
        title: "Learning Path Generated",
        description: `Custom roadmap generated for: ${profileData.learningGoal || "Engineering Specialization"}`,
        type: "roadmap_generated",
        badge: "AI Generated",
        co: "CO1"
      });
      const updatedActs = await outcomeService.getRecentActivities();
      setActivities(updatedActs);

      return newRoadmap;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update the status of any topic (e.g. 'In Progress', 'Completed', 'Needs Review')
   */
  const setTopicStatus = async (topicId, newStatus, score = null) => {
    const updated = await roadmapService.updateTopicStatus(topicId, newStatus, score);
    setRoadmap(updated);
    return updated;
  };

  /**
   * Submit an assessment for a topic
   */
  const submitAssessment = async (topicId, userAnswers) => {
    const result = await assessmentService.submitAssessment(topicId, userAnswers);
    setLatestResult(result);

    // Update topic status based on score
    let topicStatus = "Completed";
    if (result.performanceLevel === "WEAK") {
      topicStatus = "Needs Review";
    } else if (result.performanceLevel === "MODERATE") {
      topicStatus = "Completed";
    }

    await setTopicStatus(topicId, topicStatus, result.score);

    // Update CO/PO attainment levels
    if (result.co) {
      await outcomeService.updateAttainmentOnAssessment(result.co, result.score);
      const updatedCos = await outcomeService.getCourseOutcomes();
      const updatedPos = await outcomeService.getProgramOutcomes();
      setCourseOutcomes(updatedCos);
      setProgramOutcomes(updatedPos);
    }

    // Log recent activity
    outcomeService.logActivity({
      title: "Assessment Attempted",
      description: `Scored ${result.score}% on ${result.topicTitle}`,
      type: "assessment_attempted",
      badge: `${result.score}% (${result.performanceLevel})`,
      co: result.co || "CO2"
    });
    const updatedActs = await outcomeService.getRecentActivities();
    setActivities(updatedActs);

    return result;
  };

  /**
   * Apply adaptive recommendation modifications to the active roadmap
   */
  const applyAdaptiveModification = (recommendation) => {
    if (!recommendation) return;

    setRoadmap((prev) => {
      if (recommendation.injectedTopic) {
        const injected = recommendation.injectedTopic;
        const targetPhaseId = injected.phaseId || prev.currentPhaseId;

        const updatedPhases = prev.phases.map((phase) => {
          if (phase.id === targetPhaseId) {
            const alreadyExists = phase.topics.some((t) => t.id === injected.id);
            if (alreadyExists) return phase;

            return {
              ...phase,
              topics: [injected, ...phase.topics]
            };
          }
          return phase;
        });

        let total = 0;
        let completed = 0;
        updatedPhases.forEach((p) => {
          p.topics.forEach((t) => {
            total++;
            if (t.status === "Completed") completed++;
          });
        });

        const newRoadmap = {
          ...prev,
          phases: updatedPhases,
          totalTopics: total,
          completedTopics: completed,
          overallProgress: Math.round((completed / (total || 1)) * 100)
        };

        roadmapService.saveRoadmap(newRoadmap);

        outcomeService.logActivity({
          title: "Roadmap Adapted",
          description: recommendation.performanceLevel === "WEAK" 
            ? `Remedial topic injected: ${injected.topicName}`
            : `Honors elective added: ${injected.topicName}`,
          type: "roadmap_adapted",
          badge: recommendation.performanceLevel === "WEAK" ? "Remedial Path" : "Accelerated",
          co: injected.co
        });

        return newRoadmap;
      }
      return prev;
    });
  };

  /**
   * Reset demonstration data back to pristine initial state
   */
  const resetDemoData = () => {
    localStorage.removeItem("active_roadmap");
    localStorage.removeItem("course_outcomes");
    localStorage.removeItem("program_outcomes");
    localStorage.removeItem("recent_activities");
    sessionStorage.clear();

    setRoadmap(INITIAL_ROADMAP);
    setCourseOutcomes(PREDEFINED_COS);
    setProgramOutcomes(PREDEFINED_POS);
    setActivities(INITIAL_ACTIVITIES);
    setLatestResult(null);
  };

  return (
    <LearningContext.Provider
      value={{
        roadmap,
        courseOutcomes,
        programOutcomes,
        activities,
        latestResult,
        loading,
        generateLearningPath,
        setTopicStatus,
        submitAssessment,
        applyAdaptiveModification,
        resetDemoData
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export default LearningContext;

export { useLearning } from "./useLearning";
