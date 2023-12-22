import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteCards from './DeleteCards';
import productimg from '../Categories/Clothes/Clothes-images/sample.png'

function DeleteProduct() 
{
    const [allProducts, setAllProducts] = useState([]);
    useEffect(()=>{
        const fetchproducts = async () =>{
            try {
                const response = await axios.get("http://localhost:9090/api/products/getAllProducts")
    
                setAllProducts(response.data)
                
            } catch (error) 
            {
                console.log(error);
                
            }

        }
        fetchproducts()
    }, [])

    
    

  return (
    <div>
        {allProducts.map((card) => (
      <DeleteCards productId={card.productId} imgUrl={productimg} productName={card.productName} productDescription={card.productDescription}
        productPrice={card.productPrice} productDiscount={card.productDiscount}
      />
    ))}
    </div>
  )
}

export default DeleteProduct