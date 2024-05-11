import { SocketProvider } from "../context/SocketContext";
import Home from "../pages/Home";

const HomeRoute = () => {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};

export default HomeRoute;
