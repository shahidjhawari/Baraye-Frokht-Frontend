import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Function to fetch products
  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      console.log("product data", dataResponse);
      setUserProducts(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchTokenAndUserId = async () => {
      try {
        // Fetch the JWT token from local storage
        const token = localStorage.getItem('token');
        console.log('Token from local storage:', token); // Log the token value
        if (token) {
          // Decode the token to inspect its contents
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken); // Log the decoded token
    
          // Check if the decoded token contains the userId field
          const userId = decodedToken?._id;
          if (userId) {
            setLoggedInUserId(userId);
            console.log('Logged-in user ID:', userId); // Log the logged-in user ID
          } else {
            console.log('User ID not found in token');
          }
        }        
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    
  
    fetchTokenAndUserId();
  }, []);
  

  useEffect(() => {
    fetchAllProduct();
  }, []); // This effect runs once on component mount to fetch products

  useEffect(() => {
    console.log("Initial user products:", userProducts);
  }, [userProducts]);
  

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {userProducts
          .filter(product => product.userId === loggedInUserId)
          .map((product, index) => (
            <AdminProductCard data={product} key={index + "allProduct"} />
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
