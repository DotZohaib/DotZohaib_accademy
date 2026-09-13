import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-slate-50/70 dark:bg-gray-950 px-4 py-16 transition-colors duration-200">
      <div className="max-w-md w-full text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 shadow-sm space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 font-extrabold text-2xl flex items-center justify-center mx-auto">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Sorry, the page or question topic you are looking for does not exist or has been relocated.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-pink-700 hover:bg-pink-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition"
          >
            <ArrowLeft size={16} />
            <span>Go Back Home</span>
          </Link>
          <Link
            href="/Connect"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm font-semibold transition"
          >
            <span>Connect Support</span>
          </Link>
        </div>
      </div>
    </main>
  );
}