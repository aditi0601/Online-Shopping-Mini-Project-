import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import showToast from '../Toast/Toast';
import axios from 'axios'



let isLoggedIn = true;

function ProductDetailsCard({ productId, productName, productDescription, productPrice, productDiscount, productQuantity, productImages }) {

  const navigate = useNavigate();
  productQuantity = Number(productQuantity)
  const discount = Math.floor(100 - ((productDiscount / productPrice) * 100));
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [quantity, setQuantity] = useState(1);
  


  const handleThumbnailClick = (thumbnailUrl) => {
    setMainImage(thumbnailUrl);
  };

  const incrementQuantity = () => {
    if (quantity < productQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };


  const handleAddToCart = () => 
  {
    showToast("LogIn for Adding Products to Cart", "error")
      
  };

  const addProductToCart = async () => {
    try {
      const userId = localStorage.getItem("currentUser");
      const updatequant = await axios.put(`http://localhost:9090/api/products/updateQuantityParameter/${productId}/${quantity}`);
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


  if(!localStorage.getItem("currentUser"))
  {
    isLoggedIn = false;
  }





  return (
    <>
    <div className="bg-gray-100 py-8 rounded-md hover:shadow-md transition duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">


            <div className="h-80 rounded-lg overflow-hidden bg-gray-300 mb-4 hover:bg-gray-200 transition duration-300 ease-in-out">
              <img
                className="w-full h-full object-cover"
                src={mainImage}
                alt="Product Image"
              />
            </div>
            <div className="grid grid-cols-4 gap-2" >
              {productImages.map((thumbnail, index) => (
                <img
                  key={index}
                  className="w-full h-16 object-cover rounded-md cursor-pointer hover:border-2 hover:border-blue-500"
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>


          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              {productName}
            </h2>
            <div className="border-b-2 border-gray-500 mb-4"></div>
            <p className="text-gray-700 text-base mb-4">
              {productDescription}
            </p>

            <div className="flex mb-4">
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                <i className='fa fa-inr'></i>{productDiscount}
              </p>
              <p className="text-lg font-medium text-gray-500 line-through dark:text-gray-300">
                <i className='fa fa-inr'></i>{productPrice}
              </p>
              <p className="ml-10 text-lg font-medium text-green-500">{discount}% off</p>
            </div>




            <div className="flex items-center mb-4">
              <label className="mr-2 text-gray-700">Quantity:</label>
              <div className="flex items-center">
                <button
                  className="text-lg font-semibold text-gray-700 px-3 py-1 border rounded-l-md"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-700 px-3 py-1">
                  {quantity}
                </span>
                <button
                  className="text-lg font-semibold text-gray-700 px-3 py-1 border rounded-r-md"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className='flex'>
              {
                (isLoggedIn === false && productQuantity !==0) ? (
                  <button 
                    onClick={handleAddToCart}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ${productQuantity === 0 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                    Add to Cart
                  </button>
                )
                  : productQuantity === 0 ? (
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ${productQuantity === 0 ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      disabled={true}>
                      Add to Cart
                    </button>
                  ) : (

                    <Link onClick={addProductToCart}
                      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ${productQuantity === 0 ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      >
                      Add to Cart
                    </Link>

                  )}
              <p className={`text-2xl font-semibold ${productQuantity === 0 ? 'text-red-500' : 'text-green-500'} mt-1 ml-2`}>
                {productQuantity > 0 ? 'In Stock.' : 'Out of Stock.'}
              </p>

            </div>
            
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}


export default ProductDetailsCard