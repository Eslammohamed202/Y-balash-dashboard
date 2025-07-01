// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AiOutlinePlus } from 'react-icons/ai';

// const AddResturant = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   const token =
//     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues';

//   useEffect(() => {
//     axios
//       .get('https://y-balash.vercel.app/api/restaurants/all', {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         setRestaurants(res.data || []);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch restaurants:', err);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {/* Add Restaurant Card */}
//         <div className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//           <AiOutlinePlus size={28} className="text-gray-400 mb-2" />
//           <p className="text-lg font-medium text-gray-600">Add Restaurant</p>
//         </div>

//         {/* Restaurant Cards */}
//         {restaurants.map((res) => (
//           <div
//             key={res._id}
//             className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="font-semibold text-lg text-green-900">{res.name}</h2>
//               {res.imageUrl && (
//                 <img
//                   src={res.imageUrl}
//                   alt={res.name}
//                   className="w-12 h-12 object-contain rounded"
//                 />
//               )}
//             </div>
//             <p className="text-sm text-gray-600">In store delivery......................</p>
//             <p className="text-sm text-gray-400">..................................................</p>
//             <p className="text-sm text-gray-400">...</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddResturant;


'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const AddResturant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues';

  useEffect(() => {
    axios
      .get('https://y-balash.vercel.app/api/restaurants/all', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setRestaurants(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to fetch restaurants:', err);
      });
  }, []);

  const handleAddRestaurant = () => {
    navigate('/model resturant'); // غير المسار حسب مكان صفحة الإضافة
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Add Restaurant Card */}
        <div
          onClick={handleAddRestaurant}
          className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <AiOutlinePlus size={28} className="text-gray-400 mb-2" />
          <p className="text-lg font-medium text-gray-600">Add Restaurant</p>
        </div>

        {/* Restaurant Cards */}
        {restaurants.map((res) => (
          <div
            key={res._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-green-900">{res.name}</h2>
              {res.imageUrl && (
                <img
                  src={res.imageUrl}
                  alt={res.name}
                  className="w-12 h-12 object-contain rounded"
                />
              )}
            </div>
            <p className="text-sm text-gray-600">{res.description}</p>
            <p className="text-sm text-gray-400">{res.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddResturant;

