import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../utils/authSlice";

function Profile() {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePic: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...formData, id: user._id }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          My Profile
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {user?.profilePic && (
          <div className="flex justify-center mb-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, profilePic: e.target.files[0] })
              }
              className="px-2 py-1 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
