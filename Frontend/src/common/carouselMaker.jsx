import surfing from '../illustrations/surfing.svg';
import building from '../illustrations/building.svg';
import sign from '../illustrations/sign.svg';



const Carousel = () => {
  return (
        <div>
              <img src={surfing} alt="surfing" className="h-full w-full"/>
              <div className='flex space-x-8'>
              <img src={building} alt="surfing" className="h-64 w-64 "/>
              <img src={sign} alt="surfing" className="h-64 w-64 "/>
              </div>
       </div>
  )
}

export default Carousel
