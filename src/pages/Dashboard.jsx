// import { FaEye, FaUsers } from "react-icons/fa";
// import { MdCategory } from "react-icons/md";
// import { IoStorefront, IoRestaurant, IoCafe } from "react-icons/io5";
// import { StatCard } from "../components/dashboard/StatCard";
// import { MarketOverviewChart } from "../components/dashboard/MarketOverviewChart";
// import { BalanceCard } from "../components/dashboard/BalanceCard";
// import { useQueries } from "@tanstack/react-query";
// import { getUserStats, getTotalCategories, getTotalRestaurants } from "../lib/queries";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   // استخدام useQueries لجلب البيانات من عدة طلبات API
//   const [
//     userStatsQuery,
//     categoriesQuery,
//     restaurantsQuery,
//   ] = useQueries({
//     queries: [
//       {
//         queryKey: ["userStats"],
//         queryFn: getUserStats,
//       },
//       {
//         queryKey: ["totalCategories"],
//         queryFn: getTotalCategories,
//       },
//       {
//         queryKey: ["totalRestaurants"],
//         queryFn: getTotalRestaurants,
//       },
//     ],
//   });

//   // معالجة حالات التحميل والأخطاء
//   const isLoading = userStatsQuery.isLoading || categoriesQuery.isLoading || restaurantsQuery.isLoading;
//   const isError = userStatsQuery.isError || categoriesQuery.isError || restaurantsQuery.isError;
//   const error = userStatsQuery.error || categoriesQuery.error || restaurantsQuery.error;

//   // إعداد بيانات بطاقات الإحصائيات بناءً على البيانات المُجلَبة
//   const stats = [
//     // {
//     //   title: "Daily Views",
//     //   value: userStatsQuery.data?.dailyViews || "1550", // لو مش موجودة خلي الافتراضي
//     //   icon: <FaEye />,
//     //   change: "0.2%",
//     // },
//     {
//       value: userStatsQuery.data?.totalUsers || "6163",
//       title: "Total Users",
//       icon: <FaUsers />,
//       change: "0.8%",
//     },
//     {
//       title: "Total Categories",
//       value: categoriesQuery.data?.totalCategories || "20",  
//       icon: <MdCategory />,
//       change: "0.3%",
//     },
//     {
//       title: "Total Stores",
//       value: restaurantsQuery.data?.totalStores || "40",  
//       icon: <IoStorefront />,
//       change: "0.1%",
//     },
//     {
//       title: "Total Cafes",
//       value: restaurantsQuery.data?.totalCafes || "15",  
//       icon: <IoCafe />,
//       change: "1.5%",
//     },
//     {
//       title: "Total Restaurants",
//       value: restaurantsQuery.data?.totalRestaurants || "25", 
//       icon: <IoRestaurant />,
//       change: "0.7%",
//     },
//   ];
  
//   // عرض حالة التحميل
//   if (isLoading) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <p className="text-lg text-gray-600">جارٍ التحميل...</p>
//       </div>
//     );
//   }

//   // عرض حالة الخطأ
//   if (isError) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">حدث خطأ: {error?.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div >
//       <Navbar  />
//        <div className="p-6 bg-gray-50 min-h-screen">
//       {/* بطاقات الإحصائيات */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
//         {stats.map((stat, idx) => (
//           <StatCard
//             key={idx}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//             change={stat.change}
//           />
//         ))}
//       </div>

//       {/* الرسم البياني وبطاقة الرصيد */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <MarketOverviewChart />
//         <BalanceCard />
//       </div>
//     </div>
//     </div>
   
//   );
// }



'use client';

import React, { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../components/ui/card";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { GiBread } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { IoBagSharp } from "react-icons/io5";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues";

const fetchStats = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error at", url, error.message);
    return {};
  }
};

const StatCard = ({ title, value, change, icon, color }) => (
  <Card className="flex-1">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
          <p className={`text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}>
            {change > 0 ? `↑ ${change}%` : `↓ ${change}%`} vs last month
          </p>
        </div>
        <div className={`text-3xl ${color}`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const DashboardStats = () => {
  const [users, setUsers] = useState(null);
  const [sellers, setSellers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [period, setPeriod] = useState("30days");
  const [alerts, setAlerts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [welcomeData, setWelcomeData] = useState(null);

  const fetchRevenueData = async (period) => {
    setPeriod(period);
    const url =
      period === "30days"
        ? "https://y-balash.vercel.app/api/admin/revenue-30days"
        : "https://y-balash.vercel.app/api/admin/revenue-12months";
    const data = await fetchStats(url);

    const breakdown = data.dailyBreakdown || data.monthlyBreakdown || [];

    if (Array.isArray(breakdown)) {
      setRevenueData(
        breakdown.map((item, index) => ({
          name: item._id || index + 1,
          value: Number(item.dailyTotal || item.monthlyTotal || 0),
        }))
      );
    }
  };

  useEffect(() => {
    fetchStats("https://y-balash.vercel.app/api/admin/users-stats").then(setUsers);
    fetchStats("https://y-balash.vercel.app/api/admin/sellers-stats").then(setSellers);
    fetchStats("https://y-balash.vercel.app/api/admin/orders-stats").then(setOrders);
    fetchStats("https://y-balash.vercel.app/api/admin/revenue-stats").then(setRevenue);
    fetchStats("https://y-balash.vercel.app/api/admin/welcome").then(setWelcomeData);
    fetchStats("https://y-balash.vercel.app/api/admin/alerts").then((data) => setAlerts(data.alerts));
    fetchStats("https://y-balash.vercel.app/api/admin/top-categories").then((data) => setCategories(data.topCategories));
    fetchRevenueData("30days");
  }, []);

  const alertItems = useMemo(() => [
    {
      label: "Products Flagged",
      value: alerts?.flaggedProducts,
      color: "bg-red-100 text-red-600",
      icon: "⚠️",
      action: "View",
    },
    {
      label: "Pending Seller Approvals",
      value: alerts?.pendingSellerApprovals,
      color: "bg-yellow-100 text-yellow-700",
      icon: "🧑‍💼",
      action: "Review",
    },
    {
      label: "Low Stock Items",
      value: alerts?.lowStockItems,
      color: "bg-orange-100 text-orange-700",
      icon: "📦",
      action: "Check",
    },
  ], [alerts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border-b bg-[#ffffff] ">
        <div>
          <h1 className="text-2xl font-bold text-[#1C573E]">Dashboard</h1>
          <p className="text-sm text-gray-600">
            {welcomeData?.message || "Welcome back, Admin"} 👋
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-gray-500 text-sm gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{welcomeData?.date || ""}</span>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <StatCard
          title="Total Users"
          value={users?.totalUsers || 0}
          change={parseFloat(users?.percentageChange || 0)}
          icon={<FaUsers className="bg-[#DBEAFE] rounded" />}
          color="text-blue-500"
        />
        <StatCard
          title="Total Sellers"
          value={sellers?.totalSellers || 0}
          change={parseFloat(sellers?.percentageChange || 0)}
          icon={<span className="text-3xl">🛍️</span>}
          color="text-yellow-500"
        />
        <StatCard
          title="Total Orders"
          value={orders?.totalOrders || 0}
          change={parseFloat(orders?.percentageChange || 0)}
          icon={<IoBagSharp className="bg-[#EDE9FE] rounded" />}
          color="text-purple-500"
        />
        <StatCard
          title="Total Revenue"
          value={`${revenue?.totalRevenue || 0} EGP`}
          change={parseFloat(revenue?.percentageChange || 0)}
          icon={<span className="text-3xl">💵</span>}
          color="text-green-500"
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Revenue Analytics</h2>
            <div className="space-x-2">
              <button
                onClick={() => fetchRevenueData("30days")}
                className={`px-4 py-1 rounded ${period === "30days" ? "bg-green-700 text-white" : "bg-gray-100"}`}
              >
                30 Days
              </button>
              <button
                onClick={() => fetchRevenueData("12months")}
                className={`px-4 py-1 rounded ${period === "12months" ? "bg-green-700 text-white" : "bg-gray-100"}`}
              >
                12 Months
              </button>
            </div>
          </div>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400">No revenue data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between gap-6">
            <div className="flex-1 space-y-2">
              <h2 className="font-semibold text-lg mb-2">Recent Alerts</h2>
              {alertItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded px-4 py-2 ${item.color}`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.value} {item.label}</span>
                  </span>
                  <span className="text-sm font-medium underline cursor-pointer">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="font-semibold text-lg mb-2">Top Categories</h2>
              {categories.map((cat, idx) => (
                <div key={cat._id} className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {idx === 0 ? <MdEmojiFoodBeverage className="bg-[#DBEAFE] rounded text-[30px] text-[#1C573E]" /> : idx === 1 ? <LuDessert className="bg-[#EDE9FE] rounded text-[30px] text-[#000000]" /> : <GiBread className="bg-[#FEF3C7] rounded text-[30px] text-[#7F2E31]" />}
                    </span>
                    <div>
                      <p className="font-medium text-[#1C573E] text-[16px]">{cat.name}</p>
                      <p className="text-[14px] text-[#6B7280] font-medium">{cat.productCount} products</p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${cat.changeDirection === "increase" ? "text-green-500" : "text-red-500"}`}
                  >
                    {cat.changeDirection === "increase" ? "+" : "-"}{cat.percentageChange}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;