import React, { useState } from "react";
import api from '../../utils/api'
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    shops: ["", "", ""], 
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one number, and one special character.";
    }
    const uniqueShops = new Set(formData.shops);
    if (formData.shops.some((shop) => !shop.trim())) {
      newErrors.shops = "All shop names must be filled.";
    } else if (uniqueShops.size !== formData.shops.length) {
      newErrors.shops = "Shop names must be unique.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const response = await api.post("/signup", formData);
      setMessage(response.data.message);
      setErrors({});
      navigate("/");
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Something went wrong." });
    }
  };

  const handleShopChange = (index, value) => {
    const updatedShops = [...formData.shops];
    updatedShops[index] = value;
    setFormData((prev) => ({ ...prev, shops: updatedShops }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8  ">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Signup</h2>

        {message && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
            {message}
          </div>
        )}

        {errors.api && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
            {errors.api}
          </div>
        )}

<form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Shop Inputs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Shop Names (3 unique required)
          </label>
          <div className="space-y-2">
            {formData.shops.map((shop, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Shop ${index + 1}`}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.shops ? "border-red-500" : "border-gray-300"
                }`}
                value={shop}
                onChange={(e) => handleShopChange(index, e.target.value)}
              />
            ))}
          </div>
          {errors.shops && (
            <p className="text-red-500 text-sm mt-1">{errors.shops}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline font-medium"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </p>
      </form>
      </div>
       
    </div>
  );
};

export default Signup;