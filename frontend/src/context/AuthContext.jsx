import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then(res => setUser({ ...res.data, token }))
        .catch(() => setUser({ token }));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    API.get("/auth/me")
      .then(res => setUser({ ...res.data, token: data.token }))
      .catch(() => setUser(data));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);