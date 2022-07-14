
const Carousel = ({images}) => {

  if(images !== undefined)
  return (
        <div className='pt-5'>
              <img src={`http://127.0.0.1:8000${images[0]?.image}`} alt="surfing" className="w-10/12 rounded-md"/>
              {images.length > 1 ?  <div className='flex space-x-8 pt-10'>
              <img src={`http://127.0.0.1:8000${images[1]?.image}`} alt="surfing" className=" w-64 rounded-md "/>
              <img src={`http://127.0.0.1:8000${images[2]?.image}`} alt="surfing" className=" w-64 rounded-md "/>
              </div> : null }
       </div>
  )
// todo to add loader io in here 
  return <h1>...</h1>
}

export default Carousel
