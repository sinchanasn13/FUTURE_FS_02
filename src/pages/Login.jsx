import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

const errorMessages = {
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-email": "Please enter a valid email.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  default: "Something went wrong. Please try again.",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(errorMessages[error.code] || errorMessages.default);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(errorMessages[error.code] || errorMessages.default);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(errorMessages[error.code] || errorMessages.default);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff8f0] px-4 text-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-orange-200 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-orange-500">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-orange-200"
              } rounded-lg bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-orange-200"
                } rounded-lg bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-orange-500 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-sm text-gray-500">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition"
          disabled={loading}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Signup Link */}
        <div className="text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-500 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
