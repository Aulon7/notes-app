import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { email, password, error } = loginFormData;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginFormData((prevData) => ({
        ...prevData,
        error: "All fields are required!",
      }));
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-700">
      <div className="shadow-lg shadow-gray-600 p-5 w-80 bg-white rounded-lg">
        <h2 className="text-lg text-center font-bold mb-4 ">Login Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">E-mail</label>
            <input
              type="email"
              placeholder="Enter your first name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1.5">Password</label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full p-3 border rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-cyan-500 hover:bg-cyan-600 transition text-white cursor-grab b-rad rounded-xl"
            >
              Login
            </button>
            <p className="text-sm text-center mt-1 text-red-600">{error}</p>
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
