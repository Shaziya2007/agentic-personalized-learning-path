# AdaptivePath Frontend
## System and Method for Generating Personalized and Adaptive Learning Paths with Outcome-Based Education Alignment

A modern, responsive, component-driven React application demonstrating personalized curriculum generation via LLMs, dynamic assessment-driven path adaptation, and formal Outcome-Based Education (OBE) alignment with Course Outcomes (COs) and Program Outcomes (POs).

---

## 🌟 Key Features

1. **Outcome-Based Education (OBE) Alignment**:
   - Predefined academic Course Outcomes (`CO1` to `CO5`) and Program Outcomes (`PO1` to `PO5`).
   - Bloom’s Revised Taxonomy classification for each competency level.
   - Dynamic real-time calculation and visualization of CO/PO attainment.

2. **Core Adaptive Learning Engine**:
   - **Strong Performance ($\ge 80\%$)**:
     - Recognizes advanced mastery.
     - Unlocks advanced honors electives.
     - Fast-tracks roadmap pacing.
   - **Moderate Performance ($50\% - 79\%$)**:
     - Satisfies passing criteria.
     - Injects targeted reinforcement drills and practical exercises.
   - **Weak Performance ($< 50\%$)**:
     - Flags conceptual weaknesses.
     - Injects prerequisite remedial learning modules.
     - Schedules mandatory reassessment before advancing.

3. **12 Comprehensive Application Pages**:
   - **Login & Register**: Authentication forms with input validation and clean JWT separation.
   - **Dashboard**: High-level telemetry, active goal, overall progress bar, current topic, and OBE snapshots.
   - **Learner Profile**: Personal configuration for goals, skills, experience level, weak areas, and hours/week.
   - **Create Learning Path**: Guided path generator simulating multi-step LLM curriculum synthesis.
   - **Generated Roadmap**: Hierarchical timeline: Learning Goal $\rightarrow$ Phases $\rightarrow$ Topics $\rightarrow$ Milestones.
   - **Topic Details**: Deep-dive learning view with objectives, conceptual explanation, curated resources, and engineering activities.
   - **Assessment**: Interactive multi-choice diagnostic test (answers hidden until submission).
   - **Assessment Result**: Score breakdown, performance badge (Strong / Moderate / Weak), identified weak concepts, and "What happens next?".
   - **Adaptive Recommendation**: Step-by-step visual audit trail explaining why and how the curriculum mutated.
   - **Progress Tracking**: Overall completion %, phase pacing breakdown, assessment score history, and chronological activity feed.
   - **CO / PO Outcome View**: Formal OBE dashboard showing attainment metrics and contributing modules.
   - **Profile / Settings**: Student information, learning preferences, and demonstration state reset controls.

---

## 📁 Architecture & Folder Structure

```
src/
├── components/          # Reusable UI widgets
│   ├── AssessmentQuestion.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── ErrorMessage.jsx
│   ├── Icons.jsx        # Lightweight SVG icon collection
│   ├── LoadingState.jsx
│   ├── Navbar.jsx
│   ├── OutcomeCard.jsx
│   ├── PerformanceBadge.jsx
│   ├── PhaseCard.jsx
│   ├── ProgressBar.jsx
│   ├── RoadmapCard.jsx
│   ├── ScoreCard.jsx
│   ├── Sidebar.jsx
│   └── TopicCard.jsx
├── context/             # State management
│   ├── AuthContext.jsx
│   ├── LearningContext.jsx
│   ├── useAuth.js
│   └── useLearning.js
├── data/
│   └── mockData.js      # Consolidated academic mock data (COs, POs, Phases, Questions)
├── pages/               # 12 application pages
│   ├── AdaptiveRecommendation.jsx
│   ├── Assessment.jsx
│   ├── AssessmentResult.jsx
│   ├── CreateLearningPath.jsx
│   ├── Dashboard.jsx
│   ├── LearnerProfile.jsx
│   ├── Login.jsx
│   ├── Outcomes.jsx
│   ├── Profile.jsx
│   ├── Progress.jsx
│   ├── Register.jsx
│   ├── Roadmap.jsx
│   └── TopicDetails.jsx
├── services/            # Dedicated Spring Boot REST integration layer
│   ├── api.js           # Base HTTP client with VITE_API_BASE_URL & JWT Bearer injection
│   ├── assessmentService.js
│   ├── authService.js
│   ├── outcomeService.js
│   └── roadmapService.js
├── styles/
│   ├── App.css          # App layout, responsive grid, and component styles
│   └── index.css        # Design tokens, CSS variables, and typography
├── App.jsx              # React Router route definitions & layout shell
└── main.jsx             # React DOM entrypoint
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js** (v18 or higher recommended; developed on Node v26)
- **npm** (v9 or higher)

### 2. Installation
```bash
# Navigate to project directory
cd personalized-learning-path-frontend

# Install dependencies (React 19 & React Router 7)
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

## 🔌 Connecting to the Spring Boot Backend

The frontend is designed with an isolated service architecture so the Spring Boot REST API can be attached without altering React components:

1. **Configure Environment Variable**:
   Create a `.env` file from `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

2. **Service Endpoints Mapping (`src/services/`)**:
   - `authService.js`:
     - `POST /api/auth/login` (Returns JWT token)
     - `POST /api/auth/register`
     - `GET  /api/users/profile`
   - `roadmapService.js`:
     - `GET  /api/roadmaps/current`
     - `POST /api/roadmaps/generate` (LLM-generated roadmap)
     - `GET  /api/topics/{topicId}`
     - `PUT  /api/topics/{topicId}/status`
   - `assessmentService.js`:
     - `GET  /api/assessments/topic/{topicId}`
     - `POST /api/assessments/submit`
     - `GET  /api/assessments/results/{resultId}`
     - `GET  /api/assessments/results/{resultId}/adaptive-recommendation`
   - `outcomeService.js`:
     - `GET  /api/outcomes/cos`
     - `GET  /api/outcomes/pos`
     - `GET  /api/progress/metrics`
     - `GET  /api/progress/activities`

3. **Isolated Mock Data**:
   All mock data is strictly located in `src/data/mockData.js`. Once endpoints are live, simply remove the demo fallbacks in `src/services/`.

---

## 🎯 Demonstration Flow for Project Evaluators

1. **Dashboard Overview**: Observe active goal, overall completion percentage, current topic, and Course/Program Outcome metrics.
2. **Curriculum Roadmap**: Navigate to "My Learning Path" to explore Phase 1, Phase 2, and Phase 3 with expandable topic cards displaying learning objectives, activities, and CO/PO badges.
3. **Module Study**: Open **Topic T201** ("Architectural Patterns & REST Contract Design") and inspect objectives and activities.
4. **Diagnostic Assessment**: Click **Take Assessment** and submit answers.
5. **Adaptive Result**:
   - Scores $\ge 80\% \rightarrow$ Strong Performance $\rightarrow$ Accelerated path with Honors Elective.
   - Scores $< 50\% \rightarrow$ Weak Performance $\rightarrow$ Identifies specific failed concepts $\rightarrow$ Injects Remedial Module.
6. **Adaptive Recommendation View**: Inspect the 5-step lifecycle flowchart and click "Apply Adapted Changes to My Roadmap".
7. **OBE Dashboard**: View the updated Course Outcomes and Program Outcomes attainment percentages.
