import React from 'react'
import { useParams } from 'react-router-dom'
import myimg from '../Home/Card-Images/Clothes.png'
import myimg2 from '../Home/Card-Images/Mobiles.png'
import myim3 from '../Categories/Clothes/Clothes-images/sample.png'
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { useState, useEffect } from 'react'



function ProductWithId() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProductDetails(productData);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (productDetails) {
    return (
      <>
        <ProductDetailsCard
          productId={productId}
          productName={productDetails.productName}
          productDescription={productDetails.productDescription}
          productPrice={productDetails.productPrice}
          productDiscount={productDetails.productDiscount}
          productQuantity={productDetails.productQuantity}
          productImages={[myimg, myimg2, myimg, myim3]}
        />
      </>
    );
  }
}

export default ProductWithId