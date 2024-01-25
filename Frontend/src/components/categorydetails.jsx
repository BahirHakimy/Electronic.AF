
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
        .get(`${process.env.baseURL}core/getProducts/`)
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
            case 'model' : modifiedData.sort((a,b)=> a.model - b.model);
            break;
            case 'all' : return modifiedData;
            
            default  : return modifiedData;
        }

    }

    

    
  return (
    <div >
        <div className='md:flex pt-5 '>

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

        <div className='lg:pl-72 md:pl-20 pl-5 space-x-4 md:space-x-8 pt-5 md:pt-0 '>
            <NavLink to={'/products/category/HP'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'} >HP</NavLink>
            <NavLink to={'/products/category/DELL'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Dell</NavLink>
            <NavLink to={'/products/category/apple'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2 ' : 'no-underline '}>Apple</NavLink>
            <NavLink to={'/products/category/lenovo'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Lenovo</NavLink>
            <NavLink to={'/products/category/msi'} className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Msi</NavLink>
            <NavLink to={'/products/category/asus'}className={({isActive}) => isActive ? 'underline underline-offset-4 decoration-primary decoration-2' : 'no-underline'}>Asus</NavLink>
        </div>


        </div>
    
            <div className='md:grid grid-cols-3'>
        {/* sidebar for filtering according to price storage year of manufacturing  */}
                <div className='col-span-1 '>
                        <div className='w-56 ml-5 mt-5 md:mt-0 '>
                            <h1 className='md:bg-primary md:text-white md:text-center md:rounded  md:ml-4 md:mt-20'>Filter:</h1>
                            <div className='flex md:block  md:border-2  md:ml-4 md:divide-y-2 md:space-y-1 md:rounded space-x-2 md:space-x-0 pt-2 md:pt-0'>
                                <div className='pl-1 md:pl-2 flex md:flex-none items-center'>
                                <input type="radio" name="filter" id="all" className='text-primary focus:ring-0' value={'All'}  onChange={handleChange} />
                                <label htmlFor="all" className='pl-2'>All</label>
                                </div>
                                <div className='pl-1 md:pl-2 flex md:flex-none items-center'>
                                <input type="radio" name="filter" id="price" className=' text-primary focus:ring-0' value={'price'}  onChange={handleChange} />
                                <label htmlFor="price" className='pl-2'>Price</label>
                                </div>
                                <div className='pl-1 md:pl-2 flex md:flex-none items-center'>
                                <input type="radio" name="filter" id="storage" className='text-primary focus:ring-0' value={'storage'} onChange={handleChange}/>
                                <label htmlFor="storage" className='pl-2'>Stroage</label>
                                </div>
                                <div className='pl-1 md:pl-2 md:pb-1 flex md:flex-none items-center'>
                                <input type="radio" name="filter" id="model" className='text-primary focus:ring-0' value={'model'} onChange={handleChange}/>
                                <label htmlFor="model" className='pl-2'>Model</label>
                                </div>
                            </div>
                        </div>
                        
                </div>

        {/* showing the results  */}
                <div className='col-span-2 mt-20 md:ml-24 mx-6 md:mx-0 '>
                            {modifiedData?.length !== 0 ? modifiedData?.map(info => <Card key={info.id} info={info} authenticated={authenticated}/> ) : <h1 className='capitalize  md:flex md:justify-start md:ml-24 '>There are no products for this category <FaSadTear className=' text-gray-400 inline-block md:ml-3 md:mt-1.5'/>  </h1>}
                </div>

            </div>
    </div>
  )
}

export default CategoryDetails