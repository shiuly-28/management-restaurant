import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearchengin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const { darkMode } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        fetch(`https://assignment-11-server-resturent.vercel.app/posts?search=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
            })
            .catch((err) => console.error("Fetch error:", err))
            .finally(() => setLoading(false));
    }, [searchTerm]);

    return (
        <div className="px-4 py-6">
            <Helmet>
                <title>Management Resturent || allFood</title>
            </Helmet>
            <h2 className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold text-3xl`}>
                All Foods ({foods.length})
            </h2>

            <div className="relative mb-6 max-w-md mx-auto shadow-2xl bg-white mt-5 rounded-2xl flex">
                <input
                    type="text"
                    placeholder="Search by food title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full input input-bordered rounded-2xl"
                />
                <div className="absolute top-3 right-4">
                    <FaSearchengin />
                </div>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : foods.length === 0 ? (
                <p className="text-center text-gray-500">No foods found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foods.map((item) => (
                        <div key={item._id} className="p-4 bg-base-100 rounded-xl shadow">
                            <img className="rounded-xl w-full h-48 object-cover" src={item.foodImage} alt={item.name} />
                            <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Category: <span className="text-amber-400 btn rounded-4xl bg-blue-600">{item.category}</span></p>
                            <p className={` text-lg`}>Description: {item.description}</p>
                            <Link
                                to={`/foodPage/${item._id}`}
                                className="inline-block mt-4 bg-blue-600  px-4 py-2 w-full text-center rounded"
                            >
                                See More
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllFoods;
