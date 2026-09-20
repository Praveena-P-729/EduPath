import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  GitFork,
  Target,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Layers,
  ChevronRight
} from 'lucide-react';
import roadmapService from '../services/roadmapService';
import skillService from '../services/skillService';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';

export const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [targetRole, setTargetRole] = useState(
    location.state?.targetRole || currentUser?.targetRole || 'Frontend Developer'
  );
  const [missingSkills, setMissingSkills] = useState(location.state?.missingSkills || null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedTopics, setCompletedTopics] = useState({
    'Git & Version Control_Git branching and pull requests': true,
    'REST API_HTTP status codes & methods': true
  });

  const toggleTopic = (skill, topic) => {
    const key = `${skill}_${topic}`;
    setCompletedTopics((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        let skillsToAnalyze = missingSkills;

        // If no missing skills passed in route state, fetch from skill analysis
        if (!skillsToAnalyze) {
          const analysis = await skillService.getSkillAnalysis(targetRole);
          const gaps = analysis.skillsBreakdown
            ? analysis.skillsBreakdown.filter((s) => s.status === 'missing').map((s) => s.name)
            : ['REST API', 'TypeScript'];
          skillsToAnalyze = gaps;
          setMissingSkills(gaps);
        }

        const data = await roadmapService.generateRoadmap(targetRole, skillsToAnalyze);
        setRoadmapData(data);
      } catch (err) {
        console.error('Failed to generate roadmap:', err);
        setError('Failed to generate learning roadmap. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [targetRole]);

  const handleStartLearning = (skillName) => {
    navigate('/practice', { state: { skill: skillName } });
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]';
      case 'medium':
        return 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]';
      case 'low':
      default:
        return 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]';
    }
  };

  if (loading) {
    return <Loading type="pulse" text="Generating your personalized learning roadmap..." />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              Personalized Learning Roadmap
            </span>
            <span className="text-xs text-[#64748B]">• Step-by-Step Curriculum</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Your Personalized Learning Roadmap
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Sequential curriculum generated from your detected skill gaps for{' '}
            <strong className="text-[#0F172A]">{targetRole}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => navigate('/skills')}
            className="px-4 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Target className="w-4 h-4 text-[#0F766E]" />
            <span>Back to Skill Gap</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/weekly-plan')}
            className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>View Weekly Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role Summary Pill */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-card">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#0F766E]" />
          <span className="text-xs font-semibold text-[#64748B]">Target Role:</span>
          <span className="text-xs font-bold text-[#0F172A] bg-[#F1F5F9] px-2.5 py-0.5 rounded-md border border-[#E2E8F0]">
            {targetRole}
          </span>
        </div>

        {roadmapData?.roadmap && (
          <div className="text-xs text-[#64748B]">
            <span className="font-semibold text-[#0F766E]">{roadmapData.roadmap.length}</span> Skills in Roadmap •{' '}
            <span className="font-semibold text-[#0F766E]">
              {roadmapData.roadmap.reduce((acc, curr) => acc + (curr.estimated_days || 0), 0)}
            </span>{' '}
            Total Estimated Days
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FECACA] text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* No Missing Skills Empty State */}
      {!error && (!roadmapData?.roadmap || roadmapData.roadmap.length === 0) && (
        <div className="bg-white p-8 sm:p-12 rounded-xl border border-[#E2E8F0] shadow-card text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">All Required Skills Mastered</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              You're already meeting the required skills for this role. No additional learning roadmap is required.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/practice')}
              className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Practice Verified Skills
            </button>
          </div>
        </div>
      )}

      {/* Roadmap Skills List */}
      {roadmapData?.roadmap && roadmapData.roadmap.length > 0 && (
        <div className="space-y-4">
          {roadmapData.roadmap.map((item, index) => {
            const totalTopics = item.topics?.length || 1;
            const completedCount = item.topics
              ? item.topics.filter((t) => completedTopics[`${item.skill}_${t}`]).length
              : 0;
            const currentProgress = Math.round((completedCount / totalTopics) * 100);

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-card hover:border-[#CBD5E1] transition-colors space-y-5"
              >
                {/* Header: Skill Name, Priority & Estimated Days */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold text-xs shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">{item.skill}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${getPriorityBadgeClass(
                            item.priority
                          )}`}
                        >
                          {item.priority} Priority
                        </span>
                        <span className="text-[11px] font-medium text-[#64748B] flex items-center gap-1 bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          Estimated: {item.estimated_days} Days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Start Learning Action */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStartLearning(item.skill)}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Practice {item.skill}</span>
                    </button>
                  </div>
                </div>

                {/* Topics Checklist with Interactive Checkboxes */}
                {item.topics && item.topics.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider block">
                        Curriculum Topics & Milestones
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        {completedCount} of {totalTopics} completed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {item.topics.map((topic, topicIdx) => {
                        const isDone = !!completedTopics[`${item.skill}_${topic}`];
                        return (
                          <div
                            key={topicIdx}
                            onClick={() => toggleTopic(item.skill, topic)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors select-none ${
                              isDone
                                ? 'bg-[#F0FDFA] border-[#CCFBF1] text-[#0F766E] font-medium'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isDone ? 'text-[#16A34A] fill-[#DCFCE7]' : 'text-[#CBD5E1]'
                              }`}
                            />
                            <span className={`truncate ${isDone ? 'line-through opacity-80' : ''}`}>{topic}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#64748B]">Progress: {currentProgress}%</span>
                    <span className="text-[11px] text-[#0F766E] font-medium">
                      {currentProgress === 100 ? 'Module Completed!' : `${totalTopics - completedCount} topics remaining`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        currentProgress === 100 ? 'bg-[#16A34A]' : 'bg-[#0F766E]'
                      }`}
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Roadmap;
