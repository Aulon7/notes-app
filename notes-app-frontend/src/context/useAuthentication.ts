import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext"; // Corrected import path

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuthentication must be used within a ContextProvider");
  }
  return context;
};

export default useAuthentication;
