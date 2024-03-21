import React from "react";
import { jwtDecode } from "jwt-decode";
import { axios } from "../Api/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const Card = ({ info, authenticated }) => {
  const [buttonCartState, setButtonCartState] = useState(false);

  const handleClick = () => {
    if (authenticated) {
      axios
        .post(`${process.env.REACT_APP_baseURL}core/addToCart/`, {
          email: jwtDecode(authenticated.access).email,
          productId: info.id,
        })
        .then(
          (res) => toast.success(res.data.detail),
          setButtonCartState(true)
        );
      // todo make the success color primary
    } else {
      toast.error("Please Sign In!");
    }
  };

  return (
    <div className="bg-white rounded-md grid    shadow-lg hover:scale-105 transition-transform ">
      <img
        src={`${info.images[0].image}`}
        alt="Product"
        className=" h-44 rounded object-cover"
      />

      <div className="pt-4 flex justify-between  ">
        <section>
          <h2 className="font-semibold text-lg pl-2">{info.title}</h2>
          <p className="text-sm text-gray-600 pl-2 w-[35ch]">
            {info.description}
          </p>
        </section>
        <CiHeart size={24} />
      </div>

      <div className="flex items-center justify-between px-2 py-3  ">
        <button className="bg-primary py-2 px-4  rounded  text-white">
          <Link to={`/products/${info.id}`} params={authenticated}>
            Learn more
          </Link>
        </button>

        {buttonCartState ? (
          <FaShoppingCart size={24} />
        ) : (
          <CiShoppingCart
            className="cursor-pointer "
            onClick={handleClick}
            title="Add to cart"
            size={32}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
