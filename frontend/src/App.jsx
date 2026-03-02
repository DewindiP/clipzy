import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optionally, show a loading spinner here
    return null;
  }

  // If not logged in, redirect to login/signup
  if (!user && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
