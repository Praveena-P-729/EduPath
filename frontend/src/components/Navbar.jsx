import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Bell,
  Search,
  User,
  LogOut,
  Menu,
  X,
  Compass,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo & Mobile menu toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center text-white font-black text-sm shadow-sm">
                E
              </div>
              <span className="text-lg font-bold text-[#0F172A] tracking-tight">
                EduPath <span className="text-[#0F766E] font-semibold text-xs uppercase px-1.5 py-0.5 rounded bg-[#F0FDFA] border border-[#CCFBF1] ml-1">AI</span>
              </span>
            </Link>
          </div>

          {/* Center search (when logged in) */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search skills, learning modules, practice..."
                  className="w-full pl-10 pr-4 py-1.5 text-xs sm:text-sm bg-[#F8FAFC] hover:bg-slate-100 focus:bg-white border border-[#CBD5E1] focus:border-[#0F766E] rounded-lg outline-none transition-colors text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>
            </div>
          )}

          {/* Right section: Streak, Notifications, User Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isAuthenticated ? (
              <>
                {/* Streak Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{currentUser?.streak || 6} Day Streak</span>
                </div>

                {/* Notification Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0F766E] rounded-full ring-2 ring-white"></span>
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-dropdown border border-[#E2E8F0] p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                        <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">Updates & Insights</span>
                        <span className="text-[11px] text-[#0F766E] font-medium hover:underline cursor-pointer">Mark all read</span>
                      </div>
                      <div className="py-2 space-y-2">
                        <div className="p-2.5 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-[#0F172A]">Milestone Reached</p>
                            <p className="text-[11px] text-[#64748B] mt-0.5">You achieved 80% proficiency in React & Modern Hooks.</p>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-start gap-2.5">
                          <Compass className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-[#0F172A]">Adaptive Recommendation</p>
                            <p className="text-[11px] text-[#64748B] mt-0.5">Strengthen REST API design patterns in this week's plan.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Avatar & Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] transition-colors focus:outline-none"
                  >
                    <div className="hidden sm:block text-right">
                      <p className="text-xs font-semibold text-[#0F172A] leading-tight">{currentUser?.fullName || 'Praveena'}</p>
                      <p className="text-[10px] text-[#64748B] leading-tight">{currentUser?.targetRole || 'Full-Stack Dev'}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {currentUser?.fullName ? currentUser.fullName.charAt(0) : 'P'}
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-dropdown border border-[#E2E8F0] py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3.5 py-2 border-b border-[#E2E8F0]">
                        <p className="text-xs font-semibold text-[#0F172A]">{currentUser?.fullName || 'Praveena'}</p>
                        <p className="text-[11px] text-[#64748B] truncate">{currentUser?.email || 'praveena@example.com'}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-[#0F172A] hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-[#64748B]" /> Profile Settings
                        </Link>
                        <Link
                          to="/reports"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-[#0F172A] hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#64748B]" /> Career Readiness Audit
                        </Link>
                      </div>
                      <div className="border-t border-[#E2E8F0] pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-medium text-[#0F172A] hover:text-[#0F766E] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg shadow-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

