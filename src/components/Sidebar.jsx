import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCheck, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdJoinLeft } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi"; 
import { IoClose } from "react-icons/io5"; 
import { FaShoppingCart } from "react-icons/fa";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); 

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <MdDashboard  size={20} /> },
    { name: "Users & Sellers", path: "/users", icon: <FaUsers size={20} /> },
    { name: "Categories", path: "/categories", icon: <MdCategory size={20} /> },
    // { name: "Stores", path: "/stores", icon: <IoStorefront size={20} /> },
    { name: "Orders", path: "/orders", icon: <FaShoppingCart size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <IoAnalyticsOutline  size={20} /> },
    { name: "Join Requests", path: "/join requests", icon: <MdJoinLeft  size={20} /> },
    { name: "Approve Seller", path: "/approve seller", icon: <FaUserCheck  size={20} /> },
    { name: "Add Resturant", path: "/add resturant", icon: <FaUserCheck  size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu*/}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#124734] p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <IoClose size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/*  Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#124734] text-white p-5 space-y-6 shadow-[4px_0px_26px_0px_#00000014] font-bold transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:min-h-screen`}
      >
        <img src="/logo.png" alt="y-balash logo" className="w-32 mx-auto mb-6" />
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-white via-white to-[#1C573E] text-[#104f28] font-bold"
                      : "hover:bg-[#FFFFFF] hover:text-[#124734]"
                  }`
                }
                onClick={() => setIsOpen(false)} 
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}