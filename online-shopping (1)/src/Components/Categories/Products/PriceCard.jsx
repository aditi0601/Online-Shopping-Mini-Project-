import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import showToast from '../../Toast/Toast';
import axios from 'axios'

let isLoggedIn = true;
function PriceCard({ productId, imgUrl, productName, productDescription, productPrice, productDiscount, productQuantity = "0", productCategory }) {
    const discount = Math.floor(100 - ((productDiscount / productPrice) * 100));

    productQuantity = Number(productQuantity)

    
    const handleAddToCart = () => 
    {
        showToast("LogIn for Adding Products to Cart", "error")
    };

    if(!localStorage.getItem("currentUser"))
    {
        isLoggedIn = false;
    }

    const navigate = useNavigate();
  
    const addProductToCart = async () => {
        try {
          const userId = localStorage.getItem("currentUser");
          const updatequant = await axios.put(`http://localhost:9090/api/products/updateQuantityParameter/${productId}/1`);
          const response = await axios.post(`http://localhost:9090/cart/AddToCart/${userId}/${productId}`)

          if (response.status === 200) {
            navigate('/cart');
          } else {
            showToast("Failed to add product to cart", "error");
          }
        } catch (error) {
          console.log(error)
          showToast("Failed to add product to cart", "error");
        }
      };

    return (
        <>

            <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img
                    className="h-56 w-full object-cover object-center"
                    src={imgUrl}
                    alt={productName}
                />
                <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                        {productName}
                    </h2>
                    <div className="border-t border-gray-300 my-2"></div>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                        {productDescription}
                    </p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <i className='fa fa-inr'></i>{productDiscount}
                        </p>
                        <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                            <i className='fa fa-inr'></i>{productPrice}
                        </p>
                        <p className="ml-auto text-base font-medium text-green-500">{discount}% off</p>
                    </div>

                    {productQuantity === 0 && (
                        <p className="text-red-500 font-semibold mt-2">Out of Stock</p>
                    )}
                    {!(productQuantity === 0) && (isLoggedIn==true) && (
                        <div className="mt-4 flex">
                            <Link onClick={addProductToCart} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                Add to Cart
                            </Link>
                            <Link to={`/categories/${productCategory}/${productId}`} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
                                View Details
                            </Link>
                        </div>
                    )}

                    {!(productQuantity === 0) &&(isLoggedIn==false) && (
                        <div className="mt-4 flex">
                            <button onClick={handleAddToCart} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                Add to Cart
                            </button>
                            <Link to={`/categories/${productCategory}/${productId}`} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
                                View Details
                            </Link>
                        </div>
                    )}



                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default PriceCard