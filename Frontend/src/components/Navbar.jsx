import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-5">
        <Link to="/" className="font-bold text-xl text-blue-700">StraySafe</Link>
        <Link to="/report" className="hover:text-blue-600 transition">Submit Report</Link>
        <Link to="/track/lookup" className="hover:text-blue-600 transition">Track Report</Link>
        {user && user.role === "ngo" && (
          <Link to="/ngo/dashboard" className="hover:text-blue-600 transition">NGO Dashboard</Link>
        )}
        {user && user.role === "volunteer" && (
          <Link to="/volunteer/dashboard" className="hover:text-blue-600 transition">Volunteer Dashboard</Link>
        )}
      </div>
      <div>
        {!user && <Link to="/ngo/login" className="hover:text-blue-700">NGO Login</Link>}
        {user && (
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="ml-4 text-red-500 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;