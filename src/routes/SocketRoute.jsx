import { useEffect } from "react";
import { SocketProvider } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";

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
