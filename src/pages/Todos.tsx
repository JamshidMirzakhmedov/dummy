import { useEffect, useState } from "react";
import { getTodos } from "../API/API";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Todos = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response.data.todos);
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

  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Todos</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-200"
          >
            <h3 className="font-semibold text-xl mb-2">{todo.todo}</h3>
            <div className="flex items-center">
              {todo.completed ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              <p
                className={`font-medium ${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
