import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateToken, logout } from "../redux/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You have logged out.");
    navigate("/login");
  };

  const guestLinks = (
    <>
      <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      <Link to="/about" className="text-blue-500 hover:underline">About Us</Link>
      <Link to="/contact" className="text-blue-500 hover:underline">Contact</Link>
      <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
    </>
  );

  const authLinks = (
    <>
      <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
      <Link to="/mywallet" className="text-blue-500 hover:underline">My Wallet</Link>
      <button onClick={handleLogout} className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer p-0">
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
      <div className="space-x-4">{isAuthenticated ? authLinks : guestLinks}</div>
    </nav>
  );
};

export default Navbar;
