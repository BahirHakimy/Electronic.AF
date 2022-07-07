import React, { useEffect, useState } from "react";
import Card from "../common/card";
import { axios, baseAxios, getTokens, setTokens } from "../Api/client";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import CardDetail from "./Table";
import { BsCart3, BsSearch } from "react-icons/bs";
import {toast} from 'react-toastify'

const Products = () => {
  const [data, setData] = useState();
  const [cartData, setCartData] = useState();
  const [authenticated] = useState(getTokens());
  const [visibility, setVisiblity] = useState({
    signIn: true,
    cart: false,
    input: true,
    logout: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    baseAxios
      .get("http://127.0.0.1:8000/api/core/getProducts/")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setVisiblity({ ...visibility, signIn: false, logout: true });
    axios
      .post("http://127.0.0.1:8000/api/core/getCart/", {
        email: jwtDecode(authenticated.access).email,
      })
      .then(
        (res) => setCartData(res.data.items),
      );


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const handleClick = (type) => {
    if (type === "svg") setVisiblity({ ...visibility, cart: !visibility.cart });
    if (authenticated &&  type === "cart") navigate("/cart", {state : { email : authenticated?.access}}) ;
    if(type === 'cart' && !authenticated) toast.error('Please Sign In');
  };

  return (
    <div>
      {/* navbar  */}
      <div className="flex justify-between bg-primaryDark py-3 px-10">
        {/* logo and the links  */}
        <div className="flex space-x-16 font-bold">
          <h1 className="text-2xl font-bold text-white">Electronic.AF</h1>
          <h3 className="text-lg text-white">Category</h3>
          <h3 className="text-lg text-white">About Us</h3>
        </div>

        {/* cart */}
        <div className="flex space-x-16 pr-20">
          {/* //*  sign in button */}
          <button
            className={`bg-white text-primary font-semibold px-10 py-1 rounded-md hover:text-black hover:font-bold ${
              visibility.signIn ? "block" : "hidden"
            }`}
          >
            <Link to={"/login"}>Sign In</Link>
          </button>

          {/* //* button for logout  */}
          <button
            onClick={() => {
              setTokens(null);
              navigate("/");
            }}
            className={` bg-white text-primary font-semibold px-10 py-1 rounded-md hover:text-black ${
              visibility.logout ? "block" : "hidden"
            }`}
          >
            Log Out
          </button>

          {/* //* cart Icon */}
          <div className="relative ">
            {/* //* svg */}
            {/* //todo styling here in the cart on hover  */}
            <div className="relative">
              <BsCart3
                className="text-xl text-white hover:scale-105"
                size={32}
                onClick={() => handleClick("svg")}
              />
              <span
                className={`${
                  authenticated?.access ? "inline-block" : "hidden"
                } absolute text-white text-center font-semibold -top-3 -right-2 border border-primary bg-primary rounded-full w-6 scale-75`}
              >
                {cartData?.length}
              </span>
            </div>

            {/* cart card  */}
            <div
              className={`mt-2 absolute shadow-md  top-8 -right-6
                bg-white rounded-md z-10 h-64 w-66 divide-y-2 divide-gray-200 space-y-1 overflow-y-auto ${
                  visibility.cart ? "block" : "hidden"
                }`}
            >
              {authenticated?.access === undefined ? (
                <h2 className="font-semibold capitalize text-center w-20 mx-auto self-center">
                  Please Sign In to Get Cart Info
                </h2>
              ) : (
                cartData?.map((data) => (
                  <CardDetail key={data.product.id} info={data} style={{height: "h-16" , width: "w-16", priceVisibility : true, hover: 'hover:bg-primary hover:grow hover:text-white', deleteVisible : true}} />
                ))
              )}
              <div className="pt-2 space-x-4 px-4">
                {/* <button className="border border-secondary  rounded-md px-2 py-0.5 hover:bg-primaryLight hover:text-white hover:border-gray-100">Keep Shopping</button> */}
                <button
                  onClick={() => handleClick("cart")}
                  className="w-full bg-primary text-white px-2 rounded py-0.5 hover:bg-white hover:text-primary hover:border-secondary hover:border hover:scale-105"
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body  */}

      {/* //* input */}
      <div>
        <form>
          <div className="flex justify-end items-center mr-24 mt-8 relative">
            <BsSearch className="h-4 w-4 absolute right-60" />
            <input
              type="text"
              className="pl-7 customizeForm w-64"
              placeholder="Search for products"
            />
          </div>
        </form>
      </div>
      {/* card  */}
      <div className="pl-8">
        <h1 className="font-bold text-3xl pl-10">Top Deals</h1>
        <div className="flex space-x-10 pt-8">
          {data ? (
            data.map((info) => (
              <Card key={info.id} authenticated={authenticated} info={info} />
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default Products;
