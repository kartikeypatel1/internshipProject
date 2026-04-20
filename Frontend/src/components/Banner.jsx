import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Banner() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("🎉 You're subscribed! Free books coming your way.");
      setEmail("");
    }
  };

  const stats = [
    { value: "10K+", label: "Books" },
    { value: "50K+", label: "Readers" },
    { value: "500+", label: "Free Titles" },
    { value: "4.9★", label: "Rating" },
  ];

  const floatingEmojis = ["📚", "📖", "✨", "🎓", "💡", "🔖"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden dark:bg-slate-900 bg-white pt-16">
      {/* ── Gradient blobs ─────────────────────────────── */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Floating emoji decorations ─────────────────── */}
      {floatingEmojis.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-3xl opacity-25 select-none pointer-events-none"
          style={{
            top: `${15 + i * 14}%`,
            right: `${5 + (i % 3) * 8}%`,
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 py-12">
          {/* ── Left — Content ─────────────────────────── */}
          <div className="w-full md:w-1/2 space-y-7 fade-in-up">
            {/* Badge */}
            <div className="section-badge">
              🔥 &nbsp;Over 10,000 Books Available
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Discover Your Next{" "}
              <span className="gradient-text">
                Favourite Book
              </span>{" "}
              Today
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
              Explore thousands of books across every genre — from timeless
              classics to cutting-edge tech. Start reading for free with no
              credit card required.
            </p>

            {/* Subscribe */}
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm"
                placeholder="your@email.com"
              />
              <button
                type="submit"
                className="btn-gradient px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap shadow-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400">
              🔒 No spam. Unsubscribe anytime.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/course")}
                className="btn-gradient px-7 py-3 rounded-xl font-semibold shadow-lg text-sm"
              >
                Browse All Books →
              </button>
              <a
                href="/#about"
                className="px-7 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* ── Right — Visual ─────────────────────────── */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl" />
            </div>
            {/* Book stack image */}
            <img
              src="/Banner.png"
              alt="Books"
              className="relative z-10 w-72 md:w-96 drop-shadow-2xl float-anim"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* ── Stats bar ───────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;
