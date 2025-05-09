import { useContext } from "react";
import { AuthenticationContext } from "./ContextProvider";

interface User {
  firstName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loggedInHandler: (user: User, token: string) => void;
  logoutHandler: () => void;
}

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }

  return context;
};

export default useAuthentication;
