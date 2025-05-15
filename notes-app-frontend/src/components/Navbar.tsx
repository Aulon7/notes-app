import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import useAuthentication from "../context/useAuthentication";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

interface NavBarProps {
  queryHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query?: string;
}

const Navbar = ({ queryHandler, query }: NavBarProps) => {
  const { user, isLoading, logoutHandler } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          {user && queryHandler && (
            <div className="hidden md:flex items-center flex-1 justify-center">
              <input
                type="text"
                value={query || ""}
                onChange={queryHandler}
                placeholder="Search for notes"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
              />
            </div>
          )}

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700">
                  Welcome, {user?.firstName}
                </span>
                <button
                  onClick={logoutHandler}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition cursor-grab flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile search bar */}
          {user && queryHandler && (
            <div className="px-4 py-2">
              <input
                type="text"
                value={query || ""}
                onChange={queryHandler}
                placeholder="Search for notes"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
              />
            </div>
          )}

          {/* Mobile menu items */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="px-4 py-2 text-gray-700">
                Welcome, {user?.firstName}
              </div>
              <button
                onClick={logoutHandler}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition cursor-grab"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
