import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-900 text-gray-100 px-4 sm:px-8 py-3 flex flex-wrap justify-between items-center shadow-lg">

      <div className="text-xl sm:text-2xl font-extrabold tracking-wide mb-2 sm:mb-0">
        <Link to="/" className="hover:text-indigo-400 transition">
          AuthApp
        </Link>
      </div>


      <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-sm sm:text-base">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-green-600 hover:bg-green-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-medium hidden sm:inline">Hi... {user.username}</span>

          {user.isAdmin ? (
  <>
    <Link
      to="/dashboard"
      className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
    >
      Dashboard
    </Link>
    <Link
      to="/profile"
      className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-teal-600 hover:bg-teal-700 transition"
    >
      Profile
    </Link>
  </>
) : (
  <>
    <Link
      to="/"
      className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
    >
      Home
    </Link>
    <Link
      to="/profile"
      className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-teal-600 hover:bg-teal-700 transition"
    >
      Profile
    </Link>
  </>
)}


            <button
              onClick={() => dispatch(logout())}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
