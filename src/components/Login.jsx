import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const initialFormData ={
        email: '',
        password: '',
    }
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
    setFormData(initialFormData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 m-10 md:m-0 rounded-lg shadow-md backdrop-blur-lg backdrop-filter bg-opacity-50">
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
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
          className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 rounded-md"
        >
          Login
        </button>
        <div className='flex flex-wrap justify-between mt-3'>
      
            <p>New User? <Link className='font-bold text-gray-600 hover:text-gray-800' to="/" >Sign Up </Link></p>
  
            <p className='font-bold text-gray-600 hover:text-gray-800'>Forgot password?</p>
       
        </div>
      
      </form>
    </div>
  );
};

export default Login;
