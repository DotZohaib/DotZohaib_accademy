'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, Mic, Upload, Code, BookOpen, Users, Star, Award, ChevronDown } from 'lucide-react';

const ProfessionalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [file, setFile] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserName = sessionStorage.getItem('chatUserName') || '';
      setUserName(storedUserName);
      setShowNameInput(!storedUserName);

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          setIsListening(false);
        };
        recognitionRef.current.onerror = () => setIsListening(false);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userName && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([{
          text: `Welcome to CodeWithZohaib Academy, ${userName}! 🎓 I'm your learning assistant. How can I help you today?`,
          sender: "bot",
          time: new Date()
        }]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userName, messages.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleNameSubmit = () => {
    if (userInput.trim()) {
      sessionStorage.setItem('chatUserName', userInput);
      setUserName(userInput);
      setShowNameInput(false);
      setUserInput('');
    }
  };

  const quickActions = [
    { icon: Code, text: "Courses Available", action: "What programming courses do you offer?" },
    { icon: BookOpen, text: "Free Resources", action: "What free learning resources are available?" },
    { icon: Users, text: "Contact Info", action: "How can I contact CodeWithZohaib?" },
    { icon: Award, text: "Certifications", action: "Do you provide certificates?" }
  ];

  const handleQuickAction = (action) => {
    setUserInput(action);
    setShowQuickActions(false);
    setTimeout(() => handleSendMessage(action), 100);
  };

  const handleSendMessage = async (quickMessage = null) => {
    const messageText = quickMessage || userInput.trim();
    if (!messageText && !file) return;

    if (file) {
      const newMessage = {
        text: `📎 ${file.name}`,
        sender: "user",
        time: new Date(),
        file: URL.createObjectURL(file)
      };
      setMessages(prev => [...prev, newMessage]);
      setFile(null);
    }

    if (messageText) {
      const newMessage = {
        text: messageText,
        sender: "user",
        time: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setUserInput('');
      setIsTyping(true);

      setTimeout(async () => {
        const response = await getBotResponse(messageText);
        setMessages(prev => [...prev, {
          text: response,
          sender: "bot",
          time: new Date()
        }]);
        setIsTyping(false);
        
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }, Math.random() * 1500 + 1000);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > 10 * 1024 * 1024) {
        alert('File size too large (max 10MB)');
        return;
      }
      setFile(uploadedFile);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getBotResponse = async (input) => {
    const responses = [
      {
        keywords: ['hi', 'hello', 'hey', 'greetings'],
        response: `Hello! Welcome to CodeWithZohaib Academy! 🎓 I'm here to help you with programming courses, resources, and any questions about our academy.`
      },
      {
        keywords: ['courses', 'programming', 'learn', 'study'],
        response: `🚀 We offer comprehensive courses in:\n\n• Full Stack Web Development (MERN)\n• JavaScript & TypeScript\n• React.js & Next.js\n• Node.js & Express\n• Python Programming\n• Data Structures & Algorithms\n• Web Design (HTML/CSS/Tailwind)\n• Database Management\n\nWhich course interests you most?`
      },
      {
        keywords: ['free', 'resources', 'materials'],
        response: `📚 Free Learning Resources Available:\n\n• Programming tutorials and guides\n• Code examples and projects\n• Practice exercises\n• Career guidance articles\n• Tech interview preparation\n\nVisit codewithzohaib.vercel.app for all free resources!`
      },
      {
        keywords: ['contact', 'reach', 'email', 'phone'],
        response: `📞 Contact CodeWithZohaib:\n\n📧 Email: Zohaibalid@gmail.com\n🌐 Website: codewithzohaib.vercel.app\n\nFeel free to reach out for:\n• Course inquiries\n• Technical support\n• Career guidance\n• Custom training programs`
      },
      {
        keywords: ['certificate', 'certification', 'diploma'],
        response: `🏆 Yes! We provide:\n\n• Course completion certificates\n• Industry-recognized certifications\n• Project portfolio development\n• LinkedIn skill endorsements\n\nAll our certificates are digitally verifiable and industry-standard.`
      },
      {
        keywords: ['price', 'cost', 'fee', 'payment'],
        response: `💰 Course Pricing:\n\n• Individual courses: Competitive rates\n• Bundle packages available\n• Payment plans offered\n• Scholarships for deserving students\n• Free trial lessons\n\nContact us for detailed pricing and special offers!`
      },
      {
        keywords: ['instructor', 'teacher', 'zohaib', 'zuhaib'],
        response: `👨‍💻 About Zohaib Ali:\n\n• Full Stack Developer & Instructor\n• 5+ years industry experience\n• MERN Stack specialist\n• AI/ML enthusiast\n• Passionate educator\n\nDedicated to helping students achieve their programming goals!`
      },
      {
        keywords: ['beginner', 'start', 'new', 'basic'],
        response: `🌟 Perfect for beginners! We offer:\n\n• Step-by-step learning paths\n• Beginner-friendly projects\n• Personal mentorship\n• Practical hands-on experience\n• Career guidance\n\nStart your coding journey today with our structured programs!`
      },
      {
        keywords: ['job', 'career', 'placement', 'work'],
        response: `💼 Career Support:\n\n• Job placement assistance\n• Resume building guidance\n• Interview preparation\n• Industry connections\n• Portfolio development\n• Freelancing guidance\n\nWe help you land your dream tech job!`
      },
      {
        keywords: ['online', 'offline', 'mode', 'class'],
        response: `📺 Learning Options:\n\n• Online live sessions\n• Self-paced courses\n• Recorded lectures\n• One-on-one mentoring\n• Group projects\n• 24/7 support\n\nChoose the learning style that works best for you!`
      },
      {
        keywords: ['javascript', 'js', 'react', 'node'],
        response: `⚡ JavaScript Ecosystem:\n\n• Modern JavaScript (ES6+)\n• React.js for frontend\n• Node.js for backend\n• Express.js framework\n• MongoDB database\n• RESTful APIs\n\nMaster the complete JavaScript stack with us!`
      },
      {
        keywords: ['python', 'data', 'science', 'ai', 'ml'],
        response: `🐍 Python Programming:\n\n• Core Python fundamentals\n• Data Science with pandas\n• Machine Learning basics\n• Web scraping\n• Automation scripts\n• Django/Flask frameworks\n\nUnlock the power of Python programming!`
      },
      {
        keywords: ['project', 'portfolio', 'build'],
        response: `🔨 Project-Based Learning:\n\n• Real-world projects\n• Portfolio development\n• GitHub integration\n• Code reviews\n• Industry best practices\n• Team collaboration\n\nBuild impressive projects that showcase your skills!`
      },
      {
        keywords: ['support', 'help', 'doubt', 'question'],
        response: `🤝 Student Support:\n\n• 24/7 chat assistance\n• Weekly doubt-clearing sessions\n• Personal mentorship\n• Peer learning groups\n• Technical support\n• Career counseling\n\nWe're always here to help you succeed!`
      },
      {
        keywords: ['thanks', 'thank you', 'appreciate'],
        response: `You're most welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about CodeWithZohaib Academy?`
      },
      {
        keywords: ['bye', 'goodbye', 'see you'],
        response: `Thank you for visiting CodeWithZohaib Academy! 👋 Feel free to reach out anytime. Happy coding! 🚀`
      }
    ];

    const lowerInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const { keywords, response } of responses) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return response;
      }
    }

    // Default response
    return `I'd be happy to help you! 🤖 I can assist with:\n\n• Course information\n• Learning resources\n• Contact details\n• Career guidance\n• Technical support\n\nWhat would you like to know about CodeWithZohaib Academy?`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-full max-w-[95vw] sm:w-[400px] lg:w-[450px] h-[85vh] sm:h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp m-2 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CodeWithZohaib Assistant</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Always Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggle}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {showNameInput ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot size={36} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CodeWithZohaib!</h2>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Your premier coding academy for mastering modern programming skills
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your name to get started..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                  <button
                    onClick={handleNameSubmit}
                    disabled={!userInput.trim()}
                    className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Learning Journey
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {/* Quick Actions */}
                {showQuickActions && (
                  <div className="mb-4 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center gap-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <action.icon size={14} className="text-indigo-600" />
                          <span className="truncate">{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] relative ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      <div className="p-3">
                        {message.file ? (
                          <div className="max-w-[250px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={message.file}
                              alt="Uploaded content"
                              className="rounded-lg object-cover w-full h-auto mb-2"
                              loading="lazy"
                            />
                            <p className="text-sm">{message.text}</p>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        )}
                      </div>
                      <div className={`px-3 pb-2 ${
                        message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                      }`}>
                        <p className="text-xs">
                          {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex mb-4">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          {!showNameInput && (
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Quick Actions Toggle */}
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="w-full mb-3 p-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Quick Actions
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform duration-200 ${showQuickActions ? 'rotate-180' : ''}`}
                />
              </button>

              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about courses, resources, pricing..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
                    style={{ minHeight: '48px' }}
                  />
                  {file && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                      <button
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-2xl transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Mic size={18} />
                  </button>
                  
                  <label className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl cursor-pointer transition-all duration-200">
                    <Upload size={18} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                  
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!userInput.trim() && !file}
                    className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="relative group transform hover:scale-105 transition-all duration-300"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-indigo-500/25 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
          {isOpen ? (
            <X size={24} className="relative z-10" />
          ) : (
            <MessageCircle size={24} className="relative z-10" />
          )}
        </div>

        {/* Unread Count Badge */}
        {!isOpen && unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}

        {/* Enhanced Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-2xl text-sm whitespace-nowrap relative">
              <div className="flex items-center gap-2">
                <Code size={16} />
                <span>Chat with CodeWithZuhaib</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></div>
      </button>
    </div>
  );
};

export default ProfessionalChatbot;
