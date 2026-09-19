import React, { useState, useEffect } from 'react';
import {
  Award,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Calendar,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import progressService from '../services/progressService';
import Loading from '../components/Loading';

export const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        const r = await progressService.getCareerReport();
        setReport(r);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  };

  if (loading || !report) {
    return <Loading type="pulse" text="Generating comprehensive career readiness report..." />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              Executive Evaluation
            </span>
            <span className="text-xs text-[#64748B]">• Official Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Career Readiness & Competency Audit
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verified report summarizing candidate proficiency, closed skill gaps, and hireability benchmark.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Preparing PDF...' : 'Download Report'}</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-card space-y-8 print:shadow-none print:border-none">
        {/* Report Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#0F172A]">{report.candidateName}</h2>
            <p className="text-xs text-[#64748B]">
              Target Career Role: <strong className="text-[#0F172A]">{report.targetRole}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 text-xs text-[#64748B]">
            <div className="flex items-center sm:justify-end gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Audit Period: {report.generatedAt}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-[#16A34A] font-semibold">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Verified by EduPath AI Engine</span>
            </div>
          </div>
        </div>

        {/* Section 1: Career Readiness Spotlight */}
        <div className="p-6 rounded-xl bg-[#0F172A] text-white space-y-4 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#CCFBF1] uppercase tracking-wider">Overall Benchmark</span>
              <h3 className="text-3xl sm:text-4xl font-bold mt-1">{report.careerReadinessScore}% Career Readiness</h3>
              <p className="text-xs text-slate-300 mt-1">{report.readinessBenchmark}</p>
            </div>

            <div className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-center shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Hireability Status</span>
              <span className="text-sm font-bold text-[#16A34A]">Competitive (Ready for Intern/Junior)</span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F766E] rounded-full"
              style={{ width: `${report.careerReadinessScore}%` }}
            />
          </div>
        </div>

        {/* Section 2: Skills Acquired & In Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acquired Skills */}
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <h4 className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              Verified Acquired Competencies ({report.skillsAcquired.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.skillsAcquired.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D97706]" />
              Competencies Currently In Training ({report.skillsInProgress.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.skillsInProgress.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Remaining Gaps */}
        <div className="p-5 rounded-xl bg-[#FEE2E2]/40 border border-[#FECACA] space-y-3">
          <h4 className="text-xs font-bold text-[#DC2626] uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#DC2626]" />
            Remaining High-Impact Skill Gaps ({report.remainingGaps.length})
          </h4>
          <ul className="space-y-1.5">
            {report.remainingGaps.map((gap, i) => (
              <li key={i} className="text-xs text-[#DC2626] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Achievements Badges */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0F766E]" />
            Milestones & Achievements Unlocked
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {report.achievements.map((ach, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{ach.title}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">{ach.description}</p>
                <span className="text-[10px] text-[#94A3B8] block pt-1">{ach.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Recommended Next Steps */}
        <div className="p-6 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] space-y-3">
          <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0F766E]" />
            AI Recommended Next Action Plan
          </h4>

          <div className="space-y-2">
            {report.recommendedNextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#0F172A] font-medium">
                <span className="w-5 h-5 rounded-md bg-[#0F766E] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
