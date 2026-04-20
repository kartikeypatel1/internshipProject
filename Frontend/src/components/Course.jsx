import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  const filtered = book.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    { id: "All", label: "All Books", icon: "📚" },
    { id: "Free", label: "Free", icon: "🆓" },
    { id: "Paid", label: "Premium", icon: "💎" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* ── Page header ─── */}
      <div
        className="pt-32 pb-16 text-center relative overflow-hidden"
      >
        <div className="dark:hidden absolute inset-0 opacity-100" style={{ background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%)" }} />
        <div className="hidden dark:block absolute inset-0" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)" }} />

        {/* Blob decorations */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-screen-2xl container mx-auto md:px-20 px-4">
          <div className="section-badge mb-4">📚 &nbsp;Full Library</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explore Our{" "}
            <span className="gradient-text">Book Collection</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg mb-8">
            Browse all books across every genre. Filter by category or search
            for your next great read.
          </p>
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
        {/* Search result banner */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl flex items-center justify-between">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium text-sm">
              🔍 Showing results for: "<strong>{searchQuery}</strong>"
            </span>
            <Link to="/course" className="text-xs text-gray-400 hover:text-gray-600 underline">
              Clear search
            </Link>
          </div>
        )}

        {/* Category filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
                activeCategory === cat.id
                  ? "btn-gradient border-transparent shadow-md text-white"
                  : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          {/* Book count */}
          <span className="ml-auto flex items-center text-sm text-gray-400 dark:text-gray-500">
            {loading ? "Loading..." : `${filtered.length} book${filtered.length !== 1 ? "s" : ""} found`}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
                <div className="h-56 skeleton-shimmer" />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded skeleton-shimmer w-3/4" />
                  <div className="h-3 rounded skeleton-shimmer w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">🔍</div>
            <p className="text-xl font-bold text-gray-700 dark:text-white">No books found</p>
            <p className="text-gray-400 mt-2 text-sm">Try changing the filter or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pb-16">
            {filtered.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
