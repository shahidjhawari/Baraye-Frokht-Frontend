import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch("/delete-product", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: data._id }),
      });

      if (response.ok) {
        // If the deletion is successful, fetch updated data
        fetchdata();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-25">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">{displayINRCurrency(data.price)}</p>

          <div className="flex">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit ml-2 p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={handleDeleteProduct}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
