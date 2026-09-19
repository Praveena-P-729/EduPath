import React from 'react';
import { ExternalLink, BookOpen, Video, Terminal, Star, Clock } from 'lucide-react';

export const ResourceCard = ({
  title,
  type = 'Course',
  duration,
  skill,
  level = 'Intermediate',
  url = '#',
  rating = 4.8
}) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'video':
      case 'video tutorial':
        return <Video className="w-3.5 h-3.5 text-[#0F766E]" />;
      case 'interactive lab':
        return <Terminal className="w-3.5 h-3.5 text-[#16A34A]" />;
      case 'course':
      default:
        return <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
            {getIcon()}
            {type}
          </span>
          {rating && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D97706]">
              <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        <h4 className="text-sm font-semibold text-[#0F172A] line-clamp-2 mb-2">
          {title}
        </h4>
      </div>

      <div className="pt-3 border-t border-[#F1F5F9] mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#94A3B8]" />
            {duration}
          </span>
          <span>•</span>
          <span className="font-medium text-[#0F172A]">{level}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          <span>Explore</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;

