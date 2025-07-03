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
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProductsPage, setCurrentProductsPage] = useState(1);
  const ordersPerPage = 10;
  const productsPerPage = 10;

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

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://y-balash.vercel.app/api/images/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  // Orders pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalOrderPages = Math.ceil(orders.length / ordersPerPage);

  // Products pagination
  const indexOfLastProduct = currentProductsPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductPages = Math.ceil(products.length / productsPerPage);

  const paginateOrders = (pageNumber) => setCurrentPage(pageNumber);
  const paginateProducts = (pageNumber) => setCurrentProductsPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[24px] text-[#1C573E] font-poppins font-semibold">Product & Order Management</h1>
            <p className="text-[#6B7280] text-[14px] font-poppins font-medium">Manage platform products and track orders</p>
          </div>

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
          <h2 className="text-xl font-semibold font-poppins text-[20px] text-[#111827]">Products</h2>
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
              <span className="text-sm mr-2">All Products</span>
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
            <div>Product</div>
            <div>SKU</div>
            <div>Seller</div>
            <div>Category</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Status</div>
          </div>

          {/* Products from API */}
          {currentProducts.map((product) => (
            <div key={product._id} className="grid grid-cols-7 gap-4 p-4 border-b items-center">
              <div className="flex items-center">
                <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded mr-2" />
                <span className="font-medium text-[#111827] text-[14px] font-poppins">{product.name}</span>
              </div>
              <div className="text-gray-500">{product.sku}</div>
              <div>{product.restaurant?.name || 'N/A'}</div>
              <div>{product.category?.name || 'N/A'}</div>
              <div>
                <span className="text-gray-500 line-through mr-1">{product.originalPrice} EGP</span>
                <span className="font-medium">{product.discountedPrice} EGP</span>
              </div>
              <div>{product.quantity}</div>
              <div className="text-[#065F46] bg-[#D1FAE5] px-2 py-1 rounded text-center">Active</div>
            </div>
          ))}

          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <div>
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginateProducts(currentProductsPage - 1)}
                disabled={currentProductsPage === 1}
                className={`px-3 py-1 border rounded ${currentProductsPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(3, totalProductPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginateProducts(pageNumber)}
                    className={`px-3 py-1 border rounded ${currentProductsPage === pageNumber ? 'bg-[#1C573E] text-white' : ''}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalProductPages > 3 && (
                <span className="px-3 py-1">...</span>
              )}

              <button
                onClick={() => paginateProducts(currentProductsPage + 1)}
                disabled={currentProductsPage === totalProductPages}
                className={`px-3 py-1 border rounded ${currentProductsPage === totalProductPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <div className="flex justify-between items-center mt-10 bg-[#fff] p-4">
          <h2 className="text-xl font-semibold font-poppins text-[20px] text-[#111827]">Orders</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="search orders..."
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
              <span className="text-sm mr-2">All Orders</span>
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
              <div className={`${order.status === 'confirmed' ? 'text-green-500' :
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
                onClick={() => paginateOrders(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(3, totalOrderPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginateOrders(pageNumber)}
                    className={`px-3 py-1 border rounded ${currentPage === pageNumber ? 'bg-[#1C573E] text-white' : ''}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalOrderPages > 3 && (
                <span className="px-3 py-1">...</span>
              )}

              <button
                onClick={() => paginateOrders(currentPage + 1)}
                disabled={currentPage === totalOrderPages}
                className={`px-3 py-1 border rounded ${currentPage === totalOrderPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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