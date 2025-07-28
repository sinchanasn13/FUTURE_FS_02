// pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      handleFirebaseError(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google! ✅");
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      handleFirebaseError(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        toast.error("Email is already in use.");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email address.");
        break;
      case "auth/weak-password":
        toast.error("Password is too weak.");
        break;
      case "auth/network-request-failed":
        toast.error("Network error. Please try again.");
        break;
      default:
        toast.error("Signup failed. Please try again.");
        break;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100 text-black px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-orange-300">
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Create Your Account 
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-orange-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-orange-50 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-orange-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-orange-50 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-orange-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-orange-50 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-orange-700">Or sign up with</div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition"
        >
          <FcGoogle size={20} />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        <div className="text-sm text-center text-orange-700">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
