import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 shadow">
      <Link to="/" className="text-xl font-bold text-indigo-500">
        Todo App
      </Link>

      {user && <span className="text-gray-300">
             Welcome <span className="text-red-600 uppercase">{user.name}</span>
            </span>
}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "text-white"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "text-white"
              }
            >
              Add Todo
            </NavLink>

            

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition"
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