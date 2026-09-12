import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LearningProvider } from "./context/LearningContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// 12 Application Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LearnerProfile from "./pages/LearnerProfile";
import CreateLearningPath from "./pages/CreateLearningPath";
import Roadmap from "./pages/Roadmap";
import TopicDetails from "./pages/TopicDetails";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import AdaptiveRecommendation from "./pages/AdaptiveRecommendation";
import Progress from "./pages/Progress";
import Outcomes from "./pages/Outcomes";
import Profile from "./pages/Profile";

import "./styles/index.css";
import "./styles/App.css";

// Layout wrapper managing sidebar toggle and responsive container
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <div className="auth-layout" style={{ minHeight: "100vh", background: "var(--bg-app)" }}>
        {children}
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content-wrapper">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LearningProvider>
          <Layout>
            <Routes>
              {/* 1. Login & Register */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 2. Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 3. Learner Profile */}
              <Route path="/learner-profile" element={<LearnerProfile />} />

              {/* 4. Create Learning Path */}
              <Route path="/create-learning-path" element={<CreateLearningPath />} />

              {/* 5. Generated Roadmap */}
              <Route path="/roadmap" element={<Roadmap />} />

              {/* 6. Topic Details */}
              <Route path="/topics/:topicId" element={<TopicDetails />} />

              {/* 7. Assessment */}
              <Route path="/assessment/:topicId" element={<Assessment />} />

              {/* 8. Assessment Result */}
              <Route path="/assessment-result/:resultId" element={<AssessmentResult />} />
              <Route path="/assessment-result" element={<AssessmentResult />} />

              {/* 9. Adaptive Recommendation */}
              <Route path="/adaptive-recommendation/:resultId" element={<AdaptiveRecommendation />} />
              <Route path="/adaptive-recommendation" element={<AdaptiveRecommendation />} />

              {/* 10. Progress Tracking */}
              <Route path="/progress" element={<Progress />} />

              {/* 11. CO / PO Outcome View */}
              <Route path="/outcomes" element={<Outcomes />} />

              {/* 12. Profile / Settings */}
              <Route path="/profile" element={<Profile />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </LearningProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
