/**
 * Assessment & Adaptive Evaluation Service
 * 
 * Implements the core adaptive logic:
 * - >= 80%: Strong performance -> Faster progression / advanced topic
 * - 50% - 79%: Moderate performance -> Additional practice
 * - < 50%: Weak performance -> Identify weak concepts, provide remedial learning, schedule reassessment
 * 
 * Target Spring Boot endpoints:
 * - GET  /api/assessments/topic/{topicId}
 * - POST /api/assessments/submit
 * - GET  /api/assessments/results/{resultId}
 * - GET  /api/assessments/results/{resultId}/adaptive-recommendation
 */
import { ASSESSMENT_QUESTIONS, ADAPTIVE_SCENARIOS } from "../data/mockData";

export const assessmentService = {
  /**
   * Fetch assessment questions for a specific topic
   * Answers are omitted from client-side response to prevent inspection
   */
  async getAssessmentByTopic(topicId) {
    const assessmentData = ASSESSMENT_QUESTIONS[topicId] || ASSESSMENT_QUESTIONS.DEFAULT;
    
    // Sanitized questions for client (correctIndex stripped until submit)
    const sanitizedQuestions = assessmentData.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      conceptTested: q.conceptTested
    }));

    return {
      topicId: assessmentData.topicId,
      topicTitle: assessmentData.topicTitle,
      courseOutcome: assessmentData.courseOutcome,
      programOutcome: assessmentData.programOutcome,
      totalQuestions: sanitizedQuestions.length,
      questions: sanitizedQuestions
    };
  },

  /**
   * Submit student answers, calculate performance, identify weak areas,
   * and produce adaptive recommendation.
   */
  async submitAssessment(topicId, selectedAnswers) {
    await new Promise((r) => setTimeout(r, 600));

    const assessmentData = ASSESSMENT_QUESTIONS[topicId] || ASSESSMENT_QUESTIONS.DEFAULT;
    const questions = assessmentData.questions;
    
    let correctCount = 0;
    const weakConcepts = [];
    const questionBreakdown = [];

    questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      const isCorrect = userChoice === q.correctIndex;

      if (isCorrect) {
        correctCount++;
      } else {
        if (!weakConcepts.includes(q.conceptTested)) {
          weakConcepts.push(q.conceptTested);
        }
      }

      questionBreakdown.push({
        questionId: q.id,
        question: q.question,
        userChoice: userChoice !== undefined ? userChoice : null,
        correctIndex: q.correctIndex,
        isCorrect,
        conceptTested: q.conceptTested,
        explanation: q.explanation
      });
    });

    const total = questions.length;
    const score = Math.round((correctCount / total) * 100);

    // Core Adaptive Classification
    let performanceLevel = "WEAK";
    let statusText = "Weak Performance";
    let nextStepRecommendation = "Remedial learning and reassessment are recommended.";

    if (score >= 80) {
      performanceLevel = "STRONG";
      statusText = "Strong Performance";
      nextStepRecommendation = "You're ready to move faster. Advanced learning may be recommended.";
    } else if (score >= 50) {
      performanceLevel = "MODERATE";
      statusText = "Moderate Performance";
      nextStepRecommendation = "Additional practice is recommended.";
    }

    // Generate result payload
    const resultId = `result-${Date.now()}`;
    const result = {
      resultId,
      topicId,
      topicTitle: assessmentData.topicTitle,
      co: assessmentData.courseOutcome,
      po: assessmentData.programOutcome,
      score,
      correctCount,
      totalQuestions: total,
      performanceLevel, // "STRONG" | "MODERATE" | "WEAK"
      statusText,
      nextStepRecommendation,
      weakConcepts,
      questionBreakdown,
      submittedAt: new Date().toISOString()
    };

    // Cache result for display & adaptive recommendation
    sessionStorage.setItem(`result_${resultId}`, JSON.stringify(result));
    sessionStorage.setItem("latest_result_id", resultId);

    return result;
  },

  /**
   * Retrieve assessment result by ID
   */
  async getAssessmentResult(resultId) {
    const saved = sessionStorage.getItem(`result_${resultId}`);
    if (saved) {
      return JSON.parse(saved);
    }

    // Fallback to latest sample result
    const latestId = sessionStorage.getItem("latest_result_id");
    if (latestId) {
      const latest = sessionStorage.getItem(`result_${latestId}`);
      if (latest) return JSON.parse(latest);
    }

    // Default demo result (Moderate)
    return {
      resultId: resultId || "demo-result",
      topicId: "T201",
      topicTitle: "Architectural Patterns & REST Contract Design",
      co: "CO2",
      po: "PO3",
      score: 60,
      correctCount: 3,
      totalQuestions: 5,
      performanceLevel: "MODERATE",
      statusText: "Moderate Performance",
      nextStepRecommendation: "Additional practice is recommended.",
      weakConcepts: ["Behavioral Design Patterns (Strategy vs Factory)"],
      questionBreakdown: [],
      submittedAt: new Date().toISOString()
    };
  },

  /**
   * Get adaptive recommendation details explaining roadmap adjustments
   */
  async getAdaptiveRecommendation(resultId) {
    const result = await this.getAssessmentResult(resultId);
    const level = result.performanceLevel || "MODERATE";
    const scenarioTemplate = ADAPTIVE_SCENARIOS[level] || ADAPTIVE_SCENARIOS.MODERATE;

    return {
      resultId,
      topicId: result.topicId,
      topicTitle: result.topicTitle,
      co: result.co,
      po: result.po,
      score: result.score,
      performanceLevel: level,
      statusText: scenarioTemplate.statusText,
      thresholdLabel: scenarioTemplate.thresholdLabel,
      summary: scenarioTemplate.summary,
      weakConcepts: result.weakConcepts.length > 0 ? result.weakConcepts : scenarioTemplate.weakConcepts,
      explanation: scenarioTemplate.explanation,
      adaptationSteps: scenarioTemplate.adaptationSteps,
      injectedTopic: scenarioTemplate.injectedTopic
    };
  }
};

export default assessmentService;
