import { Link } from "react-router-dom";
import Logo from "./Logo";
import useAuthentication from "../context/useAuthentication";

const Navbar = () => {
  const { user, isLoading, logoutHandler } = useAuthentication();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="mx-6">
        <input
          type="text"
          placeholder="Search for notes"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
        />
      </div>

      <div className="space-x-4">
        {!user ? (
          <>
            {" "}
            <Link
              to={"/login"}
              className="cursor-grab px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="cursor-grab px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user?.firstName}</span>
            <button
              onClick={logoutHandler}
              className="cursor-grab px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
