import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
  Flame,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import progressService from '../services/progressService';
import ProgressCard from '../components/ProgressCard';
import Loading from '../components/Loading';

export const Progress = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const metrics = await progressService.getProgressMetrics();
        setData(metrics);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  if (loading || !data) {
    return <Loading type="pulse" text="Synthesizing performance graphs & progress vectors..." />;
  }

  const chartColors = ['#0F766E', '#16A34A', '#D97706', '#64748B', '#0284C7'];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              Telemetry & Growth
            </span>
            <span className="text-xs text-[#64748B]">• Real-Time Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Learning Progress & Analytics
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Holistic breakdown of your study hours, mastery velocity, and streak momentum.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg text-[#D97706] text-xs font-semibold">
          <Flame className="w-4 h-4 text-[#D97706]" />
          <span>{data.currentStreak} Days Active Streak</span>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ProgressCard
          title="Overall Progress"
          value={`${data.overallProgress}%`}
          subtitle="Curriculum Completion"
          change="+12%"
          color="indigo"
          icon={TrendingUp}
          progress={data.overallProgress}
        />

        <ProgressCard
          title="Learning Hours"
          value={`${data.learningHours}h`}
          subtitle="Logged Study Time"
          change="+4.5h"
          color="violet"
          icon={Clock}
        />

        <ProgressCard
          title="Tasks Completed"
          value={data.tasksCompleted}
          subtitle="Weekly Milestones"
          change="+8"
          color="emerald"
          icon={CheckCircle2}
        />

        <ProgressCard
          title="Practice Score"
          value={`${data.practiceScore}%`}
          subtitle="Quiz Accuracy"
          change="+5%"
          color="blue"
          icon={Award}
        />

        <ProgressCard
          title="Current Streak"
          value={`${data.currentStreak} Days`}
          subtitle="Consistency Rank"
          color="amber"
          icon={Flame}
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Skill Progress Over Time (Line) */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Growth Trajectory</span>
              <h3 className="text-sm font-bold text-[#0F172A]">Skill Competency Velocity</h3>
            </div>
            <span className="text-xs text-[#0F766E] font-semibold bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-0.5 rounded">Last 6 Weeks</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.skillProgressHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="frontend" stroke="#0F766E" strokeWidth={2.5} name="Frontend" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="backend" stroke="#16A34A" strokeWidth={2.5} name="Backend" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="database" stroke="#D97706" strokeWidth={2} name="Database" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="devops" stroke="#64748B" strokeWidth={2} name="DevOps" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Daily Learning Hours (Bar) */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Weekly Effort</span>
              <h3 className="text-sm font-bold text-[#0F172A]">Learning Hours by Day</h3>
            </div>
            <span className="text-xs text-[#0F766E] font-semibold bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-0.5 rounded">Target: 15h/wk</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.learningHoursPerDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  formatter={(val) => [`${val} hours`, 'Study Time']}
                />
                <Bar dataKey="hours" fill="#0F766E" radius={[6, 6, 0, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Task Completion Rate */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Consistency</span>
              <h3 className="text-sm font-bold text-[#0F172A]">Weekly Completion Rate</h3>
            </div>
            <span className="text-xs text-[#16A34A] font-semibold bg-[#DCFCE7] border border-[#BBF7D0] px-2.5 py-0.5 rounded">82% Avg</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyCompletionRate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Completion']}
                />
                <Bar dataKey="rate" fill="#16A34A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Skill Distribution (Donut) */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Focus Areas</span>
              <h3 className="text-sm font-bold text-[#0F172A]">Skill Time Allocation</h3>
            </div>
            <span className="text-xs text-[#64748B] font-medium">All Domains</span>
          </div>

          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Allocation']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
