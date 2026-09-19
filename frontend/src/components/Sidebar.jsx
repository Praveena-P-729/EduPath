import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Target,
  GitFork,
  CalendarCheck,
  Code2,
  TrendingUp,
  Award,
  Bot,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Resume Upload', path: '/resume', icon: FileText },
    { label: 'Skill Analysis', path: '/skills', icon: Target },
    { label: 'Learning Path', path: '/learning-path', icon: GitFork },
    { label: 'Weekly Plan', path: '/weekly-plan', icon: CalendarCheck },
    { label: 'Practice Hub', path: '/practice', icon: Code2 },
    { label: 'Progress & Analytics', path: '/progress', icon: TrendingUp },
    { label: 'Career Reports', path: '/reports', icon: Award },
    { label: 'AI Mentor', path: '/chat', icon: Bot, highlight: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1 custom-scrollbar">
          {/* Section title */}
          <div className="px-3 pb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </span>
          </div>

          {/* Navigation Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#134E4A] text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#CCFBF1]'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.highlight && !isActive && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-teal-900/80 text-teal-200 border border-teal-700/50">
                        AI
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-teal-200 opacity-80" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Info & Actions */}
        <div className="p-3 border-t border-slate-800 bg-[#0A101D] space-y-2">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-xs font-semibold text-white">AI Career Agent</span>
              </div>
              <span className="text-[10px] text-teal-300 font-medium">Active</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              Target: <span className="text-slate-200 font-medium">{currentUser?.targetRole || 'Full-Stack Dev'}</span>
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 px-1">
            <NavLink
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

