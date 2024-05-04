import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    toast.success("Logged out successfully");
  });

  return (
    <div className="min-h-screen h-full grid place-items-center text-lg">
      Logging out...
    </div>
  );
};

export default Logout;
