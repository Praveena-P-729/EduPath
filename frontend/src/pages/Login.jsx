import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Zap,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  UserPlus,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('praveena@example.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Praveena');
  const [targetRole, setTargetRole] = useState('Full-Stack Developer');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Google OAuth Multi-Account State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customEmailMode, setCustomEmailMode] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authenticatingAccount, setAuthenticatingAccount] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [googleError, setGoogleError] = useState('');

  const GOOGLE_ACCOUNTS = [
    {
      name: 'Praveena',
      email: 'praveena.dev@gmail.com',
      avatarColor: 'bg-[#0F766E]',
      initial: 'P',
      badge: 'Default Profile'
    },
    {
      name: 'Praveena P',
      email: 'praveenap729@gmail.com',
      avatarColor: 'bg-[#4285F4]',
      initial: 'P',
      badge: 'Personal Google'
    },
    {
      name: 'Demo Learner',
      email: 'learner.edupath@gmail.com',
      avatarColor: 'bg-[#8B5CF6]',
      initial: 'L',
      badge: 'Student Account'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegister) {
        await register({ email, fullName, targetRole });
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('praveena@example.com', 'demo123');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectGoogleAccount = async (account) => {
    setGoogleError('');
    setAuthenticatingAccount(account);
    setGoogleLoading(true);
    setAuthSuccess(false);

    try {
      // Step 1: Simulate Google token verification
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Step 2: Authenticate session via backend API
      await googleLogin(account.email, account.name);
      setAuthSuccess(true);

      // Step 3: Brief success state for user feedback, then navigate
      await new Promise(resolve => setTimeout(resolve, 600));
      setShowGoogleModal(false);
      navigate('/dashboard');
    } catch (err) {
      setGoogleError(err.message || 'Google authentication failed. Please try again.');
      setAuthenticatingAccount(null);
      setAuthSuccess(false);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleCustomGoogleSubmit = async (e) => {
    e.preventDefault();
    setGoogleError('');

    const trimmedEmail = googleEmail.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setGoogleError('Please enter a valid Google Mail ID (e.g. user@gmail.com)');
      return;
    }

    const name = googleName.trim() || trimmedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const customAccount = {
      name,
      email: trimmedEmail,
      avatarColor: 'bg-[#0F766E]',
      initial: name.charAt(0).toUpperCase(),
      badge: 'Custom Google Account'
    };

    await handleSelectGoogleAccount(customAccount);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#E2E8F0] shadow-card p-6 sm:p-8">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#0F172A]">EduPath</span>
              <span className="text-xs font-semibold text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-1.5 py-0.5 rounded">AI</span>
            </div>
          </Link>
          <h2 className="text-xl font-bold text-[#0F172A]">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            {isRegister
              ? 'Start your personalized AI-guided learning journey'
              : 'Enter your credentials to access your dashboard'}
          </p>
        </div>

        {/* Demo Fast-Login Pill */}
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          className="w-full mb-5 p-2.5 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#CCFBF1]/40 transition-colors"
        >
          <Zap className="w-4 h-4 text-[#0F766E]" />
          <span>Quick Demo Login (Praveena)</span>
        </button>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-xs text-[#DC2626]">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Praveena"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Target Career Role</label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Full-Stack Developer, Data Scientist"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="praveena@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#0F172A]">Password</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to demo inbox!')}
                  className="text-xs font-medium text-[#0F766E] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>
          </div>

          {!isRegister && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#0F766E] focus:ring-[#0F766E] border-[#CBD5E1]"
              />
              <label htmlFor="remember" className="ml-2 text-xs font-medium text-[#64748B]">
                Remember me for 30 days
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]" />
          </div>
          <div className="relative flex justify-center text-xs text-[#94A3B8]">
            <span className="bg-white px-2">or continue with</span>
          </div>
        </div>

        {/* Google Continue Button */}
        <button
          type="button"
          onClick={() => {
            setGoogleEmail('');
            setGoogleName('');
            setGoogleError('');
            setCustomEmailMode(false);
            setAuthenticatingAccount(null);
            setAuthSuccess(false);
            setShowGoogleModal(true);
          }}
          className="w-full py-2.5 px-4 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle Login / Register */}
        <div className="mt-5 text-center text-xs text-[#64748B]">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-semibold text-[#0F766E] hover:underline"
              >
                Create one now
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Google Authentication Dialog Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                if (!googleLoading) setShowGoogleModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] shadow-xs mx-auto flex items-center justify-center mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                {customEmailMode ? 'Sign in with another Google Account' : 'Choose a Google Account'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                to continue to <strong className="text-[#0F766E]">EduPath AI</strong>
              </p>
            </div>

            {googleError && (
              <div className="mb-4 p-3 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-xs text-[#DC2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{googleError}</span>
              </div>
            )}

            {/* View 1: Active Authenticating & Verification Card */}
            {authenticatingAccount ? (
              <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-4">
                <div className={`w-14 h-14 rounded-full ${authenticatingAccount.avatarColor} text-white text-xl font-bold mx-auto flex items-center justify-center shadow-md`}>
                  {authenticatingAccount.initial}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{authenticatingAccount.name}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{authenticatingAccount.email}</p>
                </div>

                {authSuccess ? (
                  <div className="p-3 bg-[#DCFCE7] border border-[#BBF7D0] rounded-lg text-xs font-semibold text-[#16A34A] flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span>Account Verified • Opening Dashboard...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2.5 text-xs text-[#0F766E] font-medium py-1">
                    <div className="w-4 h-4 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying credentials with Google...</span>
                  </div>
                )}
              </div>
            ) : customEmailMode ? (
              /* View 2: Custom Google Email Input Form */
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Google Mail Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Full Name <span className="text-[#64748B] font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="e.g. Praveena"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={googleLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {googleLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomEmailMode(false)}
                    className="w-full py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] flex items-center justify-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to account list</span>
                  </button>
                </div>
              </form>
            ) : (
              /* View 3: Realistic Google Account Chooser List */
              <div className="space-y-2">
                <div className="divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] overflow-hidden">
                  {GOOGLE_ACCOUNTS.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectGoogleAccount(acc)}
                      className="w-full p-3.5 text-left bg-white hover:bg-[#F8FAFC] transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${acc.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                          {acc.initial}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0F172A] group-hover:text-[#4285F4] transition-colors">
                            {acc.name}
                          </p>
                          <p className="text-[11px] text-[#64748B]">{acc.email}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        {acc.badge}
                      </span>
                    </button>
                  ))}

                  {/* Use another account option */}
                  <button
                    type="button"
                    onClick={() => {
                      setCustomEmailMode(true);
                      setGoogleEmail('');
                      setGoogleName('');
                    }}
                    className="w-full p-3.5 text-left bg-white hover:bg-[#F8FAFC] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#64748B] flex items-center justify-center shrink-0">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#4285F4]">
                        Use another account
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <p className="text-[10px] text-[#94A3B8] text-center pt-3 leading-tight">
                  To continue, Google will share your name, email address, and profile picture with EduPath AI.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
