"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typed from "typed.js";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { 
  Sparkles, 
  BookOpen, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Globe2, 
  Laptop, 
  GraduationCap,
  ChevronRight
} from "lucide-react";
import Boxes from '../components/Boxes';
import Chatbot from "../components/Chatbot";

export default function HomePage() {
  const handlePortfolioClick = () => {
    toast.success("Opening Founder Portfolio...");
  };

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "Full Stack Development",
        "HTML5 & Modern CSS3",
        "JavaScript (ES6+)",
        "TypeScript & Node.js",
        "React.js & Next.js",
        "Angular Framework",
        "Python & Django",
        "C & C++ Programming",
        "Java Core & OOP",
        "SQL & Database Queries",
        "MongoDB & Mongoose",
        "Tailwind CSS Architecture"
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1400,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const featuredTracks = [
    { name: "Python", href: "/Python", desc: "90 Lessons", color: "from-blue-600 to-indigo-600" },
    { name: "JavaScript", href: "/Javascript", desc: "71 Lessons", color: "from-amber-500 to-yellow-600" },
    { name: "TypeScript", href: "/Typescript", desc: "46 Lessons", color: "from-blue-500 to-cyan-600" },
    { name: "React.js", href: "/React", desc: "70 Lessons", color: "from-cyan-500 to-blue-600" },
    { name: "Angular", href: "/Angular", desc: "30 Lessons", color: "from-red-600 to-pink-600" },
    { name: "C++", href: "/Cc", desc: "60 Lessons", color: "from-indigo-600 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ToastContainer position="bottom-right" theme="colored" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-gray-200/70 dark:border-gray-800">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-pink-500/10 via-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Academy Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/60 border border-pink-200/80 dark:border-pink-800/50 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles size={15} className="text-pink-600 dark:text-pink-400" />
                <span>Premier Coding Academy & Developer Knowledge Base</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Learn To Code With <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  CodeWithZohaib
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Unlock 25+ comprehensive programming tracks with our structured 10-point educational format: clear English answers, everyday Roman Urdu insights, real code examples, step-by-step internal workings, and hands-on practice questions.
              </p>

              {/* Typed.js Tagline */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-bold">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Topic:</span>
                <span className="text-pink-700 dark:text-pink-400 font-mono" id="element"></span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/Python"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-pink-700 hover:bg-pink-800 text-white shadow-lg shadow-pink-700/25 hover:shadow-pink-700/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <BookOpen size={18} />
                  <span>Start Learning Free</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="https://zohaibalidayo.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handlePortfolioClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:border-pink-600 hover:text-pink-600 dark:hover:text-pink-400 shadow-sm hover:shadow transition-all duration-200"
                >
                  <Laptop size={18} />
                  <span>Founder Portfolio</span>
                </Link>
              </div>

              {/* Quick Stat Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80 dark:border-gray-800 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-pink-700 dark:text-pink-400">25+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Programming Tracks</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">1,328+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">10-Point Lessons</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Free Access</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Small, Perfectly Rounded Profile Image with Outer Animated Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col items-center justify-center text-center"
            >
              {/* Profile Avatar Container with Outer Rotating Ring */}
              <div className="relative flex items-center justify-center">
                
                {/* Outer Ambient Glow Effect */}
                <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-pink-600/30 via-purple-600/30 to-indigo-600/30 blur-xl animate-glow-pulse pointer-events-none" />

                {/* Animated Rotating Gradient Outer Ring */}
                <div className="absolute w-[208px] h-[208px] sm:w-[240px] sm:h-[240px] rounded-full p-[3px] bg-gradient-to-tr from-pink-600 via-indigo-500 to-cyan-400 animate-rotate-ring shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-50 dark:bg-gray-950" />
                </div>

                {/* Circular Profile Image (Perfect Circle, Small & Well Sized) */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl z-10 group cursor-pointer">
                  <Image
                    src="/codewithzohaib.png"
                    alt="Zohaib - Founder of CodeWithZohaib Academy"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Founder Badge */}
                <div className="absolute -bottom-3 z-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs font-bold px-3.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Zohaib • Founder & Lead Dev</span>
                </div>
              </div>

              {/* Bio Caption */}
              <div className="mt-8 max-w-sm">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Teaching real-world developer skills, algorithms, and practical programming with clarity 
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Fast Track Quick-Launch Bar */}
      <section className="py-8 bg-white dark:bg-gray-900/60 border-b border-gray-200/70 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
              <Terminal size={18} className="text-pink-600" />
              <span>Popular Tracks:</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              {featuredTracks.map((track) => (
                <Link
                  key={track.name}
                  href={track.href}
                  className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700 hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 hover:shadow-sm transition"
                >
                  <span>{track.name}</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-pink-500">({track.desc})</span>
                  <ChevronRight size={12} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why CodeWithZohaib Academy Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Why Learn at <span className="text-pink-700 dark:text-pink-500">CodeWithZohaib</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base mt-2">
            Every question is engineered using our signature 10-point educational architecture to ensure full conceptual clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 flex items-center justify-center mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">10-Point Learning</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Every topic includes short definitions, easy explanations, code line breakdowns, and common mistakes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Globe2 size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">Roman Urdu Support</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Clear Roman Urdu analogies and explanations simplify tough programming concepts for native Urdu speakers.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Layers size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">Behind-the-Scenes</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Understand how compilers, browsers, and runtimes process your code under the hood.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">Practice Tasks</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Practical mini-projects and coding challenges for every question to build muscle memory.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <Boxes />


      {/* Floating Chat Assistant */}
      <Chatbot />
    </div>
  );
}
