import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Appbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="border-b flex justify-between items-center px-6 py-3">
      <Link
        to="/"
        className="text-2xl font-bold font-serif text-gray-900 hover:text-black"
      >
        WhiteSpace
      </Link>

      {token ? (
        <div className="flex items-center space-x-4">
          <Link to="/blogs">
            <p className="font-medium text-gray-800 hover:underline">Blogs</p>
          </Link>

          <Link to="/publish">
            <button className="bg-green-700 hover:bg-green-800 text-white font-medium rounded-full text-sm px-4 py-2">
              New
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-md font-semibold text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/signin">
          <button className="bg-black hover:bg-gray-800 text-white font-medium rounded-md text-sm px-4 py-2">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default Appbar;
