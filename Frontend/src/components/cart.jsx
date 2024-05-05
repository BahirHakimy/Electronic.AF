import { jwtDecode } from "jwt-decode";
import { axios, getTokens } from "../Api/client";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Cart = () => {
  const [authenticated] = useState(getTokens());
  const [data, setData] = useState();
  const { state } = useLocation();
  const [checkout, setCheckOut] = useState();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_baseURL}core/getCart/`, {
        email: jwtDecode(state?.email).email,
      })
      .then((res) => setData(res.data.items));
  }, [state.email]);

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
    <>
      {checkout && (
        <div className="bg-white z-20 p-10 shadow-lg absolute left-1/3 top-1/2 space-y-4  ">
          <div className="flex items-center gap-4 justify-center">
            <IoIosCheckmarkCircle className="text-green-300" size={48} />
            <h1 className="text-[1.5rem] font-bold">Check Out Complete</h1>
          </div>
          <p className="w-[45ch] text-center">
            Thank you for shopping with us, your package will be sent to you in
            2 days.
          </p>
          <Link
            className="text-[1.5rem] font-bold flex justify-center bg-primary px-8 py-2 rounded-full w-fit mx-auto mt-4"
            to={"/products"}
          >
            Go To Homepage
          </Link>
        </div>
      )}

      <div
        className={`lg:px-20 xl:px-24 mt-20 flex justify-between max-w-[100rem]  gap-10 mx-auto ${
          checkout && "blur"
        }`}
      >
        <div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-[3rem] font-bold">My Cart</h1>
              <div className="relative">
                <BsCart3 size={32} className="" />
                <p className="w-8 h-8 bg-primaryDark flex justify-center items-center rounded-full text-white absolute -right-5 -top-5">
                  {data?.length}
                </p>
              </div>
            </div>
            <div className="border-b mb-8"></div>
          </div>
          <div>
            {data?.map((item) => (
              <div className="" key={item.product.title}>
                <div className="flex  items-center gap-4">
                  <div className="border h-10 w-10 flex justify-center items-center">
                    <div className="bg-primary h-8 w-8 "></div>
                  </div>
                  <h1 className="text-[1.5rem] font-bold">
                    {item.product.title}
                  </h1>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="">
                    <img
                      src={`http://127.0.0.1:8000${item?.product.images[0].image}`}
                      alt="product"
                      className=" object-cover w-48 h-48"
                    />
                  </div>
                  <div>
                    <p className="max-w-prose">{item.product.description}</p>
                    <p className="text-[2rem] font-bold">
                      ${item.product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded shadow-lg divide-y-2 px-8 py-4 ">
          <h1 className="text-center font-bold text-[2rem] pb-2">
            Order Summary
          </h1>
          {data?.map((item) => (
            <div className="flex gap-4 py-4 text-[1.5rem]">
              <p>
                {item.product.title} * {item?.quantity}{" "}
              </p>
              <p>{item.product.price}</p>
            </div>
          ))}

          <div className="flex justify-between py-4 text-[1.5rem]">
            <p>Delivery</p>
            <p>Free</p>
          </div>

          <div className="py-4 text-[1.5rem]">
            <div className="flex justify-between items-center ">
              <p>Amount</p>
              <p>
                $
                {data?.reduce(
                  (acc, item) => (acc += parseFloat(item.product.price)),
                  0
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tax</p>
              <p>$8.00</p>
            </div>
          </div>
          <div className="flex items-center py-4 justify-between text-[1.5rem]">
            <p>Order Total</p>
            <p>
              {" "}
              {data?.reduce(
                (acc, item) => (acc += parseFloat(item.product.price)),
                8
              )}
            </p>
          </div>

          <div>
            <button
              onClick={() => setCheckOut(true)}
              className="bg-primary px-8 py-4 rounded-full w-full mt-8 font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
