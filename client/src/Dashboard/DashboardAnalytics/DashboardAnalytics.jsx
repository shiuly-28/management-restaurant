import { useContext, useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { AuthContext } from "../../context/AuthContext";

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(AuthContext);

  // Pie Chart er jonno kichu sundor colors
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://management-restaurant-lzgp.vercel.app/analytics");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className={`max-w-6xl mx-auto mt-10 p-4 space-y-10 ${darkMode ? "text-white" : "text-black"}`}>
      <h2 className="text-3xl font-semibold text-center">📊 Restaurant Analytics</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-green-500 p-5 rounded-xl shadow text-white">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold">{analytics.totalOrders}</p>
        </div>
        <div className="bg-yellow-400 p-5 rounded-xl shadow text-black">
          <h3 className="text-xl font-semibold">Total Income</h3>
          <p className="text-3xl font-bold">${analytics.totalIncome}</p>
        </div>
        <div className="bg-blue-400 p-5 rounded-xl shadow text-white">
          <h3 className="text-xl font-semibold">Top Food Items</h3>
          <p className="text-sm font-medium">{analytics.topFoods?.map(f => f.name).join(", ")}</p>
        </div>
      </div>

      {/* Charts Section - Ekshathe 2ti Chart */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* 1. Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Orders by Food (Bar View)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topFoods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Sales Distribution (Pie View)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.topFoods}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {analytics.topFoods?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardAnalytics;