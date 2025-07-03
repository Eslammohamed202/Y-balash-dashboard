import React, { useEffect, useState } from "react";
import axios from "axios";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function AdminDashboard() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [threshold, setThreshold] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [stockRes, catRes, activityRes] = await Promise.all([
          axios.get(`https://y-balash.vercel.app/api/admin/low-stock-items?threshold=${threshold}`),
          axios.get("https://y-balash.vercel.app/api/admin/top-categories"),
          axios.get("https://y-balash.vercel.app/api/admin/recent-activities"),
        ]);

        const convertedItems = (stockRes.data.items || []).map(item => ({
          ...item,
          remainingQuantity: parseInt(item.remainingQuantity, 10),
        }));

        console.log("Low Stock Items from API:", convertedItems);
        setLowStockItems(convertedItems);
        setTopCategories(catRes.data?.topCategories || []);
        setRecentActivities(activityRes.data?.activities || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
        setLowStockItems([]);
        setTopCategories([]);
        setRecentActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [threshold]);

  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setThreshold(value);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
            <p><strong>Orders Today:</strong> 42</p>
            <p><strong>Orders This Week:</strong> 287</p>
            <p><strong>Orders This Month:</strong> 1156</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
            {topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded shadow-sm"
                  >
                    <div>
                      <p className="font-medium">{cat.name}</p>
                      <p className="text-sm text-gray-500">
                        {cat.productCount} products
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No category data available</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                Low Stock Items <span className="text-yellow-600 ml-2">⚠️</span>
              </h2>
              <div className="flex items-center">
                <label htmlFor="threshold" className="text-sm mr-2">
                  Threshold:
                </label>
                <select
                  id="threshold"
                  value={threshold}
                  onChange={handleThresholdChange}
                  className="p-1 border rounded text-sm"
                >
                  {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            </div>

            {error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : loading ? (
              <div className="text-center py-4">Loading low stock items...</div>
            ) : lowStockItems.length > 0 ? (
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Product</th>
                      <th>Category</th>
                      <th className="text-right">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-3">{item.name}</td>
                        <td>{item.category}</td>
                        <td className="text-right text-red-600 font-medium">
                          {item.remainingQuantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 text-sm text-gray-500">
                  Showing {lowStockItems.length} items below {threshold} in stock
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No items found below {threshold} in stock
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow w-full">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {recentActivities.length > 0 ? (
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Action</th>
                <th>User</th>
                <th>Details</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-semibold text-green-600">
                    {activity.action}
                  </td>
                  <td>{activity.performedBy}</td>
                  <td>{activity.details}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent activities</p>
        )}
      </div>
    </div>
  );
}

