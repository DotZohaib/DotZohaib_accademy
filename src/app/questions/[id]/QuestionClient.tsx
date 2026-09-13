'use client';

import React from 'react';
import { array as database } from "../../../components/Database";
import CoursePageLayout from "@/components/CoursePageLayout";
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface QuestionClientProps {
  id: string;
}

export default function QuestionClient({ id }: QuestionClientProps) {
  const numericId = parseInt(id, 10);
  const questionObj = database.find((item) => item.id === numericId);

  if (!questionObj) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50/70 dark:bg-gray-950">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 flex items-center justify-center mx-auto font-bold text-xl">
            ?
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Topic Not Found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The requested lesson #{id} does not exist in our academy database or has been moved.
          </p>
          <div className="pt-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold shadow transition"
            >
              <ArrowLeft size={16} />
              <span>Back to All Courses</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const courseId = (questionObj.courseId || "general").toLowerCase();
  const courseTitle = courseId.charAt(0).toUpperCase() + courseId.slice(1);

  return (
    <CoursePageLayout
      courseId={courseId}
      courseTitle={courseTitle}
      badgeText={`${courseTitle} Track`}
      initialQuestionId={numericId}
    />
  );
}
