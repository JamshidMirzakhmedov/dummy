import { useEffect, useState } from "react";
import { getUsers } from "../API/API";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  const roleBadgeColors: { [key: string]: string } = {
    admin: "bg-red-500 text-white",
    moderator: "bg-yellow-500 text-black",
    user: "bg-green-500 text-white",
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">User List</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-200"
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <div className="text-center">
              <h3 className="font-semibold text-xl">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">
                Company: {user.company.name}, {user.company.department}
              </p>
              <span
                className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-semibold ${
                  roleBadgeColors[user.role]
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
