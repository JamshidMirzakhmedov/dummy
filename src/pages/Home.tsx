import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaPencilAlt, FaListUl } from "react-icons/fa";
import { useAuth } from "../Hooks/useAuth";

function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to Our Dashboard,{" "}
          <span className="text-red-700">{user?.firstName}</span>!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
          Manage all sections of the app here:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full max-w-5xl">
        <Link
          to="/products"
          className="bg-blue-500 text-white p-6 sm:p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
        >
          <FaBox size={30} className="mb-2 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
            Products
          </h2>
          <p className="text-base sm:text-lg">View and manage products.</p>
        </Link>
        <Link
          to="/users"
          className="bg-green-500 text-white p-6 sm:p-8 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
        >
          <FaUsers size={30} className="mb-2 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
            Users
          </h2>
          <p className="text-base sm:text-lg">
            Manage user accounts and details.
          </p>
        </Link>
        <Link
          to="/posts"
          className="bg-yellow-500 text-white p-6 sm:p-8 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
        >
          <FaPencilAlt size={30} className="mb-2 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
            Posts
          </h2>
          <p className="text-base sm:text-lg">Create and manage posts.</p>
        </Link>
        <Link
          to="/todos"
          className="bg-red-500 text-white p-6 sm:p-8 rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
        >
          <FaListUl size={30} className="mb-2 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
            Todos
          </h2>
          <p className="text-base sm:text-lg">Track and manage tasks.</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
