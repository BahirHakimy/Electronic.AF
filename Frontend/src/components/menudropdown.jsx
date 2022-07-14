
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {SiApple, SiAsus, SiDell, SiHp, SiLenovo, SiMitsubishi} from 'react-icons/si'

const MyDropdown = () => {
   const [open,setOpen] =  useState(true)

    const handleClick = () => setOpen(!open)
    
  return (
    <div onClick={handleClick} className='relative'>
        <h1  className='text-lg cursor-pointer'>Companies</h1>

        <div hidden={open} className='absolute bg-white shadow-lg w-40 rounded-md px-1 pt-1  '>
            
            <Link to={'category/HP'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white rounded pb-1  '>
                <SiHp className='self-center'/>
                <span>HP</span>
                </div>
            </Link>
          
            <Link to={'category/DELL'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white rounded pb-1  '>
                <SiDell className='self-center'/>
                <span>Dell</span>
                </div>
            </Link>

            <Link to={'category/LENOVO'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white rounded pb-1  '>
                <SiLenovo className='self-center'/>
                <span>Lenovo</span>
                </div>
            </Link>

                
            <Link to={'category/APPLE'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white rounded pb-1  '>
                <SiApple className='self-center'/>
                <span>Apple</span>
                </div>
            </Link>                
           

            <Link to={'category/MSI'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white  pb-1  '>
                <SiMitsubishi className='self-center'/>
                <span>Msi</span>
                </div>
            </Link>
             
            <Link to={'category/ASUS'}>
                <div className='flex space-x-4 pl-2 hover:bg-primary hover:text-white pb-1    '>
                <SiAsus className='self-center'/>
                <span>Asus</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default MyDropdown