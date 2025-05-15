import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen text-gray-700">
      <div className="shadow-lg shadow-gray-600 p-5 w-80 bg-white rounded-lg">
        <h2 className="text-lg text-center font-bold mb-4 ">Register Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">First name</label>
            <input
              type="text"
              value={firstName}
              placeholder="Enter your first name"
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              className="w-full p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your e-mail"
              className="w-full px-3 p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-cyan-500 hover:bg-cyan-600 transition text-white cursor-grab b-rad rounded-xl"
            >
              Register
            </button>

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
