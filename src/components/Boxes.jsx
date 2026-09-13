'use client'
import React, { useState } from 'react';
import { Star, Clock, Users, BookOpen, Filter, Search, Award, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

const Boxes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['all', 'frontend', 'backend', 'database', 'programming'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const boxes = [
    {
      id: 1,
      image: "/html.jpeg",
      name: 'HTML - The Building Block of Web Pages',
      des: 'HTML (HyperText Markup Language) is the standard language for creating web pages. It defines the structure of a web page using elements like headings, paragraphs, and links.',
      link: '/Html',
      category: 'frontend',
      difficulty: 'beginner',
      duration: '4 weeks',
      rating: 4.8,
      studentsEnrolled: 15234,
      lessonsCount: 24,
      features: ['Interactive Exercises', 'Code Challenges', 'Real Projects'],
      progress: 0,
      instructor: 'DotZohaib',
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      image: "/css.jpeg",
      name: 'CSS - Styling the Web',
      des: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the color, font, layout, and overall presentation of a site across multiple devices.',
      link: '/Css',
      category: 'frontend',
      difficulty: 'beginner',
      duration: '3 weeks',
      rating: 4.7,
      studentsEnrolled: 12564,
      lessonsCount: 18,
      features: ['Responsive Design', 'Flexbox and Grid', 'Real Projects'],
      progress: 0,
      instructor: 'DotZohaib',
      lastUpdated: '2024-02-10'
    },
    {
      id: 3,
      image: "/javascript.png",
      name: 'JavaScript - The Heart of Dynamic Web Applications',
      des: 'JavaScript is a versatile programming language that allows you to create dynamically updating content, control multimedia, animate images, and much more on the web.',
      link: '/Javascript',
      category: 'frontend',
      difficulty: 'intermediate',
      duration: '6 weeks',
      rating: 4.9,
      studentsEnrolled: 20013,
      lessonsCount: 30,
      features: ['Interactive Animations', 'DOM Manipulation', 'API Integration'],
      progress: 0,
      instructor: 'DotZohaib',
      lastUpdated: '2024-01-25'
    },
    {
      id: 4,
      image: "/typescript.png",
      name: 'TypeScript - JavaScript with Type Safety',
      des: 'TypeScript is a strongly typed superset of JavaScript. It enhances the development experience by catching errors early through type checking and enabling more robust code.',
      link: '/Typescript',
      category: 'frontend',
      difficulty: 'advanced',
      duration: '5 weeks',
      rating: 4.6,
      studentsEnrolled: 11450,
      lessonsCount: 20,
      features: ['Type Safety', 'Code Quality', 'Scalable Applications'],
      progress: 0,
      instructor: 'DotZohaib',
      lastUpdated: '2024-04-05'
    },
    {
      id: 5,
      image: "/react.png",
      name: 'React.js - Build Interactive User Interfaces',
      des: 'React.js is a powerful JavaScript library used for building user interfaces. It enables you to create reusable UI components and manage the dynamic nature of web apps efficiently.',
      link: '/React',
      category: 'frontend',
      difficulty: 'advanced',
      duration: '6 weeks',
      rating: 4.9,
      studentsEnrolled: 18223,
      lessonsCount: 28,
      features: ['Component Reusability', 'State Management', 'Real Projects'],
      progress: 0,
      instructor: 'DotZohaib',
      lastUpdated: '2024-03-12'
    },
    {
        id: 6,
        image: "/next.png",
        name: 'Next.js - The React Framework for Production',
        des: 'Next.js is a popular React framework that enables server-side rendering, static site generation, and improved SEO performance. It also simplifies the development of React apps.',
        link: '/Next',
        category: 'frontend',
        difficulty: 'advanced',
        duration: '7 weeks',
        rating: 4.8,
        studentsEnrolled: 14567,
        lessonsCount: 26,
        features: ['Server-Side Rendering', 'Static Generation', 'SEO Optimization'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-20'
      },
      {
        id: 7,
        image: "/ejs.jpeg",
        name: 'EJS - Embedded JavaScript Templating',
        des: 'EJS (Embedded JavaScript) is a templating engine used to embed JavaScript into HTML. It simplifies dynamic rendering of web pages, making it ideal for server-side apps.',
        link: '/Ejs',
        category: 'backend',
        difficulty: 'intermediate',
        duration: '3 weeks',
        rating: 4.5,
        studentsEnrolled: 12345,
        lessonsCount: 16,
        features: ['Server-Side Templates', 'Dynamic Rendering', 'MVC Structure'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-28'
      },
      {
        id: 8,
        image: "/angular.png",
        name: 'Angular.js - Build Robust Web Applications',
        des: 'Angular.js is a full-fledged JavaScript framework used to create dynamic, single-page web applications. It provides a structured approach to building scalable apps.',
        link: '/Angular',
        category: 'frontend',
        difficulty: 'advanced',
        duration: '8 weeks',
        rating: 4.7,
        studentsEnrolled: 16400,
        lessonsCount: 32,
        features: ['Two-Way Data Binding', 'Component-Based Architecture', 'Real Projects'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-01-30'
      },
      {
        id: 9,
        image: "/tailwind.png",
        name: 'Tailwind CSS - Utility-First Styling Framework',
        des: 'Tailwind CSS is a utility-first CSS framework that offers low-level styling options to build highly customizable designs. It helps developers rapidly build modern web interfaces.',
        link: '/Tailwind',
        category: 'frontend',
        difficulty: 'beginner',
        duration: '2 weeks',
        rating: 4.8,
        studentsEnrolled: 19087,
        lessonsCount: 10,
        features: ['Utility-First Approach', 'Customizable Design', 'Responsive Styling'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-22'
      },
      {
        id: 10,
        image: "/python.jpeg",
        name: 'Python - Powerful and Versatile',
        des: 'Python is a high-level programming language known for its simplicity and readability. It’s widely used in web development, data science, artificial intelligence, and more.',
        link: '/Python',
        category: 'programming',
        difficulty: 'intermediate',
        duration: '6 weeks',
        rating: 4.9,
        studentsEnrolled: 22001,
        lessonsCount: 35,
        features: ['Data Analysis', 'Web Development', 'AI and Machine Learning'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-14'
      },
      {
        id: 11,
        image: "/node.png",
        name: 'Node.js - JavaScript on the Server',
        des: 'Node.js is a runtime that allows developers to use JavaScript on the server side. It is ideal for building scalable network applications and powering real-time services.',
        link: '/Node',
        category: 'backend',
        difficulty: 'intermediate',
        duration: '5 weeks',
        rating: 4.7,
        studentsEnrolled: 18250,
        lessonsCount: 28,
        features: ['Event-Driven Architecture', 'Real-Time Communication', 'API Development'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-18'
      },
      {
        id: 12,
        image: "/express.png",
        name: 'Express.js - Fast and Minimal Web Framework',
        des: 'Express.js is a lightweight, fast framework for Node.js, ideal for building server-side applications with RESTful APIs and efficient middleware support.',
        link: '/Express',
        category: 'backend',
        difficulty: 'intermediate',
        duration: '4 weeks',
        rating: 4.6,
        studentsEnrolled: 15000,
        lessonsCount: 20,
        features: ['Middleware Support', 'RESTful APIs', 'Routing Capabilities'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-05'
      },
      {
        id: 13,
        image: "/mongoose.png",
        name: 'Mongoose - Elegant MongoDB Object Modeling',
        des: 'Mongoose is an object data modeling (ODM) library for MongoDB and Node.js. It simplifies managing data relationships and provides schema validation for your data models.',
        link: '/Mongoose',
        category: 'backend',
        difficulty: 'advanced',
        duration: '3 weeks',
        rating: 4.8,
        studentsEnrolled: 12000,
        lessonsCount: 18,
        features: ['Schema Validation', 'Data Modeling', 'ODM Capabilities'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-20'
      },
      {
        id: 14,
        image: "/mongodb.png",
        name: 'MongoDB - NoSQL Database for Modern Apps',
        des: 'MongoDB is a NoSQL database designed for handling large amounts of unstructured data. It provides high performance, scalability, and flexibility for modern applications.',
        link: '/Mongodb',
        category: 'database',
        difficulty: 'intermediate',
        duration: '6 weeks',
        rating: 4.7,
        studentsEnrolled: 13450,
        lessonsCount: 22,
        features: ['Scalable Architecture', 'Flexible Data Storage', 'High Performance'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-12'
      },
      {
        id: 15,
        image: "/jwt.png",
        name: 'JWT and Session - Secure Authentication',
        des: 'JSON Web Tokens (JWT) and sessions are methods for handling authentication in web apps. They ensure secure communication between the client and the server by verifying user credentials.',
        link: '/Jwt',
        category: 'security',
        difficulty: 'advanced',
        duration: '2 weeks',
        rating: 4.5,
        studentsEnrolled: 11050,
        lessonsCount: 12,
        features: ['Token-Based Authentication', 'Session Management', 'Secure Communication'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-03'
      },
      {
        id: 16,
        image: "/c.png",
        name: 'C - The Foundation of Modern Programming',
        des: 'C is a general-purpose programming language that forms the basis of many modern languages. It’s known for its efficiency and is widely used in systems programming and embedded devices.',
        link: '/C',
        category: 'programming',
        difficulty: 'advanced',
        duration: '8 weeks',
        rating: 4.6,
        studentsEnrolled: 9750,
        lessonsCount: 30,
        features: ['Memory Management', 'Low-Level Operations', 'System Programming'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-10'
      },
      {
        id: 17,
        image: "/C++.png",
        name: 'C++ - Object-Oriented Programming Powerhouse',
        des: 'C++ is an extension of C that includes object-oriented features. It is widely used for systems programming, game development, and applications requiring high performance.',
        link: '/Cc',
        category: 'programming',
        difficulty: 'advanced',
        duration: '10 weeks',
        rating: 4.7,
        studentsEnrolled: 12500,
        lessonsCount: 35,
        features: ['Object-Oriented Design', 'Performance Optimization', 'Multithreading'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-01'
      },
      {
        id: 18,
        image: "/PHP.jpeg",
        name: 'PHP - Server-Side Scripting for the Web',
        des: 'PHP is a server-side scripting language designed for web development. It powers many of the world’s websites and is known for its simplicity and compatibility with databases.',
        link: '/Php',
        category: 'backend',
        difficulty: 'beginner',
        duration: '4 weeks',
        rating: 4.3,
        studentsEnrolled: 15800,
        lessonsCount: 20,
        features: ['Database Integration', 'Server-Side Scripting', 'Dynamic Web Pages'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-24'
      },
      {
        id: 19,
        image: "/java.png",
        name: 'Java - Write Once, Run Anywhere',
        des: 'Java is a versatile programming language used for building enterprise-level applications, Android apps, and large systems. Its "write once, run anywhere" philosophy makes it highly portable.',
        link: '/Java',
        category: 'programming',
        difficulty: 'intermediate',
        duration: '7 weeks',
        rating: 4.5,
        studentsEnrolled: 14700,
        lessonsCount: 26,
        features: ['Cross-Platform Compatibility', 'Object-Oriented Design', 'Robust APIs'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-08'
      },
      {
        id: 20,
        image: "/Ruby.png",
        name: 'Ruby - Elegant Scripting Language',
        des: 'Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity. It’s used widely for web applications and known for its elegant syntax.',
        link: '/Ruby',
        category: 'programming',
        difficulty: 'beginner',
        duration: '5 weeks',
        rating: 4.4,
        studentsEnrolled: 10250,
        lessonsCount: 18,
        features: ['Simplicity in Syntax', 'Productivity-Oriented', 'Flexible Coding'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-15'
      },
      {
        id: 21,
        image: "/Swift.png",
        name: 'Swift - Powerful for iOS and macOS Development',
        des: 'Swift is a modern programming language developed by Apple. It is optimized for performance and provides developers with the tools to build apps for iOS and macOS.',
        link: '/Swift',
        category: 'mobile development',
        difficulty: 'intermediate',
        duration: '6 weeks',
        rating: 4.7,
        studentsEnrolled: 8900,
        lessonsCount: 22,
        features: ['iOS App Development', 'macOS Integration', 'Performance Optimization'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-01-30'
      },
      {
        id: 22,
        image: "/Go.png",
        name: 'Go - Efficiency and Scalability',
        des: 'Go (or Golang) is a statically typed programming language developed by Google. It’s known for its efficiency and is popular for server-side development and distributed systems.',
        link: '/Go',
        category: 'backend',
        difficulty: 'intermediate',
        duration: '8 weeks',
        rating: 4.6,
        studentsEnrolled: 9500,
        lessonsCount: 25,
        features: ['Concurrency Support', 'High Performance', 'Scalable Applications'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-05'
      },
      {
        id: 23,
        image: "/sql.webp",
        name: 'SQL - Structured Query Language',
        des: 'Structured Query Language used for managing and querying relational databases.',
        link: '/Sql',
        category: 'database',
        difficulty: 'beginner',
        duration: '4 weeks',
        rating: 4.5,
        studentsEnrolled: 12300,
        lessonsCount: 20,
        features: ['Database Queries', 'Data Management', 'Relational Models'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-02-12'
      },
      {
        id: 24,
        image: "/django.png",
        name: 'Django - High-Level Python Web Framework',
        des: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It’s ideal for building secure and scalable web applications.',
        link: '/Django',
        category: 'backend',
        difficulty: 'intermediate',
        duration: '8 weeks',
        rating: 4.8,
        studentsEnrolled: 11000,
        lessonsCount: 27,
        features: ['Scalability', 'Security Focused', 'Rapid Development'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-01-25'
      },
      {
        id: 25,
        image: "/kotlin.png",
        name: 'Kotlin - Modern Language for Android Development',
        des: 'Kotlin is a statically typed programming language developed by JetBrains and is now the preferred language for Android development. It’s designed to be fully interoperable with Java.',
        link: '/Kotlin',
        category: 'mobile development',
        difficulty: 'intermediate',
        duration: '6 weeks',
        rating: 4.6,
        studentsEnrolled: 7700,
        lessonsCount: 24,
        features: ['Android App Development', 'Java Interoperability', 'Modern Syntax'],
        progress: 0,
        instructor: 'DotZohaib',
        lastUpdated: '2024-03-12'
      },
  ];
  

  const filteredBoxes = boxes.filter(box => {
    const matchesSearch = box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         box.des.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || box.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || box.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <section className="py-12 md:py-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-700 dark:text-pink-500 tracking-tight">
          Explore All Course Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Choose from 25 curated programming tracks, featuring 10-point breakdowns and real code challenges.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-800 p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search courses by name or concept..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <select
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500 transition"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500 transition"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredBoxes.map((box) => (
            <motion.div 
              key={box.id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden group">
                <Image
                width={300}
                height={300}
                  src={box.image}
                  alt={box.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-pink-700 shadow-sm">
                  {box.difficulty}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {box.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {box.des}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-pink-500" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{box.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-500" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {box.studentsEnrolled.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{box.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{box.lessonsCount} lessons</span>
                  </div>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {box.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Progress Bar (if started) */}
                {box.progress > 0 && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full h-2"
                      style={{ width: `${box.progress}%` }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <Link href={box.link} className="flex-1 w-full">
                    <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg py-2.5 px-4 font-semibold transition-all duration-300 hover:from-pink-700 hover:to-purple-700 hover:shadow-lg flex items-center justify-center gap-2 group">
                      Get Started
                      <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Last Updated */}
                <div 
                  className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center font-medium"
                  suppressHydrationWarning
                >
                  Last updated: {formatDate(box.lastUpdated)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Boxes;
