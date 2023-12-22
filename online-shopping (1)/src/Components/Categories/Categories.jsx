import React from 'react'
import Clothes from '../Home/Card-Images/Clothes.png'
import Electronics from '../Home/Card-Images/Electronics.png'
import Grocery from '../Home/Card-Images/Grocery.png'
import Laptops from '../Home/Card-Images/Laptops.png'
import Medicine from '../Home/Card-Images/Medicine.png'
import Mobiles from '../Home/Card-Images/Mobiles.png'
import Card from '../Home/Card'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'



const cardData = [
  { title: 'clothes', imgurl: Clothes },
  { title: 'electronics', imgurl: Electronics },
  { title: 'grocery', imgurl: Grocery },
  { title: 'laptops', imgurl: Laptops },
  { title: 'medicine', imgurl: Medicine },
  { title: 'mobiles', imgurl: Mobiles },

]

function Categories() 
{
  const memoizedCards = useMemo(() => (
    cardData.map((card) => (
      <Link to={`/categories/${card.title}`}>
        <Card imageUrl={card.imgurl} title={card.title} />
      </Link>
    ))
  ), [cardData]);


  return (
    <div>

      <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-3 gap-6">
        {memoizedCards}
      </div>




    </div>
  )
}

export default Categories