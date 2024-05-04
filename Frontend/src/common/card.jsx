import React from "react";
import { jwtDecode } from "jwt-decode";
import { axios } from "../Api/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
    <div className="bg-white rounded-md max-w-80 shadow-lg  cursor-pointer  ">
      <Link className="" to={`/products/${info.id}`} params={authenticated}>
        <div className="aspect-square ">
          <img
            src={`http://127.0.0.1:8000${info.images[0].image}`}
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
          <button
            onClick={handleClick}
            className="bg-primary w-full py-4 px-8 rounded-full  text-white font-bold text-lg  hover:scale-105 transition-transform"
          >
            Learn More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
