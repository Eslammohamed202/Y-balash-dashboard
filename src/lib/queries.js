import axios from "./axios";

// Fetch إجمالي عدد اليوزرز
export const getUserStats = async () => {
  const { data } = await axios.get("/users/stats");
  return data;
};

// Fetch إجمالي عدد الاوردرز
export const getOrders = async (restaurantId) => {
  const { data } = await axios.get(`/restaurants/${restaurantId}/orders`);
  return data;
};

// Fetch إجمالي الكاتيجوريز
export const getTotalCategories = async () => {
  const { data } = await axios.get("/total-categories");
  return data;
};

// Fetch إجمالي عدد المطاعم
export const getTotalRestaurants = async () => {
  const { data } = await axios.get("/total-restaurants");
  return data;
};





export const addCategories = async (categoryData) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0NjExNzQ4NywiZXhwIjoxNzQ4NzA5NDg3fQ.G9GQa-dm3BuvAyrdIepBXKGB8HmUQtVtJgu5aDXqWA8';

  const formData = new FormData();
  formData.append('name', categoryData.name);
  formData.append('image', categoryData.image); // File object
  formData.append('items', JSON.stringify(categoryData.items || []));

  const { data } = await axios.post('/categories/add', formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed template literal
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// Fetch  اجمالي عدد الفئات 
export const getCategories = async (searchTerm = '') => {
const endpoint = searchTerm
? `/categories/search?name=${encodeURIComponent(searchTerm)}`
: '/categories/all';

try {
const { data } = await axios.get(endpoint);
return Array.isArray(data) ? data : [];
} catch (error) {
if (error.response && error.response.status === 404) {
  console.log('No categories found for search term:', searchTerm);
  return []; 
}
throw new Error(`Failed to fetch categories: ${error.message}`);
}
};

  export const getRestaurants = async (searchTerm = '') => {
    const endpoint = searchTerm
      ? `/restaurants/search?name=${encodeURIComponent(searchTerm)}`
      : '/restaurants/all';
  
    try {
      const { data } = await axios.get(endpoint);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No restaurants found for search term:', searchTerm);
        return []; 
      }
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }
  };