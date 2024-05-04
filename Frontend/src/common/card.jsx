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
    <div className="bg-white rounded-md max-w-80 shadow-lg hover:scale-105  cursor-pointer  transition-transform">
      <Link
        className="grid h-full"
        to={`/products/${info.id}`}
        params={authenticated}
      >
        <div className="aspect-square ">
          <img
            src={`http://127.0.0.1:8000${info.images[0].image}`}
            alt="Product"
            className="object-cover h-full w-full  rounded-md"
          />
        </div>
        <div className="grid grid-rows-2 gap-4 px-2 py-4">
          <div>
            <h2 className="font-semibold text-lg pl-2">{info.title}</h2>
            <p className="text-sm text-gray-600 pl-2 w-[35ch]">
              {info.description}
            </p>
          </div>

          <div className="flex items-center justify-between px-2 py-3 grow  ">
            <button
              onClick={handleClick}
              className="bg-primary py-2 px-4 rounded-full  text-white"
            >
              Add to Cart +
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
