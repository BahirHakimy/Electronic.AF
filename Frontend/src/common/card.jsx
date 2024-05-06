import React from "react";
import { jwtDecode } from "jwt-decode";
import { axios } from "../Api/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

//todo add to cart directly from the cards right now i did not know how to put the content properly

const Card = ({ info, authenticated }) => {
  const handleClick = () => {
    if (authenticated) {
      axios
        .post(`${process.env.REACT_APP_baseURL}core/addToCart/`, {
          email: jwtDecode(authenticated.access).email,
          productId: info.id,
        })
        .then((res) => toast.success(res.data.detail));
    } else {
      toast.error("Please Sign In!");
    }
  };

  return (
    <div className="bg-white rounded-md lg:max-w-96 shadow-lg  cursor-pointer  ">
      <Link className="" to={`/products/${info.id}`} params={authenticated}>
        <div className="aspect-square ">
          <img
            src={`${info.images[0].image}`}
            alt="Product"
            className="object-cover h-full w-full  rounded-md"
          />
        </div>
        <div className=" px-4 pt-8 pb-4 space-y-8">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl ">{info.title}</h2>
            <p className=" text-gray-600 text-lg truncate ">
              {info.description}
            </p>
          </div>
          <button className="bg-primary w-full py-4 px-8 rounded-full font-bold text-lg  hover:scale-105 transition-transform">
            Learn More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
