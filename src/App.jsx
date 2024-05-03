import { Route, Routes } from "react-router";
import Home from "./Home"
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App;