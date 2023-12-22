import React from 'react'
import itemimg from '../Categories/Clothes/Clothes-images/sample.png'
import { useState, useEffect } from 'react';
import EmptyCartImg from '../Cart/EmptyCart.png'
import CartItem from './CartItem';
import { Link } from 'react-router-dom';




function Cart() {
  const [mycartData, setMyCartData] = useState([]);
  const cartData = []

  let isloggedIn = true;

  if (!localStorage.getItem("currentUser")) {
    isloggedIn = false;
  }

  if (isloggedIn) {
    const userId = localStorage.getItem("currentUser")
    useEffect(() => {
      const fetchCartProducts = async () => {
        try {
          // Fetch cart products from the backend
          const response = await fetch(`http://localhost:9090/api/users/cartProducts/${userId}`);

          if (response.ok) {
            const cartProducts = await response.json();
            setMyCartData(cartProducts);
          } else {
            console.error('Failed to fetch cart products');
          }
        } catch (error) {
          console.error('Error fetching cart products:', error);
        }
      };

      fetchCartProducts();

    }, []);

    mycartData.forEach(obj => {
      
      const curProduct = {
        productImage: itemimg,
        productId : obj.productId,
        productName: obj.productName,
        productDescription: obj.productDescription,
        productPrice: obj.productPrice,
        productDiscount: obj.productDiscount,
        Discount: obj.productPrice-obj.productDiscount,
        productQuantity: obj.productQuantity,
        productCurQuantity : obj.productQuantityAddedToCart
      }

      cartData.push(curProduct);
    });
  }


  return (
    <>

      <div className="flex items-center justify-center h-14 mt-4 mb-3">
        <h1 className="text-teal-600 text-base font-bold">CART - - - - - - - - - - - - - ADDRESS - - - - - - - - - - - - - PAYMENT</h1>
      </div>

      <div className='w-full border border-gray-300'></div>



      {(cartData.length === 0 && isloggedIn) ?
        (
          <div className="text-center mt-10 mb-10">
            <img
              src={EmptyCartImg}
              alt="Empty Cart"
              className="mx-auto w-48 h-48"
            />
            <p className="mt-6 text-black text-2xl font-semibold">

              Your shopping cart is empty.
            </p>

            <p className='text-gray-500'>
              Please add something soon, carts have feelings too.
            </p>
          </div>
        ) : (
          isloggedIn ?
            (
              <CartItem cardsData={cartData} setCardsData={setMyCartData}/>

            ) : (

              <>
                <div className="text-center mt-10 mb-10">
                  <p className="text-gray-500 font-bold text-2xl mb-4">Please log in to view your cart</p>
                  <Link to="/login"
                    className="bg-blue-600 text-white px-20 py-2 rounded hover:no-underline hover:bg-blue-500"
                  >
                    Log In
                  </Link>
                </div>
              </>
            )
        )}
    </>
  )
}

export default Cart