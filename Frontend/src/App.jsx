import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/signup" />}
        />
        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

export default App;
