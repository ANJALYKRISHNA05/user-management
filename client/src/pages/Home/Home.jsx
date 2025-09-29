import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Welcome {user ? user.username : "Guest"} 
        </h1>
        <p className="text-gray-600 text-lg">
          This is your home page. Explore and enjoy!
        </p>
      </div>
    </div>
  );
}

export default Home;
