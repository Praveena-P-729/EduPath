import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';

// Context & Hooks
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProgressCard from './components/ProgressCard';
import SkillCard from './components/SkillCard';
import Loading from './components/Loading';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ResumeUpload from './pages/ResumeUpload';
import SkillAnalysis from './pages/SkillAnalysis';
import LearningPath from './pages/LearningPath';
import WeeklyPlan from './pages/WeeklyPlan';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Reports from './pages/Reports';
import Chat from './pages/Chat';

// Icons
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  Bot,
  Zap,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';

// Authenticated Shell Layout
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <Navbar
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Pane */}
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
};

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading type="spinner" text="Authenticating session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

// Full-Featured Dashboard View Component
const DashboardView = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Today's interactive tasks state
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: 'Complete React Hooks optimization module', completed: true, skill: 'React' },
    { id: 2, title: 'Practice REST API error handling & interceptors', completed: true, skill: 'REST APIs' },
    { id: 3, title: 'Study FastAPI APIRouter and dependency injection', completed: false, skill: 'FastAPI' },
    { id: 4, title: 'Solve Java DSA problem on Binary Tree Traversal', completed: false, skill: 'Java' },
  ]);

  const toggleTask = (id) => {
    setTodayTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-[#0F172A] text-white p-6 sm:p-7 rounded-xl border border-slate-800 shadow-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-950/80 border border-teal-800/60 text-[#CCFBF1] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Career Agent Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Good Morning, {currentUser?.fullName || 'Praveena'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Tracking your verified roadmap toward{' '}
              <span className="font-semibold text-[#CCFBF1]">
                {currentUser?.targetRole || 'Full-Stack Developer'}
              </span>
              . You are currently on a {currentUser?.streak || 6}-day learning streak.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/practice')}
              className="px-4 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Start Daily Practice</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-teal-300" />
              <span>Ask AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Career Readiness Main Card */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Career Readiness</span>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-[#0F172A]">72%</h3>
                <span className="text-[11px] font-semibold text-[#15803D] bg-[#DCFCE7] border border-[#86EFAC] px-1.5 py-0.5 rounded">
                  +8% this month
                </span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full h-2 bg-[#F1F5F9] rounded-full mt-3 overflow-hidden">
            <div className="w-[72%] h-full bg-[#0F766E] rounded-full" />
          </div>
          <p className="text-[11px] text-[#64748B] mt-2">Target: Junior Full-Stack Engineer</p>
        </div>

        <ProgressCard
          title="Skills Acquired"
          value="18"
          subtitle="Verified by practice tests"
          change="+3"
          color="emerald"
          icon={CheckCircle2}
        />

        <ProgressCard
          title="Skills In Progress"
          value="6"
          subtitle="Currently active modules"
          color="teal"
          icon={Layers}
        />

        <ProgressCard
          title="Skill Gaps"
          value="8"
          subtitle="Identified from role matrix"
          color="amber"
          icon={Award}
        />
      </div>

      {/* Second Row: Current Learning & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Learning Progress */}
        <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Active Modules</span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">Current Learning Competencies</h3>
            </div>
            <Link
              to="/learning-path"
              className="text-xs font-semibold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1 hover:underline"
            >
              <span>View Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {/* React 80% */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0F172A]">React & Modern Hooks</span>
                <span className="font-semibold text-[#0F766E]">80%</span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#0F766E] rounded-full transition-all duration-500 w-[80%]" />
              </div>
            </div>

            {/* FastAPI 60% */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0F172A]">FastAPI & Python Backend</span>
                <span className="font-semibold text-[#0F766E]">60%</span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#0F766E] rounded-full transition-all duration-500 w-[60%]" />
              </div>
            </div>

            {/* PostgreSQL 40% */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0F172A]">PostgreSQL Relational Design</span>
                <span className="font-semibold text-[#64748B]">40%</span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#0F766E] rounded-full transition-all duration-500 w-[40%]" />
              </div>
            </div>
          </div>

          {/* AI Recommendation Insight Card */}
          <div className="p-3.5 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] flex items-start gap-3">
            <div className="p-1.5 rounded-md bg-[#0F766E] text-white shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F766E]">
                <span>Recommendation</span>
              </div>
              <p className="text-xs text-[#0F172A] mt-0.5 leading-relaxed">
                "Strengthen REST API design and request validation before moving to advanced backend microservices."
              </p>
            </div>
          </div>
        </div>

        {/* Today's Tasks Checklist */}
        <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Action Items</span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">Today's Learning Tasks</h3>
            </div>
            <Link
              to="/weekly-plan"
              className="text-xs font-semibold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1 hover:underline"
            >
              <span>Weekly Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {todayTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  t.completed
                    ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <button type="button" className="text-[#0F766E]">
                    {t.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] fill-[#DCFCE7]" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <span className={`text-xs font-medium ${t.completed ? 'line-through text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                    {t.title}
                  </span>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] shrink-0 border border-[#E2E8F0]">
                  {t.skill}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-[#64748B]">
            <span>
              {todayTasks.filter((t) => t.completed).length} of {todayTasks.length} Completed
            </span>
            <span className="font-semibold text-[#0F766E]">2.5 hrs remaining today</span>
          </div>
        </div>
      </div>

      {/* Quick Access Skill Gaps Section */}
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Top Priorities</span>
            <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">High-Impact Skill Gaps to Close</h3>
          </div>
          <Link
            to="/skills"
            className="text-xs font-semibold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1 hover:underline"
          >
            <span>Full Skill Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkillCard
            name="Docker"
            category="DevOps"
            level="Missing"
            score={20}
            actionLabel="Start Lab"
            onAction={() => navigate('/practice')}
          />
          <SkillCard
            name="PostgreSQL"
            category="Database"
            level="Developing"
            score={45}
            actionLabel="Practice SQL"
            onAction={() => navigate('/practice')}
          />
          <SkillCard
            name="System Design"
            category="Architecture"
            level="Missing"
            score={10}
            actionLabel="Read Guide"
            onAction={() => navigate('/learning-path')}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Authenticated Dashboard Core Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumeUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <SkillAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-path"
            element={
              <ProtectedRoute>
                <LearningPath />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weekly-plan"
            element={
              <ProtectedRoute>
                <WeeklyPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
