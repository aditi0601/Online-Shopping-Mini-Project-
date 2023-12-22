
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





function CartItem({ cardsData , setCardsData}) {

    const [quantities, setQuantities] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [gst, setGST] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();


  useEffect(() => {
    // Calculate cartTotal, discountTotal, GST, and totalAmount whenever quantities change
    const newCartTotal = cardsData.reduce((total, card, index) => {
      return total + card.productPrice * quantities[index];
    }, 0);

    const newDiscountTotal = cardsData.reduce((total, card, index) => {
      return total + card.Discount * quantities[index];
    }, 0);

    const newGST = (18 / 100) * newCartTotal;
    const newTotalAmount = newCartTotal - newDiscountTotal + newGST;

    const roundedGST = parseFloat(newGST.toFixed(2));
  const roundedTotalAmount = parseFloat(newTotalAmount.toFixed(2));


    setCartTotal(newCartTotal);
    setDiscountTotal(newDiscountTotal);
    setGST(roundedGST);
    setTotalAmount(roundedTotalAmount);
  }, [cardsData, quantities]);



    useEffect(() => {
        setQuantities(cardsData.map((card) => card.productCurQuantity));
    }, [cardsData]);

    const incrementQuantity = (index) => {
        if (quantities[index] < cardsData[index].productQuantity) {
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] += 1;
                return newQuantities;
            });
        }
    };

    const decrementQuantity = (index) => {
        if (quantities[index] > 1) {
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] -= 1;
                return newQuantities;
            });
        }
    };

    const userId = localStorage.getItem("currentUser")
    const removeFromCart = async (productId) => {
        try {
          const response = await axios.delete(`http://localhost:9090/cart/DeleteFromCart/${userId}/${productId}`);
          
          if (response.status === 200) 
          {
            setCardsData((prevCardsData) => prevCardsData.filter((card) => card.productId !== productId));
            
          } else {
            console.error('Failed to remove item from cart');
          }
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };

      const handlePlaceOrder = () =>{
        navigate('/cart/AddressConfirmation')
      }

      const handleContinueShopping = () =>{
        navigate('/categories')
      }


    return (
        <>

            <div className="pt-10">
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="md:w-2/3">
                        {cardsData.map((card, index) => (

                            <div className="justify-between mb-6 border border-gray-500 bg-white p-6 shadow-md sm:flex sm:justify-start relative">
                                <img
                                    src={card.productImage}
                                    alt={`Product - ${card.productName}`}
                                    className="w-52 h-52 object-cover rounded-lg sm:w-52"
                                />

                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {card.productName}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-700">{card.productDescription}</p>


                                        <div>

                                            <div className='w-full border border-gray-500 mt-2 mb-2'></div>
                                            <div className="flex items-center mt-4">
                                                <label className="mr-2 text-gray-700">Quantity:</label>
                                                <button
                                                    className="text-sm font-semibold text-gray-700 px-3 py-1 border rounded-l-md"
                                                    onClick={() => decrementQuantity(index)}
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-semibold text-gray-700 px-3 py-1">
                                                    {quantities[index]}
                                                </span>
                                                <button
                                                    className="text-sm font-semibold text-gray-700 px-3 py-1 border rounded-r-md"
                                                    onClick={() => incrementQuantity(index)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div>
                                            <div className="flex">
                                                <p><i className='fa fa-inr mb-1 mr-2 text-black font-semibold text-lg'>{card.productDiscount}</i></p>
                                                <p><i className='fa fa-inr text-gray-500 line-through text-lg'>{card.productPrice}</i></p>
                                            </div>
                                            <p className="text-red-400 text-xs">{`Discount:${card.Discount}`}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="absolute bottom-2 right-2 bg-zinc-400 hover:bg-red-500 text-white px-10 py-1"
                                    onClick={() => removeFromCart(card.productId)}
                                >
                                    Remove
                                </button>

                            </div>

                        ))}
                    </div>


                    {/* Sub total */}
                    <div className="mt-6 h-full bg-white  md:mt-0 md:w-1/3">

                        <div className='border border-gray-500 p-6'>

                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Cart Total</p>
                                <p className="text-gray-700"><i className='fa fa-inr text-gray-700 mr-1'></i>{cartTotal}</p>
                            </div>
                            <hr className="my-3" />
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Discount</p>
                                <p className="text-red-400">- <i className='fa fa-inr text-red-400 mr-1'></i>{discountTotal}</p>
                            </div>
                            <hr className="my-3" />
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">GST</p>
                                <p className="text-gray-700"><i className='fa fa-inr text-gray-700 mr-1'></i>{gst}</p>
                            </div>
                            <hr className="my-3" />
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Shipping Charges</p>
                                <p className="text-gray-700"><i className='fa fa-inr text-gray-700 mr-1'></i>0</p>
                            </div>
                            <hr className="my-4" />


                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total Amount</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold"><i className='fa fa-inr text-gray-700 mr-1'></i>{totalAmount}</p>
                                    <p className="text-sm text-gray-700">including GST</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={handlePlaceOrder} className="mt-4 w-full bg-teal-600 py-1.5 font-medium text-blue-50 hover:bg-teal-500">
                            PLACE ORDER
                        </button>

                        <button onClick={handleContinueShopping} className="mt-4 mb-6 w-full bg-blue-600 py-1.5 font-medium text-blue-50 hover:bg-blue-500">
                            Continue Shopping
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CartItem
