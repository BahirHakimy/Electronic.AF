import React from 'react'

const Card = info => {
  return (
    <div className='bg-white w-60 rounded-md  shadow-md hover:scale-105 transition-transform grid '>
        <img src={`http://127.0.0.1:8000${info.images[0].image}`} alt="Product" className='rounded-md w-full h-44 '/>

        <div className='pt-3'>
        <h2 className='font-semibold text-lg pl-2'>{info.title}</h2>
        <p className='text-sm text-gray-600 pl-2'>{info.description}</p>
        </div>

        <div className='m-2 space-x-2'>
        <button className='bg-primary px-3 rounded-md hover:shadow-md text-white py-0.'>Learn more</button>
        <button className=' rounded-md hover:shadow-md hover:text-black hover:font-semibold px-3'>Add to cart</button>
        </div>

    </div>
  )
}

export default Card