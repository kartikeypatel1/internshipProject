import React from "react";
import { Link } from "react-router-dom";
import { X, Video, Globe, Mail } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Explore: [
      { label: "Home", href: "/" },
      { label: "All Books", href: "/course" },
      { label: "Free Books", href: "/course?category=Free" },
    ],
    Company: [
      { label: "About Us", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Blog", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-sm shadow-md">
                B
              </div>
              <span className="text-xl font-extrabold gradient-text">BookStore</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your go-to destination for books of all genres. Read more, learn
              more, and grow more — one page at a time.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
            {[
              { label: "X (Twitter)", icon: <X className="w-4 h-4" /> },
              { label: "YouTube", icon: <Video className="w-4 h-4" /> },
              { label: "Facebook", icon: <Globe className="w-4 h-4" /> },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-indigo-600 flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-bold text-white">📬 Stay in the loop</p>
            <p className="text-sm text-gray-400">Get new book recommendations every week.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-56 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-indigo-400 text-sm"
            />
            <button className="btn-gradient px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shadow-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} BookStore. All rights reserved.</p>
          <p>Made with ❤️ for book lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
