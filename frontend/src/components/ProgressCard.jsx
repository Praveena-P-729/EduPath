import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const ProgressCard = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = 'teal',
  progress
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'emerald':
      case 'green':
        return {
          iconBg: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
          accent: 'text-[#16A34A]',
          bar: 'bg-[#16A34A]'
        };
      case 'amber':
      case 'warning':
        return {
          iconBg: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
          accent: 'text-[#D97706]',
          bar: 'bg-[#D97706]'
        };
      case 'blue':
      case 'info':
        return {
          iconBg: 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]',
          accent: 'text-[#2563EB]',
          bar: 'bg-[#2563EB]'
        };
      case 'teal':
      default:
        return {
          iconBg: 'bg-[#F0FDFA] text-[#0F766E] border-[#CCFBF1]',
          accent: 'text-[#0F766E]',
          bar: 'bg-[#0F766E]'
        };
    }
  };

  const c = getColorClasses();

  return (
    <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-card">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">{title}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">{value}</h3>
            {change && (
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                  isPositive ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                }`}
              >
                {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {change}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2 rounded-lg border ${c.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-[#64748B]">{subtitle}</p>}

      {typeof progress === 'number' && (
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] font-semibold text-[#64748B]">
            <span>Target Progress</span>
            <span className="text-[#0F172A]">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${c.bar}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;

