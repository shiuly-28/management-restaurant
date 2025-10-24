import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../Pages/Loader";

const MyOrders = () => {
    const { user, darkMode } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch(`https://assignment-11-server-resturent.vercel.app/resturent-email?email=${user.email}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching orders:", error);
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
                setDeletingId(id);
                
                fetch(`https://assignment-11-server-resturent.vercel.app/resturent/${id}`, {
                    method: "DELETE",
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount || data.acknowledged) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been deleted successfully.",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });

                            const remainingOrders = orders.filter(order => order._id !== id);
                            setOrders(remainingOrders);
                            
                            // Adjust page if current page is empty
                            const totalPages = Math.ceil(remainingOrders.length / itemsPerPage);
                            if (currentPage > totalPages && totalPages > 0) {
                                setCurrentPage(totalPages);
                            }
                        }
                        setDeletingId(null);
                    })
                    .catch(error => {
                        console.error("Error deleting order:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the order.",
                            icon: "error"
                        });
                        setDeletingId(null);
                    });
            }
        });
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <Helmet>
                <title>Management Restaurant || My Orders</title>
            </Helmet>
            
            <h1 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl font-semibold text-center mb-6`}>
                My Orders ({orders.length})
            </h1>

            {orders.length > 0 ? (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border shadow">
                        <table className="min-w-full table-auto text-sm text-left whitespace-nowrap">
                            <thead className="bg-base-200 text-base-content">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {currentItems.map((post, index) => (
                                    <tr key={post._id} className="hover:bg-base-100 transition">
                                        <td className="px-4 py-3 font-semibold">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={post.foodImage}
                                                alt={post.name}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                        </td>
                                        <td className={`${darkMode ? "text-gray-300" : "text-black"} text-lg px-4 py-3`}>
                                            {post.name}
                                        </td>
                                        <td className={`${darkMode ? "text-gray-300" : "text-black"} text-lg px-4 py-3 font-semibold text-green-600`}>
                                            ${post.price}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="badge badge-success text-white">
                                                {post.category || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                {/* View/Details Button */}
                                                <Link
                                                    to={`/foodPage/${post._id}`}
                                                    className="btn btn-sm btn-outline btn-info"
                                                    title="View Details"
                                                >
                                                    View
                                                </Link>

                                                {/* Edit Button */}
                                                <Link
    to={`/dashboard/updateFood/${post._id}`}
    className="btn btn-sm btn-outline btn-warning"
    title="Edit Food"
>
    Edit
</Link>


                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    disabled={deletingId === post._id}
                                                    className={`btn btn-sm btn-outline btn-error ${
                                                        deletingId === post._id ? "loading" : ""
                                                    }`}
                                                    title="Delete Food"
                                                >
                                                    {deletingId === post._id ? "..." : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-outline"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn btn-sm ${
                                        currentPage === index + 1
                                            ? "btn-primary"
                                            : "btn-outline"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl mb-4">No orders found.</p>
                    <p className="text-gray-400">You haven't added any food items yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;