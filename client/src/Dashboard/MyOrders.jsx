import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { useInstantTransition } from "framer-motion";
import Swal from "sweetalert2";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../Pages/Loader";


const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useContext(AuthContext)

    useEffect(() => {

        if (user?.email) {
            setLoading(true);
            fetch(`https://assignment-11-server-resturent.vercel.app/orders?email=${user.email}`, { credentials: 'include' })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user listings:", error);
                    setLoading(false);
                });
        }
    }, [user]);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-11-server-resturent.vercel.app/orders/${id}`, {
                    method: "DELETE",
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your listing has been deleted.",
                                icon: "success"
                            });

                            const remainingResturent = orders.filter(resturent => resturent._id !== id);
                            setOrders(remainingResturent);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting listing:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the listing.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (loading) return <Loader></Loader>;
    console.log(orders);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <Helmet>
                <title>Management Resturent || myFood</title>
            </Helmet>
            <h1 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl font-semibold text-center`}>Resturent Management</h1>
            <div className="overflow-x-auto rounded-lg border mt-5 shadow">
                <table className="min-w-full table-auto text-sm text-left whitespace-nowrap">
                    <thead className="bg-base-200  text-base-content">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Action</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.length > 0 ? (

                            orders.map(post => (

                                <tr key={post._id} className="hover:bg-base-100 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={post.foodImage}
                                            alt="roommate"
                                            className="w-16 h-16 object-cover rounded-lg border"
                                        />
                                    </td>
                                    <td className={`${darkMode ? "text-gray-300" : "text-black"} text-lg`}>{post.name}</td>
                                    <td className={`${darkMode ? "text-gray-300" : "text-black"} text-lg`}>{post.price}</td>

                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="btn btn-sm btn-outline btn-error"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No resturent found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;