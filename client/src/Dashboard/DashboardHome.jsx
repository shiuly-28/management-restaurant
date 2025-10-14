// Dashboard.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const { darkMode } = useContext(AuthContext);

    return (
        <div className="p-6 bg-gray-100 max-w-3xl mx-auto">
            {/* User Info */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <h1 className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold text-2xl`}>
                        Welcome back, {user?.displayName || "User"}!
                    </h1>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-indigo-50 p-5 rounded-lg shadow text-center">
                    <p className="text-indigo-700 font-semibold">Posts</p>
                    <p className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold text-2xl`}>24</p>
                </div>
                <div className="bg-green-50 p-5 rounded-lg shadow text-center">
                    <p className="text-green-700 font-semibold">Followers</p>
                    <p className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold text-2xl`}>1.2K</p>
                </div>
                <div className="bg-yellow-50 p-5 rounded-lg shadow text-center">
                    <p className="text-yellow-700 font-semibold">Notifications</p>
                    <p className={`${darkMode ? "text-gray-300" : "text-black"} font-bold text-2xl`}>7</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-5 rounded-lg shadow mt-6">
                <h2 className={`${darkMode ? "text-gray-300" : "text-black"}font-bold text-2xl`}>Quick Actions</h2>
                <div className="flex flex-wrap mt-3 gap-3">
                    <Link to="/dashboard/addFood" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                        AddFood
                    </Link>
                    <Link to="/dashboard/myFood" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        MyFood
                    </Link>
                    <Link to="/dashboard/myProfile" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
