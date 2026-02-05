import { useState } from "react"; 
import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUser, FaPlusCircle, FaUtensils, FaShoppingCart, FaChartLine, FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
    // Sidebar khola naki bondho sheta eikhaner state bolbe
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* --- Sidebar Section --- */}
            <div className={`${isOpen ? "w-64" : "w-0"} bg-green-700 text-white transition-all duration-300 ease-in-out overflow-hidden`}>
                <div className="w-64 p-5 space-y-4">
                    <h2 className="text-xl font-bold border-b border-green-500 pb-2">
                        Dashboard
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaHome /> Back to Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myProfile" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaUser /> My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/analytics" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaChartLine /> Rechart
                            </Link>
                        </li>
                        {/* Apnar baki shob page gulo eikhane thakbe */}
                        <li>
                            <Link to="/dashboard/addFood" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaPlusCircle /> Add Food
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myFood" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaUtensils /> My Food
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myOrders" className="flex items-center gap-2 hover:bg-green-600 p-2 rounded">
                                <FaShoppingCart /> My Orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Main Content Section --- */}
            <div className="flex-1 flex flex-col">
                {/* Dashboard Header/Navbar */}
                <div className="bg-white shadow-md p-4 flex items-center">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-green-700 focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                    <span className="ml-4 font-bold text-gray-700">Restaurant Management</span>
                </div>

                {/* Jahan Page er content gulo show hobe */}
                <div className="p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;