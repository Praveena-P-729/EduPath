import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Award,
} from 'lucide-react';
import progressService from '../services/progressService';
import Loading from '../components/Loading';

export const Practice = () => {
  const [category, setCategory] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = ['All', 'MCQ', 'Coding', 'Debugging', 'Interview Questions'];

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const q = await progressService.getPracticeQuestions(category);
        setQuestions(q);
        setCurrentIndex(0);
        setSelectedOption(null);
        setSubmitted(false);
        setScore(0);
        setUserAnswers({});
        setQuizFinished(false);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [category]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (!submitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    setSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: selectedOption,
        isCorrect
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(userAnswers[currentIndex + 1]?.selected ?? null);
      setSubmitted(!!userAnswers[currentIndex + 1]);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setQuizFinished(false);
  };

  if (loading) {
    return <Loading type="pulse" text="Preparing tailored practice challenges..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] uppercase tracking-wider">
              Skill Calibration Hub
            </span>
            <span className="text-xs text-[#64748B]">• Interactive Assessments</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Adaptive Practice & Challenges
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Test and cement your knowledge. Your performance automatically feeds into the adaptive engine.
          </p>
        </div>

        {/* Score pill */}
        {!quizFinished && questions.length > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs font-semibold">
            <Award className="w-4 h-4 text-[#0F766E]" />
            <span>Score: {score}/{questions.length}</span>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              category === cat
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#CBD5E1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quiz Card */}
      {quizFinished ? (
        <div className="bg-white p-8 sm:p-12 rounded-xl border border-[#E2E8F0] shadow-card text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] mx-auto flex items-center justify-center shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">Assessment Completed</span>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-1">
              Your Score: {Math.round((score / questions.length) * 100)}%
            </h2>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              You correctly answered {score} out of {questions.length} questions. Your readiness score has been adjusted by +2%.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => setCategory('All')}
              className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
            >
              <span>Explore More Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : currentQ ? (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-card space-y-6">
          {/* Question Meta */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#0F766E] bg-[#F0FDFA] px-2.5 py-1 rounded border border-[#CCFBF1]">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
                Topic: {currentQ.skill}
              </span>
            </div>

            <span className="text-xs font-semibold text-[#64748B]">
              {currentQ.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;
              let optionStyle = 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#0F766E] hover:bg-[#F0FDFA]/30';

              if (submitted) {
                if (isCorrect) {
                  optionStyle = 'bg-[#DCFCE7] border-[#86EFAC] text-[#166534] font-medium';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-[#FEE2E2] border-[#FCA5A5] text-[#991B1B] font-medium';
                } else {
                  optionStyle = 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E] font-medium ring-1 ring-[#0F766E]';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer flex items-start justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {submitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {submitted && (
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
                <HelpCircle className="w-4 h-4 text-[#0F766E]" />
                <span>AI Explanation</span>
              </div>
              <p className="text-[#64748B] leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
            <span className="text-xs text-[#64748B]">
              {submitted ? 'Review explanation and proceed' : 'Select an answer to verify'}
            </span>

            <div className="flex gap-3">
              {!submitted ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedOption !== null
                      ? 'bg-[#0F766E] hover:bg-[#115E59] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Final Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E2E8F0]">
          <p className="text-xs text-[#64748B]">No practice questions found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
