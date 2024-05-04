import React, { useEffect } from "react";
import { SocketProvider } from "../context/SocketContext";
import Home from "../Home";
import { useAuth } from "../context/AuthContext";

const SocketRoute = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};

export default SocketRoute;
