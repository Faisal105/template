import React, { createContext, useContext, useState } from "react";

// Create a context for the user
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to user context
export const UserProvider = ({ children }) => {
  // State to hold the current user information
  const [user, setUser] = useState(null);

  // Function to set the user data (login)
  const login = (userData) => setUser(userData);
  
  // Function to clear the user data (logout)
  const logout = () => setUser(null);

  return (
    // Provide the user state and functions to the component tree
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
