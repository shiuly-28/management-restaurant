import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearchengin } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../context/AuthContext";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [error, setError] = useState(null);
  const { darkMode } = useContext(AuthContext);

  // Available categories
  const categories = ["Breakfast", "FastFood", "Dessert", "Snacks"];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          search: searchTerm,
          category: categoryFilter
        });

        const res = await fetch(`http://localhost:3000/posts?${params}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setFoods(data);
        } else {
          console.error("Expected array but got:", data);
          setFoods([]);
          setError("Invalid data format received");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [searchTerm, categoryFilter]);

  return (
    <div className="px-4 py-6 mt-12">
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

      {/* 🔍 Search & Filter Section */}
      <div className="max-w-4xl mx-auto space-y-4 mt-6 mb-8">
        {/* Search Input */}
        <div
          className="relative shadow-2xl bg-white rounded-2xl flex"
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

        {/* Category Filter */}
        <div className="flex justify-center gap-4 flex-wrap" data-aos="fade-up">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error max-w-md mx-auto mb-6">
          <span>Error: {error}</span>
        </div>
      )}

      {/* 🍽️ Food Cards */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-green-500"></span>
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No foods found.</p>
          {(searchTerm || categoryFilter) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
              }}
              className="btn btn-primary mt-4"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((item, index) => (
            <div
              key={item._id}
              className="p-4 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-transparent hover:border-green-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  className="rounded-xl w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                  src={item.foodImage || item.image || "https://via.placeholder.com/300"}
                  alt={item.name || "Food"}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              </div>

              <h3 className="text-xl font-semibold mt-4">{item.name || "Unnamed Food"}</h3>
              <p className="font-bold text-green-600">
                Price: ${item.price || "N/A"}
              </p>
              <p>
                Category:{" "}
                <span className="text-white bg-green-600 px-3 py-1 rounded-full text-sm">
                  {item.category || "Uncategorized"}
                </span>
              </p>
              
              {item.description && (
                <p className="mt-1 text-gray-600">
                  {item.description.slice(0, 70)}...
                </p>
              )}

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