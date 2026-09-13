'use client';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { ModeToggle } from './ModeToggle';
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { array as database } from "./Database";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      const filteredSuggestions = database
        .filter((item) => (item.title || item.Title || item.topicName || "").toLowerCase().includes(value.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id: number) => {
    router.push(`/questions/${id}`);
    setSearchTerm("");
    setSuggestions([]);
    setToggle(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleClickFunc = () => setToggle(!toggle);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 z-50 shadow-sm sticky top-0 w-full transition-colors duration-200">
      {/* Main Navbar Container */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 min-h-[4rem] max-w-7xl mx-auto">
        
        {/* Logo - Clickable Link to Home */}
        <Link 
          href="/" 
          className="text-xl sm:text-2xl font-serif font-bold text-pink-700 dark:text-pink-500 flex-shrink-0 flex items-center gap-1 hover:opacity-90 transition-opacity"
        >
          <span className="font-mono font-black">&lt;/&gt;</span>
          <span className="tracking-tight">CodeWithZohaib</span>
        </Link>

        {/* Desktop Search Bar */}
        <div ref={searchContainerRef} className="hidden lg:flex items-center justify-center flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input
              className="w-full py-2.5 pl-11 pr-4 bg-gray-50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-full shadow-inner focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition duration-200 text-sm placeholder-gray-400 dark:placeholder-gray-500"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search 1,300+ questions & topics..."
              aria-label="Search questions and topics"
              aria-autocomplete="list"
              aria-controls={suggestions.length > 0 ? "search-suggestions" : undefined}
              aria-expanded={suggestions.length > 0}
              role="combobox"
            />
            <div className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
              <CiSearch className="text-xl" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Mobile/Tablet Search Toggle */}
          <button 
            onClick={handleClickFunc} 
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-pink-700 dark:hover:text-pink-400 rounded-lg transition-colors"
            aria-label="Toggle search"
            aria-expanded={toggle}
          >
            <CiSearch className="text-2xl" aria-hidden="true" />
          </button>

          {/* Mode Toggle */}
          <div className="flex-shrink-0">
            <ModeToggle />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2.5 pl-2">
            <Link href='/Connect'>
              <button className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-full transition duration-200 text-sm font-semibold border border-gray-200 dark:border-gray-700">
                Connect
              </button>
            </Link>
            <Link href='/Add'>
              <button className="bg-pink-700 hover:bg-pink-800 text-white py-2 px-5 rounded-full transition duration-200 text-sm font-semibold shadow-sm hover:shadow">
                Submit Topic
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-pink-700 dark:text-pink-400"
              aria-hidden="true"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Search Drawer */}
      <AnimatePresence>
        {toggle && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div ref={searchContainerRef} className="relative w-full max-w-md mx-auto">
              <input
                className="w-full py-2.5 pl-11 pr-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-full shadow-inner focus:outline-none focus:border-pink-500 text-sm"
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search questions..."
                autoFocus
                aria-label="Search questions"
              />
              <div className="absolute inset-y-0 left-3.5 flex items-center text-gray-400" aria-hidden="true">
                <CiSearch className="text-xl" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-3 max-w-sm mx-auto" aria-label="Mobile navigation">
              <Link href='/'>
                <button 
                  className="w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  All Courses
                </button>
              </Link>
              <Link href='/Connect'>
                <button 
                  className="w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Connect &amp; Join
                </button>
              </Link>
              <Link href='/Add'>
                <button 
                  className="w-full bg-pink-700 text-white py-2.5 px-4 rounded-xl hover:bg-pink-800 font-semibold text-center transition"
                  onClick={() => setIsOpen(false)}
                >
                  Submit Question / Feedback
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 mt-1"
          >
            <div className="mx-auto max-w-xl">
              <ul 
                id="search-suggestions"
                role="listbox"
                aria-label="Search suggestions"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-700/60"
              >
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    role="option"
                    aria-selected={false}
                    onClick={() => handleSuggestionClick(suggestion.id)}
                    className="p-3.5 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-700/60 transition duration-150 flex items-center justify-between group"
                  >
                    <div className="truncate pr-3">
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {suggestion.title || suggestion.Title}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                        {suggestion.courseId} • Question #{suggestion.questionNumber}
                      </div>
                    </div>
                    <span className="text-xs text-pink-600 dark:text-pink-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Study &rarr;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
