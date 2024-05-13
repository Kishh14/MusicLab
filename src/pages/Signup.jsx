import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        // toast is not initialized yet
        toast.info("You are already logged in");
      }, 100);
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("/auth/register", formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate(redirect ? "/login?redirect=" + redirect : "/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[600px] m-10 md:m-0 md:p-8 p-4 rounded-lg shadow-md backdrop-blur-lg backdrop-filter bg-opacity-50"
      >
        <div>
          <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded-md"
          >
            Sign Up
          </button>
          <div className="mt-3">
            <p>
              Already have an account?{" "}
              <Link
                className="font-bold text-gray-600 hover:text-gray-800"
                to={redirect ? "/login?redirect=" + redirect : "/login"}
              >
                Login{" "}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
