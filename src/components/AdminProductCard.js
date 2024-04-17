import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata,
    loggedInUserId
}) => {
    const [editProduct, setEditProduct] = useState(false);

    // Filter products based on the logged-in user's ID
    const filteredProduct = data.userId === loggedInUserId;

    if (!filteredProduct) {
        return null; // Don't render the card if the product does not belong to the logged-in user
    }

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
                </div> 
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>

                    <p className='font-semibold'>
                    {
                        displayINRCurrency(data.sellingPrice)
                    }

                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                        <MdModeEditOutline/>
                    </div>

                </div>

            
            </div>
            
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }
        
        </div>
    );
};

export default AdminProductCard;
