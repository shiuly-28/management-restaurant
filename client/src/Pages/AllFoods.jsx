import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearchengin } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../context/AuthContext";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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
        <title>Management Restaurant || All Foods</title>
      </Helmet>

      <h2
        className={`text-center font-bold text-3xl ${
          darkMode ? "text-green-400" : "text-green-600"
        }`}
        data-aos="fade-down"
      >
        All Foods ({foods.length})
      </h2>

      <div
        className="relative mb-6 max-w-md mx-auto shadow-2xl bg-white mt-5 rounded-2xl flex"
        data-aos="fade-up"
      >
        <input
          type="text"
          placeholder="Search by food title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full input input-bordered rounded-2xl"
        />
        <div className="absolute top-3 right-4 text-green-600 text-xl">
          <FaSearchengin />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-green-500">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-500">No foods found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((item, index) => (
            <div
              key={item._id}
              className="p-4 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  className="rounded-xl w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                  src={item.foodImage}
                  alt={item.name}
                />
              </div>

              <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">Price: ${item.price}</p>
              <p className="text-gray-600 dark:text-gray-300">
                Category:{" "}
                <span className="text-white bg-green-600 px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {item.description.slice(0, 70)}...
              </p>

              <Link
                to={`/foodPage/${item._id}`}
                className="inline-block mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 w-full text-white text-center rounded-lg transition-all duration-300"
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
