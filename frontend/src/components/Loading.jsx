import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({
  type = 'spinner',
  text = 'Optimizing your personalized learning path...',
  count = 3
}) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-3 w-full animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-5 bg-slate-200 rounded-full w-16"></div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] text-center space-y-3">
      <Loader2 className="w-7 h-7 text-[#0F766E] animate-spin" />
      <p className="text-xs sm:text-sm font-medium text-[#64748B]">{text}</p>
    </div>
  );
};

export default Loading;

