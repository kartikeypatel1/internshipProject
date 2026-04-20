import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  User,
  BookOpen,
  LogOut,
  Menu,
  Home,
  Info,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Login from "./Login";
import toast from "react-hot-toast";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const el = document.documentElement;
    if (theme === "dark") {
      el.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      el.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/course?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("Users");
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
    setTimeout(() => window.location.reload(), 800);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/course" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-bold text-sm shadow-md">
              B
            </div>
            <span className="text-xl font-extrabold gradient-text hidden sm:block">
              BookStore
            </span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right side ───────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:border-indigo-400 transition-colors">
                <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none bg-transparent text-sm w-28 lg:w-36 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                  placeholder="Search books..."
                />
              </div>
            </form>

            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Auth section */}
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 dark:border-slate-700 hover:border-indigo-400 transition-colors bg-white dark:bg-slate-800"
                >
                  <div className="w-7 h-7 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {getInitials(authUser.fullname)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block max-w-[80px] truncate">
                    {authUser.fullname?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full btn-gradient flex items-center justify-center text-white font-bold">
                          {getInitials(authUser.fullname)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{authUser.fullname}</p>
                          <p className="text-xs text-gray-400 truncate">{authUser.email}</p>
                        </div>
                      </div>
                    </div>
                    {/* Links */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User className="w-4 h-4 text-indigo-500" /> My Profile
                      </Link>
                      <Link
                        to="/course"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-indigo-500" /> Browse Books
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 dark:border-slate-700 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                  className="btn-gradient px-5 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  Login
                </button>
                <Login />
              </div>
            )}

            {/* Mobile hamburger */}
            <div className="dropdown lg:hidden">
              <button tabIndex={0} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <ul tabIndex={0} className="dropdown-content menu p-3 shadow-xl bg-white dark:bg-slate-800 rounded-2xl w-52 mt-2 z-50 border border-gray-100 dark:border-slate-700">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium rounded-xl">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
