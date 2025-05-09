import { ReactNode, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

interface User {
  firstName: string;
  email: string;
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
export default ContextProvider;
