import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  BookOpen, Star, Heart, Calendar, BarChart2,
  Eye, Bookmark, Clock, Settings, List,
  Trash2, Lock, User, AlertTriangle, Loader2,
  ExternalLink, Target
} from "lucide-react";

function Profile() {
  const [authUser, setAuthUser] = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [editName, setEditName] = useState(authUser?.fullname || "");
  const [saving, setSaving] = useState(false);

  if (!authUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-900 gap-4">
        <div className="text-6xl">🔒</div>
        <h2 className="text-2xl font-bold dark:text-white">Please log in first</h2>
        <Link to="/" className="btn-gradient px-6 py-2.5 rounded-xl font-semibold text-white">
          Go Home
        </Link>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const joinedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const stats = [
    { label: "Books Browsed", value: "24", icon: <BookOpen className="w-5 h-5 text-indigo-500" /> },
    { label: "Free Books", value: "6", icon: <Star className="w-5 h-5 text-green-500" /> },
    { label: "Wishlist", value: "8", icon: <Heart className="w-5 h-5 text-pink-500" /> },
    { label: "Member Since", value: joinedDate, icon: <Calendar className="w-5 h-5 text-purple-500" /> },
  ];

  const recentActivity = [
    { action: "Browsed", book: "The Great Gatsby", time: "2 hours ago", icon: <Eye className="w-4 h-4 text-indigo-400" /> },
    { action: "Saved", book: "Clean Code", time: "Yesterday", icon: <Bookmark className="w-4 h-4 text-yellow-400" /> },
    { action: "Started reading", book: "Atomic Habits", time: "3 days ago", icon: <BookOpen className="w-4 h-4 text-green-400" /> },
    { action: "Browsed", book: "1984", time: "1 week ago", icon: <Eye className="w-4 h-4 text-indigo-400" /> },
  ];

  const wishlist = [
    { name: "Clean Code", category: "Paid", price: 29 },
    { name: "Atomic Habits", category: "Paid", price: 15 },
    { name: "Deep Work", category: "Paid", price: 14 },
    { name: "Sapiens", category: "Paid", price: 19 },
    { name: "Pride and Prejudice", category: "Free", price: 0 },
    { name: "Dracula", category: "Free", price: 0 },
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      const updated = { ...authUser, fullname: editName };
      setAuthUser(updated);
      localStorage.setItem("Users", JSON.stringify(updated));
      setSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />

      {/* ── Cover + Avatar ──────────────────────────────── */}
      <div className="relative">
        {/* Cover gradient strip */}
        <div
          className="h-52 w-full"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          }}
        >
          {/* decorative circles */}
          <div className="absolute top-6 right-20 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute bottom-4 left-1/3 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute top-10 left-10 w-10 h-10 rounded-full bg-white/10" />
        </div>

        {/* Avatar */}
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
          <div className="relative -mt-16 flex items-end gap-5 pb-4">
            <div className="w-28 h-28 rounded-2xl btn-gradient flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl border-4 border-white dark:border-slate-900 shrink-0">
              {getInitials(authUser.fullname)}
            </div>
            <div className="pb-2 flex-1 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {authUser.fullname}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {authUser.email}
                </p>
                <p className="text-xs text-indigo-500 font-medium mt-0.5">
                  📅 Member since {joinedDate}
                </p>
              </div>
              <Link
                to="/course"
                className="btn-gradient px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md self-start sm:self-auto"
              >
                Browse Books →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats row ──────────────────────────────────── */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ─────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Overview ──────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-indigo-500" /> Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {item.action}{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {item.book}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Progress */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" /> Your Goals
              </h2>
                <div className="space-y-4">
                  {[
                    { label: "Books this month", current: 4, total: 5 },
                    { label: "Pages today", current: 75, total: 100 },
                    { label: "Wishlist explored", current: 6, total: 10 },
                  ].map((goal, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                        <span>{goal.label}</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {goal.current}/{goal.total}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full btn-gradient"
                          style={{ width: `${(goal.current / goal.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-md">
                <div className="text-3xl mb-2">
                  <Star className="w-8 h-8 text-yellow-300" />
                </div>
                <h3 className="font-bold text-lg">Upgrade to Pro</h3>
                <p className="text-indigo-200 text-xs mt-1 mb-4">
                  Unlimited books, offline reading, and exclusive content.
                </p>
                <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Wishlist ──────────────────────────── */}
        {activeTab === "wishlist" && (
          <div className="pb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {wishlist.length} books saved to your wishlist
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((book, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                >
                  <div className="w-12 h-16 rounded-lg btn-gradient flex items-center justify-center text-white text-xl font-extrabold shrink-0">
                    {book.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {book.name}
                    </p>
                    <p
                      className={`text-sm font-bold mt-0.5 ${
                        book.category === "Free" ? "text-green-500" : "gradient-text"
                      }`}
                    >
                      {book.category === "Free" ? "FREE" : `$${book.price}`}
                    </p>
                  </div>
                  <button className="text-yellow-400 hover:text-gray-300 dark:hover:text-gray-600 transition-colors text-xl"
                    title="Remove from wishlist">
                    ★
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Settings ──────────────────────────── */}
        {activeTab === "settings" && (
          <div className="pb-12 max-w-2xl">
            {/* Profile info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" /> Edit Profile
            </h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={authUser.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-600 text-gray-400 outline-none text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gradient px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Change password (UI only) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 mb-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" /> Change Password
            </h2>
              <div className="space-y-4">
                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 transition-all text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => toast.success("Password updated! (demo)")}
                  className="btn-gradient px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm p-6">
              <h2 className="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Danger Zone
            </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Permanently delete your account and all your data. This action
                cannot be undone.
              </p>
              <button
                type="button"
                onClick={() => toast.error("Account deletion is disabled in demo.")}
                className="px-6 py-2.5 rounded-xl border-2 border-red-400 text-red-500 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
