import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../utils/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [localError, setLocalError] = useState(""); 

  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setSuccess("Account created successfully!"); 
      setTimeout(() => {
        if (user.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500); 
    }
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setLocalError(""); 
    setSuccess("");

  
    if (formData.password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(registerUser(formData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-teal-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-teal-700 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          {(error || localError) && (
            <p className="text-red-600 text-sm text-center font-medium">
              {localError || error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center font-medium">
              {success}
            </p>
          )}

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              placeholder="Your username"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="you@example.com"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              placeholder="••••••••"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="••••••••"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
