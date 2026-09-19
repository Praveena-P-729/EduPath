import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Target,
  FileSearch,
  GitBranch,
  BookMarked,
  Cpu,
  BarChart3,
  Flame,
  Bot,
  CheckCircle,
  Zap,
} from 'lucide-react';

export const Landing = () => {
  const features = [
    {
      title: 'Resume & Skill Analysis',
      description: 'Upload your resume in PDF/DOCX format. Our AI extracts existing technical competencies and certifications in seconds.',
      icon: FileSearch,
    },
    {
      title: 'Skill Gap Detection',
      description: 'Benchmark your profile against target industry roles (e.g. Full-Stack, AI Engineer) and identify exact missing requirements.',
      icon: Target,
    },
    {
      title: 'Personalized Learning Path',
      description: 'Receive an automated, step-by-step curriculum with estimated durations and milestone tracking tailored to your pace.',
      icon: GitBranch,
    },
    {
      title: 'Smart Resource Recommendations',
      description: 'Get hand-picked, high-yield courses, interactive coding labs, and documentation mapped directly to your skill deficits.',
      icon: BookMarked,
    },
    {
      title: 'Adaptive Practice Generator',
      description: 'Generate real-time MCQs, coding challenges, and debugging exercises with instant explanations and score tracking.',
      icon: Cpu,
    },
    {
      title: 'Live Progress Analytics',
      description: 'Visualize your weekly study hours, competency growth curves, and skill distribution with interactive charts.',
      icon: BarChart3,
    },
    {
      title: 'Adaptive Feedback Engine',
      description: 'Your weekly study roadmap automatically recalculates and shifts focus based on your practice test performance.',
      icon: Zap,
    },
    {
      title: '24/7 AI Career Mentor',
      description: 'Ask questions anytime. Receive context-aware advice, mock interview tips, and project architecture feedback.',
      icon: Bot,
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Your Profile', desc: 'Set your education, current skills, and target career goal.' },
    { step: '02', title: 'Resume & Skill Analysis', desc: 'Instant AI parsing of your resume and past projects.' },
    { step: '03', title: 'Skill Gap Detection', desc: 'Map your skills into Strong, Developing, and Missing tiers.' },
    { step: '04', title: 'Personalized Learning Path', desc: 'Synthesize a modular roadmap and customized weekly plan.' },
    { step: '05', title: 'Practice & Challenges', desc: 'Solve targeted coding quizzes and debugging problems.' },
    { step: '06', title: 'Progress Tracking', desc: 'Monitor readiness scores, streaks, and mastery velocity.' },
    { step: '07', title: 'Adaptive Learning', desc: 'AI recalibrates your next modules for maximum career readiness.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#CCFBF1] selection:text-[#0F766E]">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-[#0F172A]">EduPath</span>
              <span className="text-xs font-semibold text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-1.5 py-0.5 rounded">AI</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <a href="#features" className="hover:text-[#0F766E] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#0F766E] transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-[#0F766E] transition-colors">Platform</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg shadow-xs transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Career Readiness & Skill Gap Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Accelerate your path to <br className="hidden sm:inline" />
            <span className="text-[#0F766E]">career mastery</span> with personalized AI
          </h1>

          <p className="mt-6 text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Discover your skill gaps, generate an adaptive curriculum, and practice targeted technical challenges designed for real-world engineering roles.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0F766E] text-white font-semibold text-sm shadow-xs hover:bg-[#115E59] transition-colors"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0F172A] font-semibold text-sm border border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
            >
              <span>Explore Platform</span>
            </a>
          </div>

          {/* Visual Dashboard Preview */}
          <div id="preview" className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white border border-[#E2E8F0] shadow-card p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <span className="text-xs font-medium text-[#64748B] ml-2">EduPath AI Workspace Preview</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                <Zap className="w-3.5 h-3.5" /> Target: Full-Stack Engineer
              </div>
            </div>

            {/* Grid content inside mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {/* Metric 1 */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B]">Target Readiness</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-[#0F172A]">74%</span>
                  <span className="text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded">+8% this week</span>
                </div>
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full mt-3 overflow-hidden">
                  <div className="w-[74%] h-full bg-[#0F766E] rounded-full"></div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B]">Identified Skill Gaps</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-bold text-[#0F172A]">4 Areas</span>
                  <span className="text-xs font-semibold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">Actionable</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626]">Docker</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FEF3C7] text-[#D97706]">PostgreSQL</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E]">REST APIs</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B]">AI Recommendation</span>
                <p className="text-xs text-[#0F172A] font-medium mt-1 leading-relaxed">
                  "Complete the PostgreSQL indexing practice module to boost your backend readiness score."
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F766E] mt-2">
                  <Bot className="w-3.5 h-3.5" /> EduPath Agent
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">Features & Capabilities</h2>
            <h3 className="text-3xl font-bold text-[#0F172A] mt-2 tracking-tight">
              A Complete System for Career Engineering
            </h3>
            <p className="mt-3 text-[#64748B] text-base">
              Everything required to benchmark your skills, close gaps with high-yield resources, and verify proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F766E] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-[#0F172A] mb-2">{f.title}</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">The Learning Pipeline</h2>
            <h3 className="text-3xl font-bold text-[#0F172A] mt-2 tracking-tight">
              How EduPath AI Works
            </h3>
            <p className="mt-3 text-[#64748B] text-base">
              A closed-loop AI architecture designed to close your skill gaps through personalized execution.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {workflowSteps.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] font-bold text-xs flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#0F172A]">{item.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#CCFBF1] text-xs font-semibold mb-5 border border-slate-700">
            <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Join ambitious engineers leveling up their skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Start Building Your Career Path Today
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Upload your resume, detect your skill gaps, and get your AI-generated roadmap in under 60 seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#115E59] transition-colors"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
        <p>© 2026 EduPath AI – Personalized Learning & Skill Gap Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
