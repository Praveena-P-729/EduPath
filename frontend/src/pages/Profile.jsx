import React, { useState, useEffect } from 'react';
import {
  User,
  Target,
  Plus,
  X,
  Check,
  Sparkles,
  Save,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import profileService from '../services/profileService';

export const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    degree: '',
    experience: '',
    currentRole: '',
    targetRole: '',
    careerGoal: '',
    weeklyHours: 15,
    skills: []
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const suggestedSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'FastAPI', 'Python',
    'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'System Design', 'Tailwind CSS',
    'HTML', 'CSS', 'Java', 'SQL', 'AWS', 'PyTest'
  ];

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || 'Praveena',
        email: currentUser.email || 'praveena@example.com',
        college: currentUser.college || 'National Institute of Technology',
        degree: currentUser.degree || 'B.Tech in Computer Science',
        experience: currentUser.experience || 'Fresher / Entry-Level (0-1 yrs)',
        currentRole: currentUser.currentRole || 'Student / Aspiring Developer',
        targetRole: currentUser.targetRole || 'Full-Stack Developer',
        careerGoal: currentUser.careerGoal || 'Become a senior full-stack engineer and build scalable AI products',
        weeklyHours: currentUser.weeklyHours || 15,
        skills: currentUser.skills || ['Java', 'JavaScript', 'React', 'HTML', 'CSS', 'Git', 'FastAPI', 'SQL']
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skillToAdd) => {
    const skill = (skillToAdd || newSkillInput).trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await profileService.updateProfile(formData);
      updateUser(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {formData.fullName ? formData.fullName.charAt(0) : 'P'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">{formData.fullName}</h1>
            <p className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
              <span>Target Role:</span>
              <span className="font-semibold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded border border-[#CCFBF1]">
                {formData.targetRole}
              </span>
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-semibold rounded-lg">
            <Check className="w-4 h-4" /> Profile Updated Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal & Academic Details */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-5">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <User className="w-4 h-4 text-[#0F766E]" />
            Personal & Academic Background
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Degree & Major</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Career Targets & Hours */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-5">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <Target className="w-4 h-4 text-[#0F766E]" />
            Career Aspirations & Learning Commitment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Target Career Role</label>
              <select
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              >
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="DevOps & Cloud Specialist">DevOps & Cloud Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Current Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              >
                <option value="Fresher / Entry-Level (0-1 yrs)">Fresher / Entry-Level (0-1 yrs)</option>
                <option value="Junior Developer (1-2 yrs)">Junior Developer (1-2 yrs)</option>
                <option value="Mid-Level Engineer (2-4 yrs)">Mid-Level Engineer (2-4 yrs)</option>
                <option value="Career Transitioning">Career Transitioning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Weekly Learning Commitment ({formData.weeklyHours} hours/week)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  name="weeklyHours"
                  value={formData.weeklyHours}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
                />
                <span className="text-xs font-bold text-[#0F766E] px-2.5 py-1 bg-[#F0FDFA] rounded-lg border border-[#CCFBF1] min-w-16 text-center">
                  {formData.weeklyHours} hrs
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Career Goal Statement</label>
              <input
                type="text"
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                placeholder="e.g. Master full stack by Q4"
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Skill Manager */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0F766E]" />
              Current Skills & Proficiencies ({formData.skills.length})
            </h2>
            <span className="text-xs text-[#94A3B8]">Click a tag to remove</span>
          </div>

          {/* Active Skills Chips */}
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs font-medium group hover:bg-[#FEE2E2] hover:border-[#FECACA] hover:text-[#DC2626] transition-colors cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
                title="Click to remove"
              >
                <span>{skill}</span>
                <X className="w-3.5 h-3.5 text-[#0F766E] group-hover:text-[#DC2626]" />
              </span>
            ))}
          </div>

          {/* Add custom skill */}
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Type a new skill (e.g. TypeScript, Docker)..."
              className="flex-1 px-3 py-2 text-xs bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {/* Suggested Skills */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-[#64748B] block mb-2">Quick Add Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedSkills
                .filter((s) => !formData.skills.includes(s))
                .slice(0, 10)
                .map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleAddSkill(s)}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#F8FAFC] hover:bg-[#F0FDFA] text-[#64748B] hover:text-[#0F766E] border border-[#E2E8F0] hover:border-[#CCFBF1] transition-colors"
                  >
                    + {s}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
