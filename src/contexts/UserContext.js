import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for the user
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to user context
export const UserProvider = ({ children }) => {
  // State to hold the current user information
  const [user, setUser] = useState(null);

  // On component mount, check for user data in local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to set the user data (login) and save to local storage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to clear the user data (logout) and remove from local storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // Clear the token as well
  };

  return (
    // Provide the user state and functions to the component tree
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
