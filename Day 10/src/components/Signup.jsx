import { useState } from "react";

function Signup({ onSwitch, onSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "user" // "user" or "admin"
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accountType: type
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, accountType } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return false;
    }

    // Admin email validation
    if (accountType === "admin" && !email.includes("@admin.com")) {
      setError("Admin accounts must use @admin.com email domain");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Pass all data to parent
      onSignup(formData.email, formData.name, formData.accountType);
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoData = () => {
    if (formData.accountType === "admin") {
      setFormData({
        ...formData,
        name: "Demo Admin",
        email: "admin@rechargeapp.com",
        password: "demo123",
        confirmPassword: "demo123"
      });
    } else {
      setFormData({
        ...formData,
        name: "Demo User",
        email: "demo@rechargeapp.com",
        password: "demo123",
        confirmPassword: "demo123"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      {/* Signup Card */}
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">MobileRecharge</h1>
            <p className="text-gray-400">Create your account</p>
          </div>

          {/* Account Type Selection */}
          <div className="mb-6">
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                onClick={() => handleAccountTypeChange("user")}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.accountType === "user"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
                }`}
              >
                User Account
              </button>
              <button
                type="button"
                onClick={() => handleAccountTypeChange("admin")}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.accountType === "admin"
                    ? "bg-blue-900/30 border-blue-700 text-blue-300"
                    : "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
                }`}
              >
                Admin Account
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {formData.accountType === "admin" 
                ? "Admin accounts have access to dashboard and management features"
                : "User accounts can recharge and view history"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup}>
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder={
                  formData.accountType === "admin" 
                    ? "Admin Email (e.g., name@admin.com)" 
                    : "Email Address"
                }
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Password (min. 6 characters)"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Confirm Password"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4 flex items-center justify-center ${
                formData.accountType === "admin"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating {formData.accountType === "admin" ? "Admin" : "User"} Account...
                </>
              ) : (
                `Sign Up as ${formData.accountType === "admin" ? "Admin" : "User"}`
              )}
            </button>

            {/* Demo Button */}
            <button
              type="button"
              onClick={fillDemoData}
              className="w-full bg-gray-900 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 border border-gray-700"
            >
              Fill {formData.accountType === "admin" ? "Admin" : "User"} Demo Data
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-gray-300 font-semibold hover:text-white transition-colors"
              >
                Login
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              {formData.accountType === "admin"
                ? "Demo Admin: admin@rechargeapp.com / demo123"
                : "Demo User: demo@rechargeapp.com / demo123"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;