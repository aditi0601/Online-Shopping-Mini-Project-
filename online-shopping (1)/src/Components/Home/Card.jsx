import React from 'react'




function Card({imageUrl, title}) 
{
  return (
    <div>

        <div className="max-h-full max-w-full mx-auto overflow-hidden bg-white shadow-lg">
          <div className="relative overflow-hidden group">
            <img
              className="object-cover w-full h-48 transform transition-transform group-hover:scale-125"
              src= {imageUrl}
              alt={title}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
          <h2 className="text-white text-2xl font-bold uppercase font-mono">{title}</h2>
        </div>
          </div>

          

        </div>
      </div>

  )
}

export default Card