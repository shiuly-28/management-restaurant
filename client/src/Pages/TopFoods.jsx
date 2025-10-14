import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { AuthContext } from "../context/AuthContext";

const TopFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useContext(AuthContext);

    useEffect(() => {
        fetch("https://assignment-11-server-resturent.vercel.app/resturent")
            .then((res) => res.json())
            .then((data) => {
                const allFoods = Array.isArray(data) ? data : data.foods || [];
                const sortedFoods = allFoods
                    .sort((a, b) => b.purchaseCount - a.purchaseCount)
                    .slice(0, 8);
                setFoods(sortedFoods);
            })
            .catch((err) => console.error("Fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div>
            <motion.h2
                className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl text-center font-bold`}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Total Foods: {foods.length}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 px-4">
                {foods.map((item, idx) => (
                    <motion.div
                        key={item._id}
                        className="p-4 bg-base-100 rounded-xl shadow flex flex-col justify-between"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-1">
                            <img className="rounded-xl" src={item.foodImage} alt={item.name} />
                            <h3 className="text-xl font-semibold mt-5">{item.name}</h3>
                            <p>🔊Category: {item.category}</p>
                            <p className={`${darkMode ? "text-gray-600" : "text-gray-400"} text-lg`}>⭐Purchased: <span className="btn bg-amber-300 h-5 w-10 rounded-2xl">{item.purchaseCount}</span></p>
                            <p className="text-gray-400">📒Description: {item.description}</p>
                        </div>
                        <div className="text-end">
                            <Link to={`/foodPage/${item._id}`} className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 w-full text-center rounded">
                                See More
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
            >
                <Link to="/allFoods" className="bg-blue-600 text-white px-6 py-2 rounded">
                    See All
                </Link>
            </motion.div>
        </div>
    );
};

export default TopFoods;
