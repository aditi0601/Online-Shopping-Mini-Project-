import React, { useEffect, useState } from 'react'
import MyOrder from './MyOrder'
import pimg from '../Categories/Clothes/Clothes-images/sample.png'
import axios from 'axios'


function AllOrders() {

    const [allOrderDataP, setAllOrderDataP] = useState([]);
    useEffect(()=>{
        const fetchOrder = async () =>{
            try {
                const userId = localStorage.getItem("currentUser")
                const response = await axios.get(`http://localhost:9090/orders/user/${userId}`)
    
                setAllOrderDataP(response.data)
                
            } catch (error) 
            {
                console.log(error);
                
            }

        }
        fetchOrder()
    }, [])

    console.log(allOrderDataP, "PRP")
    
    
    return (
        <div>

            <div className='mb-4 text-base font-semibold text-gray-400'>MY ORDERS</div>

                {(allOrderDataP.length !==0) ? (
                    
                    <>
                        <div className='mb-6'>
    
                            <table className="w-full border">
                                <tbody>
                                    <tr className='bg-gray-100'>
                                        <td className="flex justify-between border py-4">
                                            <div className='ml-2 items-start'>
                                                Order ID : 1
                                            </div>
                                            <div className='mr-2 items-end'>
                                                {"22 Dec, 2023"}
                                            </div>
                                        </td>
                                    </tr>
    
                                    {allOrderDataP.map((orderData) => (
                                        <>
                                        <MyOrder productImage={pimg} productName={orderData.productName} productDescription={orderData.productDescription} productQuantity={orderData.productQuantityAddedToCart} />
                                        </>
                                    ))}
    
                                </tbody>
                            </table>
    
                        </div>
                    </>
                
                ) : (
                    <></>
                )}

        </div>
    )
}

export default AllOrders