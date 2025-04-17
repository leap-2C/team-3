"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

type UserType = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileId?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
};

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const cookieData = Cookies.get("user");
      if (cookieData) {
        try {
          const parsed = JSON.parse(cookieData);
          setUser(parsed);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.warn("No user cookie found");
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
