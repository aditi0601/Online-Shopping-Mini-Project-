import React from 'react'
import productimg from './Clothes-images/sample.png'
import PriceCard from '../Products/PriceCard'
import { useMemo } from 'react'
import { useAuth } from '../../Context/AuthProvider'
import { useState, useEffect } from 'react'




function Clothes() {

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/api/products/byCategory/clothes')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);




  const memoizedPriceCards = useMemo(() => (
    productData.map((card) => (
      <PriceCard productId={card.productId} imgUrl={productimg} productName={card.productName} productDescription={card.productDescription}
        productPrice={card.productPrice} productDiscount={card.productDiscount} productQuantity={card.productQuantity}
        productCategory={card.productCategory}
      />
    ))
  ), [productData]);



  
  if(productData.length !== 0) {

    return (
      <>

        <div className="max-w-screen-xl mx-auto p-6 flex flex-wrap gap-6 mb-20">
          {memoizedPriceCards}
        </div>



      </>
    )
  }
}

export default Clothes