import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth(); // Accessing isLoading from useAuth

  if (isLoading) {
    // Still checking authentication, show loading indicator
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (!user) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the nested route
  return <Outlet />;
};

export default ProtectedRoute;
