import { createContext, useState, ReactNode, useEffect } from "react";
import { loginUser, fetchCurrentUser, refreshSession } from "../API/API"; // Import API functions

interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const currentUser = await fetchCurrentUser(token); // Use the API function
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { token, refreshToken } = await loginUser(username, password); // Use the API function
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const currentUser = await fetchCurrentUser(token);
      setUser(currentUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const handleRefreshSession = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const { token } = await refreshSession(refreshToken); // Use the API function
        localStorage.setItem("token", token);

        const currentUser = await fetchCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        console.error("Error refreshing session:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refreshSession: handleRefreshSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
