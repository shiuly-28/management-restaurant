import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../context/AuthContext";

const TopFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true }); // AOS setup

    fetch("http://localhost:3000/resturent")
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
    return <p className="text-center text-green-500 font-semibold">Loading...</p>;
  }

  return (
    <div className="py-12">
      <motion.h2
        className='text-3xl text-center text-green-500 font-bold'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        🍽️ Top Foods ({foods.length})
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
        {foods.map((item, idx) => (
          <motion.div
            key={item._id}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            className="p-4 bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300
             flex flex-col justify-between border border-transparent hover:border-green-500"
          >
            <div className="flex-1">
              {/* 🔹 Image with hover zoom effect */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.foodImage}
                  alt={item.name}
                  className="rounded-xl w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>

              <h3 className="text-xl font-semibold mt-5">{item.name}</h3>
              <p>🔊 Category: {item.category}</p>
              <p
                className="mt-1"
              >
                ⭐ Purchased:
                <span className="btn bg-amber-300 text-black ml-2 h-5 w-10 rounded-2xl text-sm">
                  {item.purchaseCount}
                </span>
              </p>
              <p className=" text-sm mt-2">
                📒 {item.description.slice(0, 80)}...
              </p>
            </div>

            <div className="text-end mt-4">
              <Link
                to={`/foodPage/${item._id}`}
                className="inline-block bg-green-500 text-white px-4 py-2 w-full text-center rounded-lg hover:bg-green-600 transition-all"
              >
                See More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link
          to="/allFoods"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          See All
        </Link>
      </motion.div>
    </div>
  );
};

export default TopFoods;
