
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom'
import {baseAxios, getTokens} from '../Api/client'
import Card from '../common/card';
import {FaSadTear} from 'react-icons/fa'

const CategoryDetails = () => {

    const params = useParams();
    const [authenticated] = useState(getTokens());
    const [data, setData] = useState();
    const [modifiedRadioValue, setModifiedRadioValue] = useState()
    const [modifiedData, setModifiedData] = useState()

    useEffect(() => {
      baseAxios
        .get("http://127.0.0.1:8000/api/core/getProducts/")
        .then((res) => setData(res.data))
        .catch(e => {
            //todo error handling in here
        })
        
        // setModifiedData(data?.filter(type => type.vendor === params.vendor))
    }, []);

    useEffect(() => {
        setModifiedData(data?.filter(type => type.vendor === params.vendor))
    },[params.vendor, data])
   
    

    const handleChange = value => {
                

        switch(value.target.value){
            case 'price' :  modifiedData.sort((a,b) => a.price - b.price) ;
            break;
            case 'storage' : modifiedData.sort((a,b) => a.storage - b.stroage);
            break;
            

            
            default  : return modifiedData;
        }

    }

    

    
  return (
    <div >
        <div className='flex pt-5 '>

        {/* link tree */}
        <div className=' pl-5 '>
        <Link to={'/products'}>
            <span className='font-semibold hover:text-gray-400 '>Products</span>
        </Link>
            <span className='px-1'>/</span>
            <span className='font-semibold text-gray-500'>Category</span>
            <span className='px-1 '>/</span>
            <span className='uppercase'>{params?.vendor}</span>
        </div>

        {/* links to categories  */}

        <div className='pl-72 space-x-8'>
            <NavLink to={'/products/category/HP'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'} >HP</NavLink>
            <NavLink to={'/products/category/DELL'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Dell</NavLink>
            <NavLink to={'/products/category/apple'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2 ' : 'no-underline '}>Apple</NavLink>
            <NavLink to={'/products/category/lenovo'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Lenovo</NavLink>
            <NavLink to={'/products/category/msi'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Msi</NavLink>
            <NavLink to={'/products/category/asus'}className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Asus</NavLink>
        </div>


        </div>
    
            <div className='grid grid-cols-3'>
        {/* sidebar for filtering according to price storage year of manufacturing  */}
                <div className='col-span-1'>
                        <div className=''>
                            <h1 className='bg-primary text-white text-center rounded w-56 ml-4 mt-20'>Filter</h1>
                            <div className='border-2 w-56 ml-4 divide-y-2 space-y-1 rounded'>
                                 <div className='pl-2'>
                                <input type="radio" name="filter" id="all" className=' text-primary focus:ring-0' value={'All'}  onChange={handleChange} />
                                <label htmlFor="all" className='pl-2'>All</label>
                                </div>
                                <div className='pl-2'>
                                <input type="radio" name="filter" id="price" className=' text-primary focus:ring-0' value={'price'}  onChange={handleChange} />
                                <label htmlFor="price" className='pl-2'>Price</label>
                                </div>
                                <div className='pl-2'>
                                <input type="radio" name="filter" id="storage" className='text-primary focus:ring-0' value={'storage'} onChange={handleChange}/>
                                <label htmlFor="storage" className='pl-2'>Stroage</label>
                                </div>
                                <div className='pl-2 pb-1'>
                                <input type="radio" name="filter" id="model" className='text-primary focus:ring-0' value={'model'} onChange={handleChange}/>
                                <label htmlFor="model" className='pl-2'>Model</label>
                                </div>
                            </div>
                        </div>
                        
                </div>

        {/* showing the results  */}
                <div className='col-span-2 mt-20'>
                            {modifiedData?.length !== 0 ? modifiedData?.map(info => <Card key={info.id} info={info} authenticated={authenticated}/> ) : <h1 className='capitalize flex justify-start ml-24'>There are no products for this category <FaSadTear className=' text-gray-400 ml-3 mt-1.5'/>  </h1>}
                </div>

            </div>
    </div>
  )
}

export default CategoryDetails