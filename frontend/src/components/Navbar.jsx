import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">AuthApp</Link>
      <div className="space-x-3">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register" className="text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
