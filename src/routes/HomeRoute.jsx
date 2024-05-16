import Home from "../pages/Home";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomeRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return;
    navigate("/login");
    toast.error("You need to login first");
  }, [isAuthenticated, navigate]);

  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};

export default HomeRoute;
