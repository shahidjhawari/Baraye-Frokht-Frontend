import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

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
        const token = localStorage.getItem("token");
        console.log("Token from local storage:", token); 
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken); 

          const userId = decodedToken?._id;
          if (userId) {
            setLoggedInUserId(userId);
            console.log("Logged-in user ID:", userId);
          } else {
            console.log("User ID not found in token");
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
  }, []); 

  useEffect(() => {
    console.log("Initial user products:", userProducts);
  }, [userProducts]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {userProducts
          .filter((product) => product.userId === loggedInUserId)
          .map((product, index) => (
            <AdminProductCard data={product} key={index + "allProduct"} />
          ))}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
