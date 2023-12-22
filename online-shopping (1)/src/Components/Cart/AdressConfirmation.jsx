import React from 'react'
import { useState, useEffect } from 'react';
import showToast from '../Toast/Toast';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function AdressConfirmation() 
{
    const navigate = useNavigate();
    const [newAddress, setNewAddress] = useState('');
    const [defaultAddress, setDefaultAddress] = useState('');
    if(localStorage.getItem("currentUser"))
    {
        const userId = localStorage.getItem("currentUser");
        useEffect(() => {
            const fetchCartProducts = async () => {
              try {
                const response = await fetch(`http://localhost:9090/api/users/${userId}`);
                const userData = await response.json();
                setDefaultAddress(userData.userAddress)
                
              } catch (error) {
                console.error('Error fetching cart products:', error);
              }
            };
      
            fetchCartProducts();
      
          }, []);
      
              
        const handlePlaceOrder = async () =>{
            if(defaultAddress ===null || defaultAddress.length==0)
            {
                if(newAddress.length===0)
                {
                    showToast("For Placing Order, Please Add Delivery Address", "error");
                }
                else
                {
                    const userData = {
                        "userId" : userId
                    }
                    const placeMyOrder = await axios.post("http://localhost:9090/orders/place", userData)
                    const updateAddress = await axios.put(`http://localhost:9090/api/users/updateUserAdress/${userId}/${newAddress}`)
                    showToast("Order Placed Successfully", "success")
                    setTimeout(() => {
                        // Navigate to a particular page after the success toast
                        navigate('/login');
                      }, 3000);

                }
            }
            else
            {
                if(newAddress.length!==0)
                {
                    const updateAddress = await axios.put(`http://localhost:9090/api/users/updateUserAdress/${userId}/${newAddress}`)                    
                }
                showToast("Order Placed Successfully", "success")
                setTimeout(() => {
                    // Navigate to a particular page after the success toast
                    navigate('/login');
                  }, 3000);

            }
        }



    
    
        return (
            <>
                <div className="pt-10 mb-10">
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className='w-full border border-gray-200 p-6'>
    
                            <label className="block text-sm font-medium text-gray-700">Default Address</label>
                            <input
                                type="text"
                                className="mt-1 mb-4 px-4 py-2 w-full border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                                value={defaultAddress}
                                readOnly
                            />
    
                            <label className="block text-sm font-medium text-gray-700">Update Adress</label>
                            <input
                                type="text"
                                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                                value={newAddress}
                                onChange={(e)=> setNewAddress(e.target.value)}
                            />
    
                        <button onClick={handlePlaceOrder} className="mt-6 p-4 w-52 bg-teal-600 py-1.5 font-medium text-blue-50 hover:bg-teal-500">
                                PLACE ORDER
                            </button>
    
                        </div>
    
                    </div>
                </div>
    
                <ToastContainer />
    
            </>
        )
    }
}

export default AdressConfirmation



