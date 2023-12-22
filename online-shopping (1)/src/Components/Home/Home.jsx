import React from 'react'
import Carousel from './Carousel'
import Card from './Card'
import item1 from '../Home/Slider-items/item1.png'
import item2 from '../Home/Slider-items/item2.png'
import item3 from '../Home/Slider-items/item3.png'
import item4 from '../Home/Slider-items/item4.png'
import Clothes from '../Home/Card-Images/Clothes.png'
import Electronics from '../Home/Card-Images/Electronics.png'
import Grocery from '../Home/Card-Images/Grocery.png'
import Laptops from '../Home/Card-Images/Laptops.png'
import Medicine from '../Home/Card-Images/Medicine.png'
import Mobiles from '../Home/Card-Images/Mobiles.png'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

const slides = [item1, item2, item3, item4]

const cardData = [
  {title:'clothes', imgurl:Clothes},
  {title:'electronics', imgurl:Electronics},
  {title:'grocery', imgurl:Grocery},
  {title:'laptops', imgurl:Laptops},
  {title:'medicine', imgurl:Medicine},
  {title:'mobiles', imgurl:Mobiles},

]



function Home() 
{
  
  const memoizedCards = useMemo(() => (
    cardData.map((card) => (
      <Link to={`/categories/${card.title}`}>
        <Card imageUrl={card.imgurl} title={card.title} />
      </Link>
    ))
  ), [cardData]);

  const memoizedCarousel = useMemo(() =>(
    slides.map((s) => (
      <img src={s} />
    ))
  ), [slides]);

  return (
    <>
      {/*Carousel*/}
      <div>
        <Carousel autoSlide={true}>
          {memoizedCarousel}
        </Carousel>
      </div>

      <div className="text-center text-3xl uppercase font-semibold mt-10 text-gray-600">
      Categories
    </div>

      
      {/*Cards*/}
      <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-3 gap-6">
      {memoizedCards}
    </div>
      




    </>

  )
}

export default Home