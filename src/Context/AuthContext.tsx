import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

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
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          username,
          password,
          expiresInMins: 30,
        },
        {
          withCredentials: true,
        }
      );

      const { token, refreshToken } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Fetch user info
      const userResponse = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(userResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshSession = async () => {
    try {
      const response = await axios.post(
        "/api/auth/refresh",
        {
          refreshToken: localStorage.getItem("refreshToken"),
          expiresInMins: 30,
        },
        {
          withCredentials: true,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Optionally fetch user info after refreshing the token
      const userResponse = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(userResponse.data);
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshSession, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
