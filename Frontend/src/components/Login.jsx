import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Welcome back! 👋");
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          setAuthUser(res.data.user);
          document.getElementById("my_modal_3").close();
          setTimeout(() => window.location.reload(), 800);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-800 dark:text-white rounded-2xl p-0 overflow-hidden max-w-sm w-full">
          {/* Header gradient bar */}
          <div
            className="h-2 w-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)" }}
          />

          <div className="p-8">
            {/* Close button */}
            <button
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              onClick={() => document.getElementById("my_modal_3").close()}
              type="button"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center text-white font-extrabold shadow-md">
                  B
                </div>
                <span className="text-xl font-extrabold gradient-text">BookStore</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Welcome back
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Sign in to continue reading
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all text-sm ${
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900"
                      : "border-gray-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
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
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <a href="#" className="text-xs text-indigo-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all text-sm ${
                    errors.password
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900"
                      : "border-gray-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    ⚠️ {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-gradient py-3 rounded-xl font-semibold shadow-lg text-sm"
              >
                Sign In →
              </button>
            </form>

            <p className="text-center text-sm mt-5 text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
        {/* Backdrop close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Login;
