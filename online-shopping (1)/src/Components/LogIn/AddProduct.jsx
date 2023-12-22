import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import showToast from '../Toast/Toast';


function AddProduct() 
{
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productCategory, setProductCategory] = useState('')




    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productDiscount: productDiscount,
            productQuantity: productQuantity,
            productCategory: productCategory

        }

        try {
            const response = await axios.post('http://localhost:9090/api/products/', productData)

            if (response.status === 201) {

                showToast("Product Added Successfully", "success");

            } else {
                showToast(response.data.message || "Failed", "error");
            }

        } catch (error) {
            showToast("Failed. Please try again later.", "error");
        }

    };





    return (
        <div>
            <div>
                <h1 className='text-gray-500 text-2xl font-bold mb-4'> Create New Product </h1>
                <form onSubmit={handleSubmit} className="bg-gray-50 p-8 border border-gray-600 shadow-md max-w-4xl" encType="multipart/form-data">

                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Description
                        </label>
                        <input
                            type="text"
                            name="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Price
                        </label>
                        <input
                            type="text"
                            name="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Discount Price
                        </label>
                        <input
                            type="text"
                            name="productDiscount"
                            value={productDiscount}
                            onChange={(e) => setProductDiscount(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Quantity
                        </label>
                        <input
                            type="text"
                            name="productQuantity"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/*<div className="mb-4">
                            <label htmlFor="productImage" className="block text-gray-600 text-sm font-medium mb-2">
                                Product Images
                            </label>
                            <input
                                type="file"
                                name="productImage"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
        </div>*/}

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-600 text-sm font-medium mb-2">
                            Select Category
                        </label>
                        <select
                            name="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Mobiles">Mobiles</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddProduct