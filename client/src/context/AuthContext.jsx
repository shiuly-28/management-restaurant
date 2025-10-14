import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    // এখানে তুমি Firebase Auth বা অন্য কোনো auth logic বসাতে পারো
    useEffect(() => {
        // উদাহরণ: ইউজার লগিন চেক করা
        const loggedInUser = { email: "user@example.com" }; // demo data
        setUser(loggedInUser);
    }, []);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <AuthContext.Provider value={{ user, darkMode, toggleDarkMode }}>
            {children}
        </AuthContext.Provider>
    );
};
