import { useState } from "react";
import logback from "/src/assets/logback.jpg";

function Signup({ onSwitch, onSignup }) {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state
  const [errors, setErrors] = useState({});

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form
  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = "Name is required";
      valid = false;
    } else if (name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
      valid = false;
    }

    if (!email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  // Handle signup
  const handleSignup = () => {
    if (validateForm()) {
      onSignup(); // proceed to parent's signup logic
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${logback})` }}
    >
      <div className="bg-white shadow-2xl rounded-xl p-10 w-[400px]">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className={`w-full mb-1 p-3 border rounded-lg ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className={`w-full mb-1 p-3 border rounded-lg ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className={`w-full mb-1 p-3 border rounded-lg ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-purple-700 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
