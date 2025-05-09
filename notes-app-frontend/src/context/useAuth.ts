import { useContext } from "react";
import { AuthenticationContext } from "./ContextProvider";

const useAuthentication = () => useContext(AuthenticationContext);

export default useAuthentication;
