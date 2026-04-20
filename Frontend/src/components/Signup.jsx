import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const [, setAuthUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password", "");

  // Password strength helper
  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500", "bg-emerald-500"];
    return { score, label: labels[score] || "", color: colors[score] || "" };
  };
  const strength = getStrength(passwordValue);

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Welcome to BookStore! 🎉");
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          setAuthUser(res.data.user);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex dark:bg-slate-900">
      {/* ── Left panel (decorative) ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)" }}
      >
        {/* blobs */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 text-white text-center">
          <div className="text-7xl mb-6 float-anim">📚</div>
          <h2 className="text-4xl font-extrabold mb-4">Join BookStore</h2>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-sm">
            Get access to thousands of books. Read for free, discover new
            genres, and track your reading journey.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { value: "10K+", label: "Books" },
              { value: "Free", label: "Access" },
              { value: "50K+", label: "Readers" },
              { value: "4.9★", label: "Rating" },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-indigo-100 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                B
              </div>
              <span className="text-2xl font-extrabold gradient-text">BookStore</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Create account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Start your reading journey today — it's free!
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all text-sm ${
                    errors.fullname
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900"
                      : "border-gray-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
                  }`}
                  {...register("fullname", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                />
                {errors.fullname && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    ⚠️ {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all text-sm ${
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900"
                      : "border-gray-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address (e.g. name@example.com)",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    ⚠️ {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all text-sm ${
                    errors.password
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900"
                      : "border-gray-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    validate: (val) =>
                      /[A-Za-z]/.test(val) || "Password must contain at least one letter",
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    ⚠️ {errors.password.message}
                  </p>
                )}
                {/* Strength bar */}
                {passwordValue && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.color : "bg-gray-200 dark:bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Strength:{" "}
                      <span
                        className={`font-semibold ${
                          strength.score <= 1 ? "text-red-500" :
                          strength.score <= 2 ? "text-orange-400" :
                          strength.score <= 3 ? "text-yellow-500" :
                          "text-green-500"
                        }`}
                      >
                        {strength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-gradient py-3 rounded-xl font-semibold shadow-lg text-sm mt-2"
              >
                Create Account →
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Log in
              </button>
              <Login />
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing up you agree to our{" "}
            <a href="#" className="underline hover:text-indigo-500">Terms</a> and{" "}
            <a href="#" className="underline hover:text-indigo-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
