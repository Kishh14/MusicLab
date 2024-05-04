import Logout from "./pages/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Route, Routes } from "react-router";
import SocketRoute from "./components/SocketRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<SocketRoute />} />
      </Routes>
    </>
  );
}

export default App;
