"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Loader2, Eye, EyeOff, Check, Sparkles, ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  Num: string;
  password: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  Num?: string;
  password?: string;
  terms?: string;
}

const Connect: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    Num: "",
    password: "",
    terms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as { name: string; email: string };
        // Only restore non-sensitive fields (never password)
        setFormData(prev => ({ ...prev, name: parsedData.name || "", email: parsedData.email || "" }));
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.Num && !formData.Num.match(/^[+0-9\s\-()]{7,20}$/)) {
      newErrors.Num = "Please enter a valid phone number (7-20 digits)";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms of service";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Only persist non-sensitive data - never store passwords in localStorage
      localStorage.setItem("userData", JSON.stringify({ name: formData.name, email: formData.email }));
      setIsSubmitted(true);
      setFormData({ name: "", email: "", Num: "", password: "", terms: false });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200/80 dark:border-gray-800 p-6 sm:p-10 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-200/60 dark:border-pink-800/40">
              <Sparkles size={14} />
              <span>Student Community Access</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Connect With <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">CodeWithZohaib</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Join thousands of developers mastering programming languages with our academy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Zohaib Ali"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                    errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                    errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="tel"
                  name="Num"
                  placeholder="+92 300 1234567"
                  value={formData.Num}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                    errors.Num ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition`}
                />
              </div>
              {errors.Num && (
                <p className="text-xs text-red-500 mt-1">{errors.Num}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-xl border ${
                    errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 transition"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  I agree to the <span className="text-pink-600 dark:text-pink-400 font-semibold underline">Terms of Service</span> and <span className="text-pink-600 dark:text-pink-400 font-semibold underline">Privacy Policy</span>.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-sm shadow-md shadow-pink-700/25 hover:shadow-pink-700/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Join Academy Now</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-emerald-900 dark:text-emerald-200 text-sm font-medium"
            >
              <Check size={18} className="text-emerald-600 flex-shrink-0" />
              <span>Welcome aboard! You are now connected to CodeWithZohaib Academy.</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Connect;
