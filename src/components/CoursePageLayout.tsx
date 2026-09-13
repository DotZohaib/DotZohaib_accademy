"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { 
  Search, 
  BookOpen, 
  Code, 
  Check, 
  Copy, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Layers,
  Terminal,
  AlertTriangle,
  CheckSquare,
  MessageCircle,
  FastForward,
  Bookmark,
  Share2,
  ChevronRight
} from "lucide-react";
import { array as database } from "@/components/Database";
import { CourseTopic } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface CoursePageLayoutProps {
  courseId: string;
  courseTitle: string;
  badgeText?: string;
  initialQuestionId?: number;
}

export default function CoursePageLayout({
  courseId,
  courseTitle,
  badgeText = "Comprehensive Course",
  initialQuestionId
}: CoursePageLayoutProps) {
  // Load topics for this course from central database
  const courseTopics: CourseTopic[] = useMemo(() => {
    return database.filter(
      (q) => (q.courseId || "").toLowerCase() === courseId.toLowerCase()
    );
  }, [courseId]);

  // Selected question ID state (defaults to initialQuestionId or first question)
  const [selectedId, setSelectedId] = useState<number>(() => {
    if (initialQuestionId && courseTopics.some(q => q.id === initialQuestionId)) {
      return initialQuestionId;
    }
    return courseTopics.length > 0 ? courseTopics[0].id : 1;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync selectedId if initialQuestionId changes
  useEffect(() => {
    if (initialQuestionId && courseTopics.some(q => q.id === initialQuestionId)) {
      setSelectedId(initialQuestionId);
    }
  }, [initialQuestionId, courseTopics]);

  // If selectedId is not in courseTopics (or list changes), default to first
  useEffect(() => {
    if (courseTopics.length > 0 && !courseTopics.some(q => q.id === selectedId)) {
      setSelectedId(courseTopics[0].id);
    }
  }, [courseTopics, selectedId]);

  // Filter topics for the sidebar list
  const filteredTopics = useMemo(() => {
    if (!searchTerm.trim()) return courseTopics;
    const term = searchTerm.toLowerCase();
    return courseTopics.filter((item) => {
      const title = (item.title || item.Title || "").toLowerCase();
      const num = String(item.questionNumber || "");
      return title.includes(term) || num.includes(term);
    });
  }, [courseTopics, searchTerm]);

  // Currently selected active topic object
  const activeTopic = useMemo(() => {
    return courseTopics.find((q) => q.id === selectedId) || courseTopics[0];
  }, [courseTopics, selectedId]);

  // Index of active topic for Prev/Next navigation
  const currentIndex = useMemo(() => {
    return courseTopics.findIndex((q) => q.id === selectedId);
  }, [courseTopics, selectedId]);

  const prevTopic = currentIndex > 0 ? courseTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < courseTopics.length - 1 ? courseTopics[currentIndex + 1] : null;

  // Highlight code on active topic change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        Prism.highlightAll();
      } catch (err) {
        console.warn("Prism highlight warning:", err);
      }
    }
    // Smoothly scroll content to top on question change
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTopic]);

  const handleSelectQuestion = (id: number) => {
    setSelectedId(id);
    setIsMobileSidebarOpen(false);
  };

  const handleCopyCode = async () => {
    if (!activeTopic?.code) return;
    try {
      await navigator.clipboard.writeText(activeTopic.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${courseTitle}: ${activeTopic?.title || activeTopic?.Title}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lesson link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      
      {/* Top GitHub/Docs Course Subheader Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-800 sticky top-16 z-30 px-4 sm:px-6 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-bold border border-pink-200/60 dark:border-pink-800/40"
            >
              <Menu size={16} />
              <span>Topics ({currentIndex + 1}/{courseTopics.length})</span>
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">{courseTitle}</span>
              <span>/</span>
              <span className="text-pink-700 dark:text-pink-400 font-semibold">
                Lesson #{activeTopic?.questionNumber || (currentIndex + 1)}
              </span>
            </div>
          </div>

          {/* Quick Progress & Prev/Next Toolbar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
              Topic {currentIndex + 1} of {courseTopics.length}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => prevTopic && handleSelectQuestion(prevTopic.id)}
                disabled={!prevTopic}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                title="Previous Topic"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => nextTopic && handleSelectQuestion(nextTopic.id)}
                disabled={!nextTopic}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                title="Next Topic"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Left Sidebar + Right Content */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex relative">
        
        {/* ========================================================================= */}
        {/* DESKTOP LEFT SIDEBAR (GitHub / Documentation Layout)                     */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 flex-shrink-0 border-r border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-[6.75rem] h-[calc(100vh-6.75rem)]">
          
          {/* Sidebar Header & Search Box */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Course Syllabus
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                {courseTopics.length} Topics
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-pink-500 transition"
              />
              <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Scrollable Questions List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
            {filteredTopics.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                No topics match &quot;{searchTerm}&quot;
              </div>
            ) : (
              filteredTopics.map((item) => {
                const isSelected = item.id === selectedId;
                const cleanTitle = item.title || item.Title || `Topic ${item.questionNumber}`;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectQuestion(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 group relative ${
                      isSelected
                        ? "bg-pink-50/90 dark:bg-pink-950/40 text-pink-800 dark:text-pink-200 font-bold border-l-4 border-pink-600 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 font-medium"
                    }`}
                  >
                    <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-pink-600 text-white font-bold"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:text-gray-700"
                    }`}>
                      {String(item.questionNumber || item.id).padStart(2, "0")}
                    </span>

                    <span className="text-xs sm:text-sm line-clamp-2 leading-snug flex-1">
                      {cleanTitle}
                    </span>

                    {isSelected && (
                      <ChevronRight size={14} className="text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MOBILE SLIDE-OVER DRAWER FOR TOPICS LIST                                 */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl flex flex-col"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{courseTitle} Syllabus</h3>
                    <p className="text-xs text-gray-500">{courseTopics.length} Total Topics</p>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search topics..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl"
                    />
                    <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {filteredTopics.map((item) => {
                    const isSelected = item.id === selectedId;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectQuestion(item.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold border-l-4 border-pink-600"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="text-[11px] font-mono text-gray-400 w-6">
                          #{item.questionNumber}
                        </span>
                        <span className="text-xs line-clamp-1">{item.title || item.Title}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* RIGHT CONTENT AREA: Selected Question's Full 10-Point Educational Guide   */}
        {/* ========================================================================= */}
        <main 
          ref={contentRef}
          className="flex-1 p-4 sm:p-6 lg:p-10 max-w-4xl w-full mx-auto space-y-8 min-w-0"
        >
          {activeTopic ? (
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Question Header Card */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-200/60 dark:border-pink-800/40">
                    Question #{activeTopic.questionNumber}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-xl border transition ${
                        isBookmarked
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600"
                          : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      title={isBookmarked ? "Bookmarked" : "Bookmark Lesson"}
                    >
                      <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      title="Share Lesson"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Question Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {activeTopic.title || activeTopic.Title}
                </h1>
              </div>

              {/* 1. Short Answer (English) */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-wide uppercase">
                  <BookOpen size={18} />
                  <span>1. Short Answer (English)</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed bg-indigo-50/50 dark:bg-indigo-950/30 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 font-medium">
                  {activeTopic.shortAnswer || activeTopic.answer}
                </p>
              </div>

              {/* 2. Easy Explanation in English */}
              {activeTopic.easyExplanation && (
                <div className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide uppercase">
                    <Sparkles size={18} />
                    <span>2. Easy Explanation</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {activeTopic.easyExplanation}
                  </p>
                </div>
              )}

              {/* 3. Roman Urdu Example / Explanation */}
              {(activeTopic.romanUrduExample || activeTopic.romanUrduExplanation) && (
                <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/60 dark:from-emerald-950/40 dark:to-teal-950/20 p-6 sm:p-7 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/40 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm tracking-wide uppercase mb-2">
                    <MessageCircle size={18} />
                    <span>3. Roman Urdu Explanation</span>
                  </div>
                  <p className="text-emerald-950 dark:text-emerald-200 text-base sm:text-lg italic font-medium leading-relaxed">
                    &ldquo;{activeTopic.romanUrduExample || activeTopic.romanUrduExplanation}&rdquo;
                  </p>
                </div>
              )}

              {/* 4. Simple but Best Code Example */}
              {activeTopic.code && (
                <div className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold text-sm tracking-wide uppercase">
                      <Code size={18} />
                      <span>4. Code Example</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase">
                      {activeTopic.codeLanguage || courseId}
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg transition"
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} className="text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="!m-0 !bg-gray-950 !p-5 overflow-x-auto text-sm sm:text-base leading-relaxed">
                      <code className={`language-${activeTopic.codeLanguage || 'javascript'}`}>
                        {activeTopic.code}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* 5. Code Explanation */}
              {activeTopic.codeExplanation && Array.isArray(activeTopic.codeExplanation) && activeTopic.codeExplanation.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold text-sm tracking-wide uppercase">
                    <Terminal size={18} />
                    <span>5. Code Explanation (Step-by-Step)</span>
                  </div>
                  <ul className="space-y-2.5 pt-1">
                    {activeTopic.codeExplanation.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. Expected Output */}
              {activeTopic.output && (
                <div className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold text-sm tracking-wide uppercase">
                    <FastForward size={18} className="text-emerald-500" />
                    <span>6. Output</span>
                  </div>
                  <div className="bg-black text-green-400 font-mono p-4 rounded-2xl border border-gray-800 text-sm overflow-x-auto shadow-inner">
                    <pre className="whitespace-pre-wrap">{activeTopic.output}</pre>
                  </div>
                </div>
              )}

              {/* 7. Behind-the-Scenes Working */}
              {activeTopic.behindTheScenes && (
                <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/20 p-6 sm:p-7 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/40 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-sm tracking-wide uppercase">
                    <Layers size={18} />
                    <span>7. Behind-the-Scenes Working</span>
                  </div>
                  <p className="text-indigo-950 dark:text-indigo-200 text-base leading-relaxed whitespace-pre-line font-medium">
                    {activeTopic.behindTheScenes}
                  </p>
                </div>
              )}

              {/* 8. Common Mistakes to Avoid */}
              {activeTopic.commonMistakes && Array.isArray(activeTopic.commonMistakes) && activeTopic.commonMistakes.length > 0 && (
                <div className="bg-red-50/70 dark:bg-red-950/30 p-6 sm:p-7 rounded-3xl border border-red-200/80 dark:border-red-900/40 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-sm tracking-wide uppercase">
                    <AlertTriangle size={18} />
                    <span>8. Common Mistakes</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {activeTopic.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-red-900 dark:text-red-200 font-medium leading-relaxed">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 9. Practice Question / Task */}
              {activeTopic.practiceQuestion && (
                <div className="bg-blue-50/80 dark:bg-blue-950/30 p-6 sm:p-7 rounded-3xl border border-blue-200/80 dark:border-blue-900/40 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm tracking-wide uppercase">
                    <CheckSquare size={18} />
                    <span>9. Practice Task</span>
                  </div>
                  <p className="text-blue-950 dark:text-blue-200 text-base font-semibold leading-relaxed">
                    {activeTopic.practiceQuestion}
                  </p>
                </div>
              )}

              {/* Next / Previous Question Navigation Footer */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                {prevTopic ? (
                  <button
                    onClick={() => handleSelectQuestion(prevTopic.id)}
                    className="w-full sm:flex-1 sm:max-w-xs min-w-0 flex items-center gap-3 p-3.5 sm:p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/80 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm text-left transition group"
                  >
                    <ArrowLeft size={18} className="text-pink-600 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                    <div className="overflow-hidden min-w-0">
                      <div className="text-[11px] text-gray-400 font-bold uppercase">Previous</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                        {prevTopic.title || prevTopic.Title}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block sm:flex-1" />
                )}

                {nextTopic && (
                  <button
                    onClick={() => handleSelectQuestion(nextTopic.id)}
                    className="w-full sm:flex-1 sm:max-w-xs min-w-0 flex items-center justify-between sm:justify-end gap-3 p-3.5 sm:p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/80 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm text-left sm:text-right transition group"
                  >
                    <div className="overflow-hidden min-w-0">
                      <div className="text-[11px] text-pink-600 font-bold uppercase">Next Lesson</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                        {nextTopic.title || nextTopic.Title}
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-pink-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold">No questions found in this course track.</h3>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
