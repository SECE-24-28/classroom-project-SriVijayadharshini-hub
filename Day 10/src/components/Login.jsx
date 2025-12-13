import { useState } from "react";

function Login({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    // Pass email to parent to determine admin/user
    onLogin(email, email.includes("admin") ? "Admin" : "User");
  };

  const handleUserDemoLogin = () => {
    setEmail("demo@rechargeapp.com");
    setPassword("demo123");
  };

  const handleAdminDemoLogin = () => {
    setEmail("admin@rechargeapp.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">MobileRecharge</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Email Address"
              />
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 mb-4"
            >
              Sign In
            </button>

            {/* Demo Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleUserDemoLogin}
                className="w-full bg-gray-900 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 border border-gray-700"
              >
                Use User Demo Account
              </button>
              
              <button
                type="button"
                onClick={handleAdminDemoLogin}
                className="w-full bg-blue-900/30 text-blue-300 py-3 rounded-lg font-semibold hover:bg-blue-800/30 transition-all duration-300 border border-blue-700"
              >
                Use Admin Demo Account
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-gray-300 font-semibold hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-4 text-center space-y-1">
            <p className="text-xs text-gray-500">
              User Demo: demo@rechargeapp.com / demo123
            </p>
            <p className="text-xs text-blue-400">
              Admin Demo: admin@rechargeapp.com / demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;