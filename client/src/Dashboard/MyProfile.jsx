import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
    const { user, darkMode } = useContext(AuthContext);

    if (!user) {
        return <p className="text-center mt-10 text-lg">Please login to see your profile.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-6 px-4 sm:px-6 lg:px-0">

            {/* Profile Header */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6`}>
                <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=0D8ABC&color=fff&size=128`}
                    alt={user.displayName || "User Profile"}
                    className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                    <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-2xl sm:text-3xl font-bold`}>
                        {user.displayName || "No Name"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 break-words">{user.email}</p>
                </div>
            </div>

            {/* About Section */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6`}>
                <h3 className={`${darkMode ? "text-gray-300" : "text-black"} text-xl sm:text-2xl font-semibold mb-2`}>
                    About
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This is your personal profile page. You can edit your details anytime. Keep your profile updated for a better personalized experience.
                </p>
            </div>

            {/* Login Info Section */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row justify-between text-gray-700 dark:text-gray-300 gap-6`}>
                <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold text-lg mb-1">Joined On</h4>
                    <p>{new Date(user.metadata.creationTime).toLocaleString()}</p>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold text-lg mb-1">Last Login</h4>
                    <p>{new Date(user.metadata.lastSignInTime).toLocaleString()}</p>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;
