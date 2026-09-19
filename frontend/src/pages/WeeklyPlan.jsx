import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Flame,
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import Loading from '../components/Loading';

export const WeeklyPlan = () => {
  const navigate = useNavigate();
  const { weeklyPlan, weeklyCompletionRate, toggleTask, loading } = useProgress();

  if (loading) {
    return <Loading type="pulse" text="Loading your customized weekly learning schedule..." />;
  }

  const completedCount = weeklyPlan.filter((t) => t.completed).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header Banner with Live Completion */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              Weekly Execution Board
            </span>
            <span className="text-xs text-[#64748B]">• Day-by-Day Commitment</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Personalized Weekly Study Schedule
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Structured daily micro-tasks designed to fit your 15 hours/week target.
          </p>
        </div>

        {/* Dynamic Completion Widget */}
        <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] shrink-0 w-full sm:w-auto min-w-[240px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-[#0F172A]">Weekly Completion</span>
            <span className="text-sm font-bold text-[#0F766E]">{weeklyCompletionRate}%</span>
          </div>
          <div className="w-full h-2 bg-[#CCFBF1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F766E] rounded-full transition-all duration-500"
              style={{ width: `${weeklyCompletionRate}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-[#64748B] font-medium">
            <span>{completedCount} of {weeklyPlan.length} Tasks Done</span>
            <span className="text-[#0F766E] font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#D97706]" /> On Track
            </span>
          </div>
        </div>
      </div>

      {/* Daily Cards List */}
      <div className="space-y-3">
        {weeklyPlan.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className={`p-5 rounded-xl border transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card ${
              item.completed
                ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                : 'bg-white border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Checkbox Trigger */}
              <button
                type="button"
                className="mt-0.5 text-[#0F766E]"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                ) : (
                  <Circle className="w-5 h-5 text-[#CBD5E1] hover:text-[#0F766E]" />
                )}
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    item.completed ? 'bg-[#E2E8F0] text-[#64748B]' : 'bg-[#0F766E] text-white'
                  }`}>
                    {item.day}
                  </span>

                  <span className="text-xs font-medium text-[#0F172A] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {item.skill}
                  </span>

                  <span className="text-xs font-medium text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                    {item.duration}
                  </span>
                </div>

                <h3 className={`text-sm font-semibold mt-1.5 ${item.completed ? 'line-through text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                  {item.task}
                </h3>
                <p className={`text-xs mt-0.5 ${item.completed ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  {item.topic}
                </p>
              </div>
            </div>

            {/* Status chip */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                  item.completed
                    ? 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]'
                    : 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                }`}
              >
                {item.completed ? 'Done' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to practice */}
      <div className="p-6 bg-[#0F172A] text-white rounded-xl shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CCFBF1]" />
            Ready for your weekly check-in quiz?
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Test the skills you studied this week to automatically adapt next week's schedule.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/practice')}
          className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          Launch Practice Quiz
        </button>
      </div>
    </div>
  );
};

export default WeeklyPlan;
