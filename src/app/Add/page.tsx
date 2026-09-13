"use client";

import React, { useState, useEffect } from "react";
import { 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  XCircle, 
  Tag, 
  Upload, 
  Phone, 
  Mail, 
  User, 
  Sparkles,
  Send,
  RotateCcw
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: "general" | "technical" | "support" | "feedback";
  priority: "low" | "medium" | "high";
  attachments: File[];
  tags: string[];
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const AddTopicPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: "general",
    priority: "medium",
    attachments: [],
    tags: []
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem("formDraft");
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Error reading draft:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formDraft", JSON.stringify(formData));
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors = {
      name: formData.name.trim().length < 3 ? "Name must be at least 3 characters" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "Please enter a valid email address" : "",
      phone: formData.phone && !/^[+0-9\s\-()]{7,20}$/.test(formData.phone) ? "Please enter a valid phone number (7-20 digits)" : "",
      message: formData.message.trim().length < 10 ? "Message must be at least 10 characters long" : ""
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: e.target.value }));
  };

  const handleTagAdd = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    const cleanTag = tagInput.trim();
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, cleanTag] }));
      setTagInput("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    localStorage.removeItem("formDraft");
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      category: "general",
      priority: "medium",
      attachments: [],
      tags: []
    });

    setIsLoading(false);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      category: "general",
      priority: "medium",
      attachments: [],
      tags: []
    });
    setErrors({ name: "", email: "", phone: "", message: "" });
    localStorage.removeItem("formDraft");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="w-full max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-200/60 dark:border-pink-800/40">
            <Sparkles size={14} />
            <span>Community Contributions & Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Submit a <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">Question or Inquiry</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Suggest a new coding topic, ask a technical question, or send feedback to our curriculum team.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm p-6 sm:p-10 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Zohaib Ali"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                      errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +92 300 1234567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                      errors.phone ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                    errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Category & Priority Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500 transition"
                >
                  <option value="general">General Question</option>
                  <option value="technical">Course Lesson Suggestion</option>
                  <option value="feedback">Platform Feedback</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500 transition"
                >
                  <option value="low">Standard / Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Inquiry Details or Lesson Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Describe your question, topic proposal, or feedback in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-2xl border ${
                    errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition leading-relaxed`}
                />
              </div>
              {errors.message && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            {/* Tags Feature */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Keywords & Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag (e.g. Python, Loop, Angular)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleTagAdd(e); }}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500 transition"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm font-semibold transition"
                >
                  Add Tag
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium border border-pink-200/60 dark:border-pink-800/40"
                    >
                      <Tag size={12} />
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) }))}
                        className="hover:text-pink-900 dark:hover:text-white"
                      >
                        <XCircle size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Attachments Upload */}
            <div className="space-y-2">
              <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition">
                <Upload className="w-7 h-7 text-pink-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Attach Screenshots or Snippets (.png, .jpg, .pdf)
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">Click or drag & drop files</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                />
              </label>

              {formData.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs"
                    >
                      <span className="truncate max-w-[160px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XCircle size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-sm shadow-md shadow-pink-700/20 hover:shadow-pink-700/40 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-semibold transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={15} />
                <span>Reset</span>
              </button>
            </div>
          </form>

          {/* Success Toast */}
          {isSubmitted && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-emerald-900 dark:text-emerald-200 text-sm animate-fade-in">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span>Thank you! Your topic inquiry has been successfully submitted.</span>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-emerald-700 dark:text-emerald-400 hover:opacity-75"
              >
                <XCircle size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTopicPage;
