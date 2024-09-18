import Logout from "../components/Logout";
import { useAuth } from "../Hooks/useAuth";

function UserProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Please log in</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div className="flex items-center mb-6">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Gender:</span> {user.gender}
        </p>
      </div>
      <Logout />
    </div>
  );
}

export default UserProfile;
