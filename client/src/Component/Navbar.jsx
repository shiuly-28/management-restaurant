import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logoImage from '../assets/navLogo.png';

// react-icons থেকে প্রয়োজনীয় আইকন ইমপোর্ট
import { FaHome, FaUtensils, FaImages, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logged out successfully"))
            .catch((error) => toast.error(error.message));
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "text-secondary font-semibold flex items-center gap-2" : "text-green-700 hover:text-green-700 flex items-center gap-2"}
                >
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allFoods"
                    className={({ isActive }) => isActive ? "text-secondary font-semibold flex items-center gap-2" : "text-green-700 hover:text-green-700 flex items-center gap-2"}
                >
                    <FaUtensils /> AllFoods
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/gallery"
                    className={({ isActive }) => isActive ? "text-secondary font-semibold flex items-center gap-2" : "text-green-700 hover:text-green-700 flex items-center gap-2"}
                >
                    <FaImages /> Gallery
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "text-secondary font-semibold flex items-center gap-2" : "text-green-700 hover:text-green-700 flex items-center gap-2"}
                    >
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-blue-200 rounded-2xl shadow-sm sticky top-0 z-50">
            <div className="navbar max-w-screen-xl mx-auto px-4 flex justify-between items-center">

                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img className="h-10 w-10 rounded-2xl" src={logoImage} alt="logo" />
                        <span className="text-lg lg:text-xl font-bold text-green-700">Management Restaurant</span>
                    </Link>
                </div>

                {/* Center: Desktop Nav Links */}
                <div className="hidden lg:flex justify-center flex-1">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>

                {/* Right: Theme Toggle + Auth */}
                <div className="flex items-center gap-3">

                    {/* Theme toggle */}
                    <input onChange={handleToggle} type="checkbox" defaultChecked={theme === "dark"} className="toggle toggle-warning" />

                    {/* Desktop: Login/Register */}
                    {
                        !user && (
                            <div className="hidden lg:flex gap-2">
                                <Link to="/login" className="btn btn-outline btn-sm text-green-700">Login</Link>
                                <Link to="/register" className="btn btn-outline btn-sm text-green-700">Register</Link>
                            </div>
                        )
                    }

                    {/* If logged in: Avatar + Logout */}
                    {
                        user && (
                            <>
                                <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full ring-2 ring-green-600" />
                                </div>
                                <button onClick={handleLogout} className="btn btn-outline btn-sm text-green-700 hover:btn-success">Logout</button>
                            </>
                        )
                    }

                    {/* Mobile: Dropdown Menu */}
                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content mt-3 z-[999] p-3 shadow bg-base-100 rounded-box w-56 space-y-2">
                            {navLinks}

                            {/* Mobile: Login/Register */}
                            {
                                !user && (
                                    <>
                                        <li className="lg:hidden">
                                            <Link to="/login" className="btn btn-outline btn-sm text-green-700 w-full">Login</Link>
                                        </li>
                                        <li className="lg:hidden">
                                            <Link to="/register" className="btn btn-outline btn-sm text-green-700 w-full">Register</Link>
                                        </li>
                                    </>
                                )
                            }

                            {/* Mobile: Avatar + Logout */}
                            {
                                user && (
                                    <>
                                        <li className="lg:hidden mt-2 flex items-center gap-2">
                                            <img src={user.photoURL} className="w-8 h-8 rounded-full ring-2 ring-green-500" alt="user" />
                                            <span>{user.displayName}</span>
                                        </li>
                                        <li className="lg:hidden">
                                            <button onClick={handleLogout} className="btn btn-sm btn-outline text-green-700 w-full">Logout</button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
