import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Function to fetch products
  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      console.log("product data", dataResponse);
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to fetch token and user ID
  const fetchTokenAndUserId = async () => {
    try {
      // Fetch the JWT token from your server
      const response = await fetch(SummaryApi.current_user.url);
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
      
      const { token } = await response.json();
      if (!token) {
        throw new Error('Token not found in response');
      }

      // Decode the token to extract user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Assuming userId is the key where user ID is stored

      // Set the user ID state
      setLoggedInUserId(userId);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
    fetchTokenAndUserId(); // Fetch token and user ID
  }, []);

  // Filter products based on the logged-in user's ID
  const filteredProducts = allProduct.filter(product => product.userId === loggedInUserId);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {filteredProducts.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
        ))}
      </div>

      {/**upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
