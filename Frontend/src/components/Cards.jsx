import React from "react";

function Cards({ item }) {
  const isFree = item.category === "Free";

  return (
    <div className="p-3">
      <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 card-shine cursor-pointer">
        {/* ── FREE ribbon ── */}
        {isFree && (
          <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            FREE
          </div>
        )}

        {/* ── Book cover image ── */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x560/6366f1/ffffff?text=${encodeURIComponent(item.name.charAt(0))}`;
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              className={`w-full py-2 rounded-xl font-semibold text-sm text-white ${
                isFree
                  ? "bg-green-500 hover:bg-green-400"
                  : "btn-gradient"
              } transition-colors`}
            >
              {isFree ? "Get Free →" : "Buy Now →"}
            </button>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 flex-1">
              {item.name}
            </h3>
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                isFree
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
              }`}
            >
              {item.category}
            </span>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed mb-3">
            {item.title}
          </p>

          <div className="flex items-center justify-between">
            <span
              className={`text-lg font-bold ${
                isFree
                  ? "text-green-500"
                  : "gradient-text"
              }`}
            >
              {isFree ? "FREE" : `$${item.price}`}
            </span>
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              ★★★★★
              <span className="text-gray-400 dark:text-gray-500">(4.8)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
