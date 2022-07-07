import { useState } from 'react';
import { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom'
import { axios } from '../Api/client';
import Carousel from '../common/carouselMaker';
import StarRatingComponent from 'react-star-rating-component';
import {RiEmotionSadLine} from 'react-icons/ri'
import { useCookies } from 'react-cookie';

const ProductDetails = () => {
  const {productId} = useParams();
  const [productData, setProductData] = useState();
  const [review, setReview] = useState();
  const [selfReview, setSelfReview] = useState();
  const [cookie] = useCookies(['email']);
  let avgStar = 0;

  // ? useEffect for product detail
  useEffect(() => {
        axios.post(`http://127.0.0.1:8000/api/core/getProduct/`, {
            id : productId
        }).then(
            res => setProductData(res.data)
        ).catch(e=> {
          //todo to error handle in here 
          console.log(e);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // ? useEffect for getReview All 
    useEffect(() => {
      axios.post(`http://127.0.0.1:8000/api/core/getProductReviews/`,{
        productId
      })
      .then(res => setReview(res.data))
      .catch(e => {
        //todo to error handle in here 
        console.log(e);
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

      

    // ? useEffect for getReview self
    useEffect(() => {
      axios.post(`http://127.0.0.1:8000/api/core/getUserReview/`,{
        productId,
        email: cookie.email
      })
      .then(res => setSelfReview(res.data))
      .catch(e => {
        //todo error handle in here 
        
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
   

  return (
    <div className='p-5'>
        {/* links tree */}
        <div className='pl-2 pt-2 '>
        <Link to={'/'}>
            <span className='font-semibold hover:text-gray-400'>Products</span>
        </Link>
        <span  className='px-2 '>/</span>
          <Link to={'category/hp'}>
          <span className='font-semibold hover:text-gray-400'>HP</span>
          </Link>
          <span className='px-2'>/</span>
            <Link to={'#'}>
             <span className='text-gray-400 hover:text-black hover:font-semibold'>
              {productData?.title}
              </span> 
            </Link>
        </div>
      
      {/* section */}
      <div className='grid grid-cols-2 '>
      {/* pictures  */}
            <div className='col-span-1'>
                  <Carousel />
              </div> 

      {/* info about product  */}
      <div className='col-span-1 divide-y-2 space-y-5'>


            <div>
         {/* Name  */}
                <h1 className='font-bold text-lg'>
                {productData?.title}
              </h1>
          {/* review and price   */}

          <div className='flex justify-between pr-7 pt-3'> 
              
              <StarRatingComponent
              name='rating'
              editing={false}
              //todo problem may be in the logic 
              value={Array.isArray(review) ? review.map(num => avgStar += num.rating) : 0}
              />

            {productData?.price}$
          </div>

          {/* properties ram storage  */}
              <div className='pt-10 '>
                    <p><span className='font-bold pr-1'>CPU</span> : {productData?.cpu}</p>
                    <p><span className='font-bold pr-1'>GPU</span> : {productData?.gpu}</p>
                    <p><span className='font-bold pr-1'>OS</span> : {productData?.os}</p>
                    <p><span className='font-bold pr-1'>RAM</span>: {productData?.memory}</p>
                    <p><span className='font-bold pr-1'>Storage</span> : {productData?.storage}</p>
                    <p><span className='font-bold pr-1'>Storage Type</span>: {productData?.storageType} </p>
              </div>

               {/* add to cart  */}

          <div className='px-10 pt-7 mx-auto'>
            <button className='border rounded bg-primary border-primary text-white w-full h-10 hover:bg-white hover:ring-black hover:border-black hover:text-primary  '>Add to Cart</button>
          </div>

              </div>

          {/* description  */}

          <div className='pt-5'>
            <p className='font-semibold'>Description:</p>
             &nbsp; {productData?.description}
          </div>

          {/* review  */}

          <div className='pt-3'>
              {Array.isArray(review) ? <h1>true</h1> : <div className='flex text-gray-400 space-x-2 justify-center'> <h1>This Product has no review</h1> <RiEmotionSadLine className='mt-1' size={18}/></div>}

          </div>

      </div>
         

      </div>
     


     </div>
  )
}

export default ProductDetails

