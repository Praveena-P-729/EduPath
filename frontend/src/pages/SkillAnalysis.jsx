import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Zap
} from 'lucide-react';
import skillService from '../services/skillService';
import SkillCard from '../components/SkillCard';
import Loading from '../components/Loading';

export const SkillAnalysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedRole, setSelectedRole] = useState('Full-Stack Developer');

  useEffect(() => {
    const loadAnalysis = async () => {
      setLoading(false);
      const result = await skillService.getSkillAnalysis(selectedRole);
      setData(result);
    };
    loadAnalysis();
  }, [selectedRole]);

  if (loading || !data) {
    return <Loading type="pulse" text="Calculating AI Skill Gap Matrix..." />;
  }

  const strongSkills = data.skillsBreakdown.filter((s) => s.status === 'strong');
  const developingSkills = data.skillsBreakdown.filter((s) => s.status === 'developing');
  const missingSkills = data.skillsBreakdown.filter((s) => s.status === 'missing');

  const filteredSkills = data.skillsBreakdown.filter((s) => {
    if (activeFilter === 'All') return true;
    return s.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              AI Skill Matrix
            </span>
            <span className="text-xs text-[#64748B]">• Role Readiness Benchmark</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Skill Gap & Competency Analysis
          </h1>
          <p className="text-xs text-[#64748B] max-w-xl">
            Comparing your verified competencies against industry expectations for{' '}
            <strong className="text-[#0F172A]">{selectedRole}</strong>.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => navigate('/learning-path')}
          className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Build Learning Path</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Role Selector & Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Role Picker Card */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Target Role</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full mt-2 px-3 py-2 text-xs font-medium bg-white border border-[#CBD5E1] rounded-lg focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-[#0F172A] outline-none"
          >
            <option value="Full-Stack Developer">Full-Stack Developer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="AI / ML Engineer">AI / ML Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="DevOps & Cloud Specialist">DevOps & Cloud Specialist</option>
          </select>
          <div className="mt-3 text-[11px] text-[#64748B] flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>11 Core competencies benchmarked</span>
          </div>
        </div>

        {/* Strong Skills Count */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Strong Skills</span>
            <h3 className="text-xl font-bold text-[#0F172A]">{strongSkills.length} Verified</h3>
            <span className="text-[11px] text-[#16A34A] font-medium">Ready for production</span>
          </div>
        </div>

        {/* Developing Skills Count */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">In Progress</span>
            <h3 className="text-xl font-bold text-[#0F172A]">{developingSkills.length} Developing</h3>
            <span className="text-[11px] text-[#D97706] font-medium">Needs focused practice</span>
          </div>
        </div>

        {/* Missing Skills Count */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Missing Gaps</span>
            <h3 className="text-xl font-bold text-[#0F172A]">{missingSkills.length} High Gaps</h3>
            <span className="text-[11px] text-[#DC2626] font-medium">Add to learning roadmap</span>
          </div>
        </div>
      </div>

      {/* Top Priority Gaps Callout */}
      <div className="p-6 bg-[#0F172A] text-white rounded-xl shadow-card">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#CCFBF1]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#CCFBF1]">Top Priority Skill Gaps to Close</h3>
        </div>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl">
          Closing these core requirements will increase your target career readiness score from <strong className="text-white">72% to 94%</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.topSkillGaps.map((gap, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white">{gap.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  gap.priority === 'High' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#FEF3C7] text-[#D97706]'
                }`}>
                  {gap.priority} Priority
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{gap.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#64748B]" />
          <span className="text-xs font-semibold text-[#0F172A]">Filter By Status:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'Strong', 'Developing', 'Missing'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === filter
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, idx) => (
          <SkillCard
            key={idx}
            name={skill.name}
            category={skill.category}
            level={skill.level}
            score={skill.score}
            actionLabel="Start Learning"
            onAction={() => navigate('/practice')}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillAnalysis;
