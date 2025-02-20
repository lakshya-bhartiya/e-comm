import { createContext, useContext, useState,} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Function to login (store token)
  const login = (userToken) => {
    localStorage.setItem("token", userToken); // Store token in localStorage
    setToken(userToken);
  };

  // Function to logout (remove token)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Check if user is logged in
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
