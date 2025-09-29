import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser, deleteUser, addUser } from "../../utils/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ username: "", email: "", password: "" });
  const [deleteUserId, setDeleteUserId] = useState(null); 

 
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(getAllUsers( search ));
    }, 100);
    return () => clearTimeout(delay);
  }, [search, dispatch]);


  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editingUserId, ...editForm }));
    setEditingUserId(null);
    setEditForm({ username: "", email: "" });
  };

 
  const confirmDelete = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
      setDeleteUserId(null);
    }
  };

 
  const handleAddUser = () => {
    dispatch(addUser(newUserForm));
    setShowAddForm(false);
    setNewUserForm({ username: "", email: "", password: "" });
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-400 focus:outline-none pr-10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full sm:w-auto"
        >
          + Add
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUserForm.username}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, username: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserForm.email}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, email: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserForm.password}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, password: e.target.value })
              }
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border rounded-md p-4 gap-3 hover:shadow"
          >
            <div className="flex items-center gap-3 flex-1">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                {editingUserId === user._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="border px-2 py-1 rounded-md w-full"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </div>
                ) : (
                  <p className="font-medium text-gray-800 break-words">
                    {user.username}{" "}
                    <span className="text-gray-500">({user.email})</span>
                    {user.isAdmin && (
                      <span className="ml-2 text-xs bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {editingUserId === user._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 w-full sm:w-auto"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteUserId(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

     
      {deleteUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
