import { createContext, ReactNode, useState, useEffect } from "react";
import { AuthContextType } from "./useAuthentication";

interface User {
  firstName: string;
  email: string;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for token and user data in localStorage on mount
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loggedInHandler = (user: User, token: string) => {
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, loggedInHandler, logoutHandler }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext };
export default ContextProvider;
