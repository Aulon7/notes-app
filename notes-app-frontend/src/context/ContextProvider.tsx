import { ReactNode, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

interface User {
  firstName: string;
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const loggedInHandler = (user: User, token: string) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user from localStorage
    localStorage.removeItem("token"); // Clear token from localStorage
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, loggedInHandler, logoutHandler, isLoading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
export default ContextProvider;
