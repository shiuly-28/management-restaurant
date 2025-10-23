import { useContext } from "react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AuthContext } from "../../context/AuthContext";

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {darkMode} = useContext(AuthContext)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/analytics");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">Loading analytics...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-red-600">Error: {error}</p>
    </div>
  );

  if (!analytics) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 space-y-8">
      <h2 className={`${darkMode ? "text-white" : "text-black"} text-3xl font-semibold text-center`}>📊 Dashboard Analytics</h2>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-green-500 p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-black">Total Orders</h3>
          <p className="text-3xl font-bold text-black">{analytics.totalOrders}</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-black">Total Income</h3>
          <p className="text-3xl font-bold text-black">${analytics.totalIncome}</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-black">Top Foods</h3>
          <p className="text-md text-black font-medium">
            {analytics.topFoods && analytics.topFoods.length > 0 
              ? analytics.topFoods.map(f => f.name).join(", ")
              : "No data available"
            }
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Top Selling Foods</h3>
        {analytics.topFoods && analytics.topFoods.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topFoods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-green-500">No order data available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;