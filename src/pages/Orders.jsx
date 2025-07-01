// import React, { useState } from 'react';
// import { useQueries } from '@tanstack/react-query';
// import Cards from '../components/Cards';
// import Navbar from '../components/Navbar';
// import { getRestaurants } from '../lib/queries';

// const Orders = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const [{ data: restaurants = [], isLoading, isError, error }] = useQueries({
//     queries: [
//       {
//         queryKey: ['restaurants', searchTerm],
//         queryFn: () => getRestaurants(searchTerm),
//       },
//     ],
//   });

//   if (isLoading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (isError) {
//     return <div className="text-center text-red-500">Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <Navbar setSearchTerm={setSearchTerm} />
//       <div className="container lg:p-12 p-6">
//         {restaurants.length === 0 && !isLoading && (
//           <div className="text-center text-gray-600">No restaurants found.</div>
//         )}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {restaurants.map((restaurant, index) => (
//             <Cards
//               key={`${restaurant.name}-${index}`}
//               name={restaurant.name}
//               deliveryTime={restaurant.deliveryTime}
//               logo={restaurant.imageUrl}
//               bgColor={restaurant.bgColor}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'https://y-balash.vercel.app/api/admin/orders/all',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues'
            }
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-6">
          {/* النصوص على اليسار */}
          <div>
            <h1 className="text-[24px] text-[#1C573E] font-poppins font-semibold">Product & Order Management</h1>
            <p className="text-[#6B7280] text-[14px] font-poppins font-medium ">Manage platform products and track orders</p>
          </div>

          {/* زر "Add Product" على اليمين */}
          <Link to="/add-product">
            <button className="bg-[#1C573E] text-white px-4 py-2 rounded-md transition-colors">
              + Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mt-10 bg-[#fff] p-4">
          <h2 className="text-xl font-semibold font-poppins text-[20px] text-[#111827] ">Products</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="search products..."
                className="pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
    <div className="flex items-center border py-2 px-4 rounded">
      <span className="text-sm mr-2 ">All Products</span>
      <svg
        className="h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-4 bg-[#E5E7EB] p-2 font-poppins font-medium text-[#6B7280] text-[12px] ">
            <div>Product</div>
            <div>Seller</div>
            <div>Category</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {/* Sample Product Row - Static as in the image */}
          <div className="grid grid-cols-7 gap-4 p-4 border-b">
            <div className="font-medium text-[#111827] text-[14px] font-poppins ">Cheese Cake</div>
            <div className="text-gray-500">#PRO001</div>
            <div>Frio</div>
            <div>Desserts</div>
            <div>70 EGP</div>
            <div>45</div>
            <div className="text-[#065F46] bg-[#D1FAE5] ">Active</div>
          </div>
          
          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <div>Showing 1 to 10 of 97 results</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded">Previous</button>
              <button className="px-3 py-1 border rounded bg-[#1C573E] text-white">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <div className="flex justify-between items-center mt-10 bg-[#fff] p-4">
          <h2 className="text-xl font-semibold font-poppins text-[20px] text-[#111827] ">Orders</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="search products..."
                className="pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
           <div className="flex items-center border py-2 px-4 rounded">
            <span className="text-sm mr-2 ">All Products</span>
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-4 bg-[#E5E7EB] p-2 font-poppins font-medium text-[#6B7280] text-[12px]">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Seller</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {/* Orders from API */}
          {currentOrders.map((order) => (
            <div key={order.orderId} className="grid grid-cols-7 gap-4 p-4 border-b">
              <div className="text-gray-500">#{order.orderId.substring(0, 8)}</div>
              <div>
                <a href={`mailto:${order.clientEmail}`} className="text-blue-500 hover:underline">
                  {order.clientEmail.split('@')[0]}
                </a>
              </div>
              <div>{order.restaurantName}</div>
              <div>{order.date}</div>
              <div>{order.totalAmount}</div>
              <div className={`${
                order.status === 'confirmed' ? 'text-green-500' : 
                order.status === 'pending' ? 'text-yellow-500' : 'text-blue-500'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
              <div>
                <button className="text-blue-500 hover:underline">View</button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <div>Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orders.length)} of {orders.length} results</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 border rounded ${currentPage === pageNumber ? 'bg-[#1C573E] text-white' : ''}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {totalPages > 3 && (
                <span className="px-3 py-1">...</span>
              )}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderManagement;