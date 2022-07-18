import {FaUserCircle} from 'react-icons/fa'
import StarRatingComponent from 'react-star-rating-component';


const Review = ({review}) => {
    // console.log(review);
  return (
    <div className='space-y-2'>
        {review.map(rev =>
         <div key={rev.username} className='flex  '>
         <div className='flex shadow-md border border-gray-200  rounded-tl-xl rounded-br-xl   '>
            <span className='px-2 pt-0.5 bg'>{rev.rating}.0</span>
            
            <StarRatingComponent value={rev.rating} className="border-2 border-primary  rounded-tl-xl rounded-br-lg bg-primary pl-1 space-x-2  " name='rating' starColor='white' emptyStarColor='' />
            </div>
                <div className='text-xs pl-4 relative'>
                    <div className='flex space-x-2 '>
                    <FaUserCircle/> 
                    <span className='font-bold '>{rev.username}</span>
                    </div>
                    <span className='block absolute truncate '>{rev.review}</span>
                </div>
           

         </div>
        )}
    </div>
  )
}

export default Review