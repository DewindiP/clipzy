import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/auth/signup", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 max-w-[400px] w-full text-black dark:text-white flex flex-col gap-4 font-montserrat"
      >
        <div className="flex justify-center mb-4">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="#ff6a88" />
            <circle cx="24" cy="24" r="10" fill="#fff" />
          </svg>
        </div>
        <h2 className="text-center font-bold text-2xl mb-2">Create your account</h2>
        <div>
          <label htmlFor="username" className="font-semibold mb-2 block">Username</label>
          <input
            id="username"
            type="text"
            placeholder=""
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
            autoComplete="username"
            className="w-full py-3 px-4 rounded-lg border border-[#232a3b] bg-[#232a3b] text-white text-base mt-1 font-montserrat"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold mb-2 block">Email address</label>
          <input
            id="email"
            type="email"
            placeholder=""
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
            className="w-full py-3 px-4 rounded-lg border border-[#232a3b] bg-[#232a3b] text-white text-base mt-1 font-montserrat"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold mb-2 block">Password</label>
          <input
            id="password"
            type="password"
            placeholder=""
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="new-password"
            className="w-full py-3 px-4 rounded-lg border border-[#232a3b] bg-[#232a3b] text-white text-base mt-1 font-montserrat"
          />
        </div>
        {error && <p className="text-[#ffb3b3] text-center m-0">{error}</p>}
        <button
          type="submit"
          className="bg-[#ff6a88] hover:bg-[#ff4f7a] text-white font-bold text-[1.1rem] border-none rounded-lg py-[0.9rem] mt-2 cursor-pointer transition-colors duration-200 font-montserrat"
        >
          Sign up
        </button>
        <div className="text-center mt-4 text-[0.95rem]">
          Already have an account?
          <Link to="/login" className="text-[#ff6a88] font-semibold ml-1 no-underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}