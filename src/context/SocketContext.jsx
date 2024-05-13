import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { SOCKET_URL } from "../constants/utils";

/**
 * Create a context to hold the socket instance
 * @type {React.Context<import('../types/Socket').SocketContextType>}
 */

const SocketContext = createContext({
  socket: null,
  isSocketConnected: false,
});

/**
 * Custom hook to access the socket instance from the context
 * @returns {import('../types/Socket').SocketContextType}
 */
const useSocket = () => {
  if (!useContext(SocketContext)) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return useContext(SocketContext);
};

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider = ({ children }) => {
  /**
   * State to store the socket instance
   * @type {[Socket | null, (socket: Socket) => void]}
   */
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Create a new socket instance
    const newSocket = io(SOCKET_URL);

    // Set the socket instance in the state
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the socket server");
      newSocket.emit("authenticate", { token });
    });

    const handleError = (error) => {
      toast.error(error.message);
    };

    newSocket.on("error", handleError);

    newSocket.on("authorized", () => {
      toast.success("User Socket Authenticated");
      console.log("🔥 User Socket Authenticated");
      newSocket.off("error", handleError);
      setIsSocketConnected(true);
    });

    newSocket.on("disconnect", () => {
      toast.error("Socket disconnected");
      console.log("Disconnected from the socket server");
      setIsSocketConnected(false);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => newSocket.close();
  }, [token]);

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket, isSocketConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
