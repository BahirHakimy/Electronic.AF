import { axios, getTokens } from "../Api/client";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CardDetail from "./Table";

const Cart = () => {
  const { state } = useLocation();
  const [cartData, setCartData] = useState();
  let price = 0;

  const [authenticated] = useState(getTokens());
  console.log(authenticated);

  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_baseURL}core/getCart/`, {
  //       email: jwtDecode(state?.email).email,
  //     })
  //     .then((res) => setCartData(res.data.items));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return !authenticated ? (
    <div className="flex flex-col gap-4 justify-center items-center h-screen text-lg">
      <h1 className="font-bold text-[2rem]">Please Sign In to see Cart Info</h1>
      <Link
        className={`bg-primary font-bold px-12 py-4 text-lg  rounded-full hover:text-black hover:font-bold `}
        to={"/login"}
      >
        Sign In
      </Link>
    </div>
  ) : (
    <div></div>
  );
};

export default Cart;
