"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImage: string;
  backgroundImage: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch user data from the backend
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user"); //  !!!!! Replace with your backend endpoint
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    }
  };

  // Fetching
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// contexts/UserContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import { fetchUserData, updateUserData } from "../api/user";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   // Initialize user data
//   useEffect(() => {
//     const initializeUser = async () => {
//       try {
//         // Check localStorage first
//         const localUser = localStorage.getItem("user");
//         if (localUser) {
//           setUser(JSON.parse(localUser));
//         }

//         // Then fetch fresh data if stale (>5 minutes old)
//         const lastFetch = localStorage.getItem("lastUserFetch");
//         if (!lastFetch || Date.now() - lastFetch > 300000) {
//           // 5 minutes
//           const freshUser = await fetchUserData();
//           setUser(freshUser);
//           localStorage.setItem("user", JSON.stringify(freshUser));
//           localStorage.setItem("lastUserFetch", Date.now());
//         }
//       } catch (error) {
//         console.error("Failed to load user:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeUser();
//   }, []);

//   // Update function that syncs with backend
//   const updateUser = async (updates) => {
//     try {
//       // Optimistic UI update
//       const updatedUser = { ...user, ...updates };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // Sync with backend
//       await updateUserData(updates);
//       localStorage.setItem("lastUserFetch", Date.now());
//     } catch (error) {
//       // Revert on error
//       setUser(user);
//       throw error;
//     }
//   };

//   // Function to force refresh from backend
//   const refreshUser = async () => {
//     setLoading(true);
//     try {
//       const freshUser = await fetchUserData();
//       setUser(freshUser);
//       localStorage.setItem("user", JSON.stringify(freshUser));
//       localStorage.setItem("lastUserFetch", Date.now());
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, loading, updateUser, refreshUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUser = () => useContext(UserContext);
