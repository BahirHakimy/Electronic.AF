import React from "react";
import {jwtDecode} from "jwt-decode";
import { axios } from "../Api/client";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Link } from "react-router-dom";




const Card = ({ info, authenticated }) => {

  const [buttonCartState,setButtonCartState] = useState(false);

  const handleClick = () => {
    if(authenticated.access){
    axios.post("http://127.0.0.1:8000/api/core/addToCart/",{
      email: jwtDecode(authenticated.access).email,
      productId : info.id
    }).then(res => 
      toast.success(res.data.detail),
      setButtonCartState(true)
      )
    // todo make the success color primary 
  }else{
      toast.error('Please Sign In!')
  }
 
};

  return (
    <div className="bg-white w-64 rounded-md  shadow-md hover:scale-105 transition-transform grid  ">
   
     <img
        src={`http://127.0.0.1:8000${info.images[0].image}`}
        alt="Product"
        className="rounded-md w-full h-44 "
      />

      <div className="pt-3">
        <h2 className="font-semibold text-lg pl-2">{info.title}</h2>
        <p className="text-sm text-gray-600 pl-2">{info.description}</p>
      </div>

      <div className="m-2 space-x-2">
        <button className="bg-primary px-3 rounded-md hover:shadow-md text-white py-0.">
          <Link to={`/products/${info.id}`} params={authenticated}   >
           Learn more
          </Link>
        </button>
       {/* //? to be changed with click and must show added to cart */}
        <button
          onClick={handleClick}
          className=" rounded-md hover:shadow-md hover:text-black hover:font-semibold px-3"
        >
          {buttonCartState ? 'Added to Cart': 'Add to cart'}
        </button>
      
      </div>
    </div>
  );
};

export default Card;
