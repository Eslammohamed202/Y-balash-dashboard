import React, { useEffect, useState } from "react";
import axios from "axios";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function AdminDashboard() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [stockRes, catRes, activityRes] = await Promise.all([
        axios.get("https://y-balash.vercel.app/api/admin/low-stock-items?threshold=5"),
        axios.get("https://y-balash.vercel.app/api/admin/top-categories"),
        axios.get("https://y-balash.vercel.app/api/admin/recent-activities"),
      ]);

      setLowStockItems(stockRes.data.items.slice(0, 5));
      setTopCategories(catRes.data.topCategories);
      setRecentActivities(activityRes.data.activities);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
            <p>
              <strong>Orders Today:</strong> 42
            </p>
            <p>
              <strong>Orders This Week:</strong> 287
            </p>
            <p>
              <strong>Orders This Month:</strong> 1156
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
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
                  <p
                    className={`text-sm font-semibold ${
                      cat.changeDirection === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {cat.changeDirection === "increase" ? "+" : "-"}
                    {cat.percentageChange}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-[1.5rem] rounded shadow">
            <h2 className="text-xl font-semibold mb-[2rem] flex items-center justify-between">
              Low Stock Alert <span className="text-yellow-600">⚠️</span>
            </h2>
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm border-b py-[1.5rem] "
              >
                <span>{item.name}</span>
                <span className="text-red-600">{item.remainingQuantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow w-full">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
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
      </div>
    </div>
  );
}
