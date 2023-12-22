import React from 'react'
import { ToastContainer } from 'react-toastify';

function DeleteCards({ productId, imgUrl, productName, productDescription, productPrice, productDiscount}) {
    const discount = Math.floor(100 - ((productDiscount / productPrice) * 100));

    
    return (
        <>
            
            <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img
                    className="h-42 w-full object-cover object-center"
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

                    <button onClick={()=>deleteProduct(productId)} className="mr-2 mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        Delete Product
                    </button>


                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default DeleteCards