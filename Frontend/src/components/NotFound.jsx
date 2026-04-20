import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* Big 404 text */}
        <div className="text-[10rem] font-black leading-none gradient-text select-none">
          404
        </div>

        <div className="text-6xl mb-6 float-anim">📚</div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-base leading-relaxed">
          Oops! The page you're looking for doesn't exist. It may have been
          moved, deleted, or you may have typed the URL incorrectly.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="btn-gradient px-7 py-3 rounded-xl font-semibold text-sm shadow-lg"
          >
            ← Back to Home
          </Link>
          <Link
            to="/course"
            className="px-7 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
