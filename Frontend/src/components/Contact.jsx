import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, X, Video, Globe, Loader2, Send } from "lucide-react";

function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon. 📩");
      e.target.reset();
    }, 1200);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@bookstore.com", sub: "We reply within 24h" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (555) 000-1234", sub: "Mon–Fri 9am–6pm" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Mumbai, India", sub: "IST (UTC+5:30)" },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="section-badge mb-4">✉️ &nbsp;Get in Touch</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Let's{" "}
            <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Have questions, suggestions, or feedback? We'd love to hear from
            you. Our team typically responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* ── Contact info sidebar ── */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                <div className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center text-white shrink-0 shadow-md">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-widest">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">{item.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
              <div className="flex gap-3">
                {[
                  { label: "X (Twitter)", icon: <X className="w-4 h-4" /> },
                  { label: "YouTube", icon: <Video className="w-4 h-4" /> },
                  { label: "Facebook", icon: <Globe className="w-4 h-4" /> },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-700 hover:btn-gradient hover:text-white transition-all flex items-center justify-center hover:shadow-md"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us more..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gradient py-3 rounded-xl font-semibold text-sm shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
