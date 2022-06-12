import React, { useEffect, useState } from "react";
import Card from "../common/card";
import { axios, baseAxios, getTokens, setTokens } from "../Api/client";
import jwtDecode from "jwt-decode";
import { useAuth } from "../hooks/authContext";
import { useNavigate } from "react-router-dom";
import CardDetail from "./Table";

const Products = () => {
  const [data, setData] = useState();
  const [cartData, setCartData] = useState();
  const [authenticated] = useState(getTokens());
  const [visibility, setVisiblity] = useState({
    signIn: false,
    cart: false,
    input: true,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (type) => {
    switch (type) {
      case "logOut":
        setTokens(null);
        navigate("/");
        break;
      case "cart":
        setVisiblity({
          ...visibility,
          cart: !visibility.cart,
          input: !visibility.input,
        });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    baseAxios
      .get("http://127.0.0.1:8000/api/core/getProducts/")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (jwtDecode(authenticated.access))
      setVisiblity({ ...visibility, signIn: true });

    if (jwtDecode(authenticated.access) && user.email !== "") {
      axios
        .post("http://127.0.0.1:8000/api/core/getCart/", {
          email: user.email,
        })
        .then((res) => setCartData(res.data.items))
        .catch((e) => {
          if (e.response.status === 500) {
            baseAxios
              .post("http://127.0.0.1:8000/api/auth/token/refresh/", {
                refresh: authenticated.refresh,
              })
              .then((res) => {
                setTokens(res.data);
              })
              .catch((e) => {
                console.log(e)
              });
          }
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cartData);

  return (
    <div>
      {/* navbar  */}
      <div className="flex justify-between bg-primaryDark py-3 px-10 relative ">
        {/* logo and the links  */}
        <div className="flex space-x-16 font-bold">
          <h1 className="text-2xl font-bold text-white">Electronic.AF</h1>
          <h3 className="text-lg text-white">Category</h3>
          <h3 className="text-lg text-white">About Us</h3>
        </div>
        {/* cart */}
        <div className="flex space-x-16 pr-20">
          {/* sign in button */}
          <button
            className="bg-white text-primary font-semibold px-10 py-1 rounded-md hover:text-black hover:font-bold"
            hidden={visibility.signIn}
          >
            Sign In
          </button>
          {/* cart Icon */}
          <svg
            onClick={() => handleClick("cart")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white hover:text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* button for logout  */}
          <button onClick={() => handleClick("logOut")} className="text-white">
            Log Out
          </button>
        </div>

        {/* cart card  */}
        {/* <div className={`mt-1 absolute shadow-sm  top-16 right-44 bg-background rounded-md z-10 h-48 w-48 ${visibility.cart ? 'block' : 'hidden'}`}>{cartData?.map(t => <CardDetail {...t}/>)}</div> */}
      </div>
      {/* body  */}

      {/* input */}
      <div className={`${visibility.input ? "block" : "invisible"}`}>
        <form>
          <div className="flex justify-end items-center mr-24 mt-8 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-60"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="pl-7 customizeForm w-64"
              placeholder="Search for products"
            />
          </div>
        </form>
      </div>
      {/* card  */}
      <div className="ml-8 ">
        <h1 className="font-bold text-3xl pl-10">Top Deals</h1>
        <div className="flex space-x-10 pt-8">
          {data ? (
            data.map((info) => <Card key={info.id} {...info} />)
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
