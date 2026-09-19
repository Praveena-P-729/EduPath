import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import progressService from '../services/progressService';

export const Chat = () => {
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${currentUser?.fullName || 'Praveena'}! I'm your EduPath AI Mentor. I have full context on your target role (${currentUser?.targetRole || 'Full-Stack Developer'}), verified skills, and identified skill gaps. How can I help guide your learning today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'What should I learn next?',
    'Explain my skill gaps.',
    'Create a study plan.',
    'Give me a project idea.',
    'How can I improve my React skills?',
    'Prepare me for an interview.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const result = await progressService.sendChatMessage(query);
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.reply,
        timestamp: result.timestamp || 'Just now'
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I'm currently recalibrating your career roadmap. Let's focus on closing your Docker and PostgreSQL skill gaps this week!",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl border border-[#E2E8F0] shadow-card overflow-hidden font-sans">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#0F172A]">EduPath AI Mentor</h2>
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            </div>
            <p className="text-[11px] text-[#64748B]">
              Context: <span className="font-semibold text-[#0F766E]">{currentUser?.targetRole || 'Full-Stack Developer'}</span> • 72% Readiness
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'msg-init',
                sender: 'ai',
                text: "Chat cleared. What else would you like to explore regarding your career path?",
                timestamp: 'Just now'
              }
            ])
          }
          className="p-2 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-4 rounded-xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isAI
                    ? 'bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F172A] rounded-tl-xs'
                    : 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] rounded-tr-xs'
                }`}
              >
                <div className="whitespace-pre-line font-normal">
                  {msg.text}
                </div>
                <span
                  className={`text-[10px] block mt-2 text-right ${
                    isAI ? 'text-[#0F766E]' : 'text-[#64748B]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                  {currentUser?.fullName ? currentUser.fullName.charAt(0) : 'P'}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center text-xs shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-xl rounded-tl-xs flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-[#0F766E] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-[#0F766E] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Shelf */}
      <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-[#D97706]" /> Prompts:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 bg-white hover:bg-[#F0FDFA] text-[#0F172A] hover:text-[#0F766E] text-xs font-medium rounded-lg border border-[#E2E8F0] hover:border-[#CCFBF1] shrink-0 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 border-t border-[#E2E8F0] bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask your AI mentor anything (e.g. 'What should I learn next?')..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className={`p-2 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors ${
              inputPrompt.trim() && !isTyping
                ? 'bg-[#0F766E] hover:bg-[#115E59] text-white shadow-xs'
                : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed border border-[#E2E8F0]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
