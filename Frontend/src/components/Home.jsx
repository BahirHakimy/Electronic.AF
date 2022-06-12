import React from 'react'
import { Link } from 'react-router-dom';
import Vector from '../illustrations/Vector.svg'
import surfing from '../illustrations/surfing.svg'

function Home() {

  return (
    <div className=''>
      {/* //* navbar */}
      <div className='flex justify-between mx-32 pt-12 '>
        {/* //*  logo */}
        <div>
            <h1 className='text-4xl font-semibold '>
              <span className='font-serif text-5xl '>E</span>.AF</h1>
        </div>

        {/* //* links  */}
          <div className='space-x-20'>
                <span className='font-bold text-xl '><Link to={'/logIn'}>Sign In</Link></span>
                <span className='font-bold text-xl '><Link to={'/about'}>About Us</Link></span>
                <button className='font-bold text-xl bg-primaryLight rounded-lg px-12 py-1 text-center hover:bg-primary hover:text-white'><Link to={'/products'}>Browse</Link></button>
          </div>
      </div>

      {/* //* body   */}
      <div className='pt-24 ml-24 '>
            {/* colOne */}
          <div className='max-w-prose text-center'>
             {/* title  */}
               <h1 className='text-3xl font-bold pb-4'>Electronic<span className='text-primary'>.AF</span></h1>
               <h2 className='text-3xl font-bold pb-9'><span className='bg-clip-text text-4xl  bg-gradient-to-r from-secondary to-primaryLight text-transparent '>Surf</span> Through the Ocean Of Quality</h2>
                <p className='text-gray-500 text-lg pb-4'>Electronic.AF brings quality to the country by bringing the most reliable <strong className='text-black'>Computer</strong> products from the most reliable recources.</p>
               {/* buttons */}
               <div className='space-x-10 '>
               <button onClick={() => console.log('clicked')} className='bg-primaryLight text-lg rounded-lg font-bold px-8 hover:bg-primary hover:text-white'><Link to={'/products'}>Browse</Link></button> 
                <button className='border border-secondary shadow-md rounded-md px-6 hover:bg-primaryLight hover:border-0 hover:font-bold hover:text-white'>About Us</button>
               </div>
          </div>
      </div >
          {/* //*svg */}
            <div className='relative '>
             <img src={surfing} alt="surfing" className='scale-125 absolute right-4 -top-16 2xl:-top-32 z-10' />
              <img src={Vector} alt="wave" className=' absolute w-full top-24 2xl:-translate-y-20'/>
           </div>
         
    </div>
  )
}

export default Home