import React from 'react'



function MyOrder({ productImage, productName, productDescription, productQuantity}) {
  return (
    <>




      <tr>
        <td className="border py-1.5 text-center">




          <div className="justify-between bg-white p-3 sm:flex sm:justify-start relative">
            <img
              src={productImage}
              alt={`Product - ${productName}`}
              className="w-40 h-40 object-cover rounded-lg sm:w-52"
            />

            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {productName}
                </h2>
                <p className="mt-1 text-sm text-gray-700">{productDescription}</p>


                <div>
                  <div className='w-full border border-gray-500 mt-2 mb-2'></div>

                  <div className="flex items-center mt-4">
                    <label className="mr-2 text-gray-700">Quantity:</label>
                    <span className="text-base font-semibold text-gray-700">
                      {productQuantity}
                    </span>

                  </div>

                  <div className="flex mt-2">
                    <button className="rounded-lg text-xs border border-teal-500 text-teal-500 p-2 mr-2">Track Order</button>
                    <button className="rounded-lg text-xs border border-teal-500 text-teal-500 p-2">Return/Exchange</button>
                  </div>

                </div>
              </div>

            </div>


          </div>

        </td>
      </tr>


    </>
  )
}

export default MyOrder