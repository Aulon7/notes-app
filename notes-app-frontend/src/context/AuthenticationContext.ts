import { createContext } from "react";

interface User {
  firstName: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  loggedInHandler: (user: User, token: string) => void;
  logoutHandler: () => void;
};

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);
