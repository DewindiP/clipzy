import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#181f2a] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[rgba(24,31,42,0.95)] rounded-2xl shadow-glass 
                   px-8 py-10 max-w-[400px] w-full text-white 
                   flex flex-col gap-6"
      >
        <div className="flex justify-center mb-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path d="M24 8c8 0 12 8 12 8s-4 8-12 8-12-8-12-8 4-8 12-8z" fill="#6366f1" />
            <path d="M24 32c-8 0-12-8-12-8s4-8 12-8 12 8 12 8-4 8-12 8z" fill="#6366f1" />
          </svg>
        </div>

        <h2 className="text-center font-bold text-2xl mb-2">
          Sign in to your account
        </h2>

        <div>
          <label
            htmlFor="email"
            className="font-semibold mb-2 block"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="username"
            className="w-full px-4 py-3 rounded-lg 
                       border border-[#232a3b] 
                       bg-[#232a3b] text-white 
                       text-base mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <a
              href="#"
              className="text-primary-500 font-medium text-[0.95rem] no-underline"
            >
              Forgot password?
            </a>
          </div>

          <input
            id="password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg 
                       border border-[#232a3b] 
                       bg-[#232a3b] text-white 
                       text-base mt-1"
          />
        </div>

        {error && (
          <p className="text-[#ffb3b3] text-center m-0">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 
                     text-white font-bold text-[1.1rem] 
                     rounded-lg py-4 mt-2 cursor-pointer"
        >
          Sign in
        </button>

        <div className="text-center mt-4 text-[0.95rem]">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary-500 font-semibold ml-1 no-underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
      
    </div>
  );
}