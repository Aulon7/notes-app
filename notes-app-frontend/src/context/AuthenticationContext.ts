import { createContext } from "react";

interface User {
  firstName: string;
}

export type AuthContextType = {
  user: User | null;
  loggedInHandler: (user: User, token: string) => void;
  logoutHandler: () => void;
  isLoading?: boolean;
};

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);
