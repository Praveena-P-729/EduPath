import React from 'react';
import { CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';

export const SkillCard = ({
  name,
  category,
  level = 'Developing',
  score = 60,
  onAction,
  actionLabel = 'Practice'
}) => {
  const getBadgeStyle = () => {
    switch (level.toLowerCase()) {
      case 'strong':
        return {
          badge: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
          bar: 'bg-[#16A34A]',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />,
          label: 'Strong'
        };
      case 'developing':
        return {
          badge: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
          bar: 'bg-[#D97706]',
          icon: <Clock className="w-3.5 h-3.5 text-[#D97706]" />,
          label: 'Developing'
        };
      case 'missing':
      default:
        return {
          badge: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]',
          bar: 'bg-[#DC2626]',
          icon: <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />,
          label: 'Needs Attention'
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors shadow-card">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div>
          <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
            {category || 'Skill'}
          </span>
          <h4 className="text-sm font-semibold text-[#0F172A]">{name}</h4>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${style.badge}`}>
          {style.icon}
          <span>{style.label}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-[11px] font-medium text-[#64748B]">
          <span>Proficiency</span>
          <span className="font-semibold text-[#0F172A]">{score}%</span>
        </div>
        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {onAction && (
        <button
          type="button"
          onClick={() => onAction(name)}
          className="w-full flex items-center justify-center gap-1 py-1.5 px-3 bg-white hover:bg-[#F0FDFA] text-[#0F766E] rounded-lg text-xs font-semibold border border-[#CBD5E1] hover:border-[#0F766E] transition-colors"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SkillCard;

