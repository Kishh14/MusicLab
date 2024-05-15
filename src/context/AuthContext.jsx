import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { generateMinidenticonImg } from "../components/ui/MinidenticonImg";

// Create Context
export const AuthContext = createContext({
  isAuthenticated: false,
  token: "",
  user: {
    id: "",
    email: "",
    username: "",
    profile_img: "",
  },
  login: (user) => {},
  logout: () => {},
});

// Hook
export const useAuth = () => {
  if (!React.useContext(AuthContext)) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return React.useContext(AuthContext);
};

function isTokenValid() {
  return (
    localStorage.token &&
    Date.now() < JSON.parse(atob(localStorage.token.split(".")[1])).exp * 1000
  );
}

// Create Context Provider
export const AuthProvider = ({ children }) => {
  const isValid = isTokenValid();
  const [isAuthenticated, setIsAuthenticated] = useState(isValid);
  const [token, setToken] = useState(isValid ? localStorage.token : null);
  const [user, setUser] = useState(
    isValid ? JSON.parse(localStorage.user) : null
  );

  const navigate = useNavigate();

  function login(user) {
    user = { ...user, profile_img: generateMinidenticonImg(user.id) };
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser({ ...user });
    setToken(user.token);
  }

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  useEffect(() => {
    if (user) {
      setUser((prev) => ({ ...prev, profile_img: user.profile_img }));
    }

    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get("/auth/verify")
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(JSON.parse(localStorage.getItem("user")));
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = "";
        setIsAuthenticated(false);
        setUser(null);
        toast.warning("Session Expired");
        navigate("/login");
      });
  }, [isAuthenticated]);

  // Value to be provided
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
