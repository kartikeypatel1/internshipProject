import React from "react";
import { BookMarked, Users, Gift, Star, Library, Lock, Search, Moon } from "lucide-react";

function About() {
  const stats = [
    { value: "10K+", label: "Books Available", icon: <BookMarked className="w-7 h-7 text-indigo-500" /> },
    { value: "50K+", label: "Happy Readers", icon: <Users className="w-7 h-7 text-pink-500" /> },
    { value: "500+", label: "Free Resources", icon: <Gift className="w-7 h-7 text-green-500" /> },
    { value: "4.9★", label: "Average Rating", icon: <Star className="w-7 h-7 text-yellow-500" /> },
  ];

  const features = [
    {
      icon: <Library className="w-6 h-6 text-white" />,
      title: "Vast Collection",
      desc: "Thousands of books spanning every genre — from timeless classics to cutting-edge technical guides and modern bestsellers.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: "Always Free Access",
      desc: "Access hundreds of free books without signing up. We believe knowledge should be accessible to everyone, everywhere.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <BookMarked className="w-6 h-6 text-white" />,
      title: "Learn at Your Pace",
      desc: "Read on any device, any time. Your progress is always saved so you can pick up right where you left off.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Moon className="w-6 h-6 text-white" />,
      title: "Dark Mode & Comfort",
      desc: "Our beautiful dark theme and clean typography make reading comfortable day and night, reducing eye strain.",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: "Smart Search",
      desc: "Find exactly what you're looking for with our smart search and category filters. Discover books by genre with ease.",
      color: "from-yellow-500 to-amber-600",
    },
    {
      icon: <Lock className="w-6 h-6 text-white" />,
      title: "Secure & Private",
      desc: "Your data is safe with us. We use industry-standard encryption and never share your personal information.",
      color: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">💡 &nbsp;Why BookStore?</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About{" "}
            <span className="gradient-text">BookStore</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            We believe books are the greatest companions in life. Our mission is
            to make quality reading accessible to <strong>everyone</strong> —
            for free and beyond.
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative text-center p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))" }} />
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Features grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
