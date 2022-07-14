import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../common/navbar";
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/fa'


const About = () => {

   const [data, setData] = useState({
    BahirPic: '',
    BahirName : '', 
    BahirBio: '',
    MehdiPic: '',
    MehdiName :'',
    MehdiBio: ''
   })


  //! not woriking properly and just rendering 2 times
  useEffect(() => {
    axios.get('https://api.github.com/users/BahirHakimy')
    .then(res => setData({...data,BahirPic: res.data.avatar_url, BahirName: res.data.name, BahirBio: res.data.bio}))

    axios.get('https://api.github.com/users/MW25-HUSH')
    .then(res => setData({...data,MehdiPic : res.data.avatar_url, MehdiName: res.data.name, MehdiBio : res.data.bio}))
      
  },[])


    console.log(data);
  return (
    <div className="container"> 
      {/* Navbar */}
        <Navbar />

      {/* title and some texts for the webiste like surf through the ocean of quality  */}
          {/*//!  mx-auto not working  */}
      <div className="flex justify-center pt-10 flex-wrap ">
        <div >
        <h1 className="text-lg"><span className="font-bold text-2xl bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">Electronic.AF</span> is changing the <span className="font-semibold">E-commerce</span> game</h1>
          <button className="bg-primaryDark text-white rounded-lg w-64 px-5 py-1 mt-4 mx-20 hover:bg-white hover:border hover:text-black hover:border-primary"><Link to={'/'}>Get Started</Link></button>
        </div>
      </div>

      {/* github profile of two of us  */}

      <div className=" py-20">

        <div className=" pl-10 flex ">
          <img src={data.BahirPic} alt="user" className="rounded-full w-40 " />
          <div className="pl-4 self-center">
          <h1 className="font-semibold ">{data.BahirName}</h1>
          <p>{data.BahirBio}</p>
          </div>
        </div>

        <div className="flex justify-end pr-20">
            <div className="self-center pr-4">
                  <h1 className="font-semibold">{data.MehdiName}</h1>
                  <p>{data.MehdiBio}</p>
            </div>
            <img src={data.MehdiPic} alt="Mehdi user"  className="rounded-full w-40 "/>
        </div>

        <div className="pl-10 max-w-prose leading-6 relative">
          <p className="font-semibold capitalize">A few words from the Creators:</p>
          <FaQuoteLeft className="mt-2"/>
          <p className="capitalize text-gray-400 pt-1">We would like to thank everyone for their support and for putting their faith in us during the process of making this e-commerce application.</p>
          <p className="text-gray-400 capitalize">Our Country is trying to catch up rapidly with the digital world and it's phenomenos, so we can proudly say we are <span className="text-secondary font-semibold">trying to be part of it.</span>  </p>
          <FaQuoteRight className="absolute left-full"/>
        </div>

      </div>

      {/* then the offering this webiste has  */}
          <div className="pl-10 max-w-prose pb-10">
              <p className="text-primary font-bold text-xl pb-1">Our Story</p>
              <p className="capitalize font-bold">We are helping in modernizing Afghanistan and opening new ways for digital business.</p>
              <p className="capitalize font-bold text-xl italic">Your Trust is our value</p>
          </div>
      
    </div>
  )
}

export default About