import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileCheck,
  Award,
  Layers,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import skillService from '../services/skillService';
import Loading from '../components/Loading';

export const ResumeUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setError('');
    const validExtensions = ['pdf', 'docx'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      setError('Please upload a valid PDF or DOCX resume document.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setSelectedFile(file);
    setAnalysisResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    setError('');

    try {
      await new Promise((res) => setTimeout(res, 1200));
      const result = await skillService.analyzeResume(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">AI Resume Parser & Skill Extractor</h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Upload your CV to automatically benchmark your experience against target roles.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-card">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-[#0F766E] bg-[#F0FDFA]'
              : 'border-[#CBD5E1] hover:border-[#0F766E] bg-[#F8FAFC]'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] mx-auto flex items-center justify-center text-[#0F766E] mb-3 shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#0F172A]">
            Click to upload or drag and drop your resume
          </h3>
          <p className="text-xs text-[#64748B] mt-1">
            Supports PDF and DOCX files up to 5MB
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-[#FEE2E2] border border-[#FECACA] text-xs text-[#DC2626] rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Selected File Card */}
        {selectedFile && (
          <div className="mt-5 p-4 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-white text-[#0F766E] border border-[#CCFBF1] shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">{selectedFile.name}</p>
                <p className="text-[11px] text-[#64748B]">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setAnalysisResult(null);
                }}
                className="p-1.5 rounded-md text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>{analyzing ? 'Analyzing with AI...' : 'Analyze Resume'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Loading State */}
      {analyzing && (
        <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-card">
          <Loading type="pulse" text="Extracting entities, projects, and skills from resume..." />
        </div>
      )}

      {/* Structured Analysis Results */}
      {analysisResult && !analyzing && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                  Parsing Completed
                </span>
                <span className="text-xs text-[#64748B]">• Match Score: {analysisResult.matchScore}%</span>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mt-1">
                Candidate Profile: {analysisResult.candidateName}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/skills')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>View Skill Gap Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education & Experience */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-[#0F766E]" />
                  Education
                </h4>
                <p className="text-xs text-[#64748B] font-medium">{analysisResult.education}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-[#0F766E]" />
                  Experience
                </h4>
                <p className="text-xs text-[#64748B] font-medium">{analysisResult.experience}</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#0F766E]" />
                Verified Certifications
              </h4>
              <ul className="space-y-2">
                {analysisResult.certifications?.map((c, i) => (
                  <li key={i} className="text-xs text-[#64748B] font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detected Skills */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#0F766E]" />
              Detected Technical Skills ({analysisResult.detectedSkills?.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysisResult.detectedSkills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Highlighted Projects */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#0F766E]" />
              Extracted Portfolio Projects
            </h4>
            <div className="space-y-2">
              {analysisResult.projects?.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] font-medium">
                  {proj}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
