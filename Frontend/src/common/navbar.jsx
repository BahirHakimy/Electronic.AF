import React, { useEffect, useState } from "react";
import { BsCart3, BsSearch } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axios, getTokens } from "../Api/client";
import CardDetail from "../components/Table";
import { toast } from "react-toastify";
import { setTokens } from "../Api/client";
import { jwtDecode } from "jwt-decode";
import MyDropdown from "../components/menudropdown";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navbar = () => {
  const [authenticated] = useState(getTokens());
  const [cartData, setCartData] = useState();
  const location = useLocation();

  useEffect(() => {
    if (!authenticated) return;
    setVisiblity({ ...visibility, signIn: false, logout: true });
    axios
      .post(`${process.env.REACT_APP_baseURL}core/getCart/`, {
        email: jwtDecode(authenticated.access).email,
      })
      .then((res) => setCartData(res.data.items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const [visibility, setVisiblity] = useState({
    signIn: true,
    cart: false,
    logout: false,
    bars: false,
    searchBar: false,
  });

  const navigate = useNavigate();

  const handleClick = (type) => {
    if (type === "svg") setVisiblity({ ...visibility, cart: !visibility.cart });
    if (authenticated && type === "cart")
      navigate("/cart", { state: { email: authenticated?.access } });
    if (type === "cart" && !authenticated) toast.error("Please Sign In");
    if (type === "bars")
      setVisiblity({ ...visibility, bars: !visibility.bars });
  };

  return (
    // ${visibility.bars ? 'blur-md' : 'blur-none'} //todo making the blur functionality
    <div className={`flex justify-between items-center py-5 px-10 `}>
      {/* logo and the links  */}
      <div className="flex items-center space-x-16 font-bold ">
        <img src="/logo1200.png" alt="" className="w-16 h-16" />
        <MyDropdown />
        <h3
          className={`hidden md:inline-block text-lg ${
            location.pathname === "/about" ? "underline" : "no-underline"
          } underline-offset-8  text-primary`}
        >
          <Link to={"/about"}>
            <span className="text-black">About Us</span>
          </Link>
        </h3>
      </div>
      {/* threebars in mobile phones  */}
      <div className="block md:hidden relative">
        <VscThreeBars size={25} onClick={() => handleClick("bars")} />
        <div
          className={`absolute ${
            visibility.bars ? "inline-block" : "hidden"
          } bg-white shadow-md divide-y w-32 -right-1 mt-1 z-10 space-y-2 pl-2 pb-2 `}
        >
          {/* list of links for the dashbar */}
          <div>
            <Link to={"/about"}>About Us</Link>
          </div>
          <div>
            <Link to={"/products/category/HP"}>Companies</Link>
          </div>
          <div>
            <span onClick={() => handleClick("cart")}>Cart</span>
          </div>
          <div>
            <Link to={"/"}>
              <button
                className={`mx-3 border px-4 py-1 mt-1 ${
                  visibility.logout
                    ? " bg-white text-secondary border-secondary"
                    : "bg-primary text-white"
                } rounded`}
              >
                {visibility.logout ? "log out" : "Sign in"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* cart in medium and large pages  */}
      <div className=" hidden md:flex items-center">
        {visibility.searchBar ? (
          <div className="flex items-center space-x-2 mr-8">
            <form>
              <div className="flex items-center relative">
                <BsSearch className="h-4 w-4 absolute " />
                <input
                  type="text"
                  className="pl-7 customizeForm w-64"
                  placeholder="Search for products"
                />
              </div>
            </form>
            <FaX
              size={24}
              className="text-gray-400 hover:text-black cursor-pointer"
              onClick={() =>
                setVisiblity((prev) => ({ ...prev, searchBar: false }))
              }
            />
          </div>
        ) : (
          <FaSearch
            size={24}
            onClick={() =>
              setVisiblity((prev) => ({ ...prev, searchBar: true }))
            }
            className="mr-12 cursor-pointer"
          />
        )}
        {/* //*  sign in button */}
        <button
          className={`bg-primary mr-4  text-white font-semibold px-10 py-2 rounded-lg hover:text-black hover:font-bold ${
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
          className={` border-primary border-2 font-semibold px-10 py-1 rounded-md hover:bg-primary hover:text-white ${
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
              className="text-lg hover:scale-105"
              size={32}
              onClick={() => handleClick("svg")}
            />
            <span
              className={`${
                authenticated?.access ? "inline-block" : "hidden"
              } absolute  text-center font-semibold -top-3 -right-2 border border-primary bg-primary text-white rounded-full w-6 scale-75`}
            >
              {cartData?.length}
            </span>
          </div>

          {/* cart card  */}
          <div
            className={`mt-2 absolute shadow-lg   top-8 -right-6
                bg-white rounded-md z-10 h-64 w-66 ${
                  cartData?.length && "divide-y-2 overflow-y-auto"
                }  divide-secondary space-y-1  ${
              visibility.cart ? "block" : "hidden"
            }`}
          >
            {authenticated?.access === undefined ? (
              <h2 className="flex items-center h-full  font-bold text-xl capitalize text-center ">
                Please Sign In to Get Cart Information
              </h2>
            ) : (
              cartData?.length &&
              cartData?.map((data) => (
                <CardDetail
                  key={data.product.id}
                  info={data}
                  style={{
                    height: "h-16",
                    width: "w-16",
                    priceVisibility: true,
                    hover: "hover:bg-primary hover:text-white",
                    deleteVisible: true,
                  }}
                />
              ))
            )}
            <div className="pt-2 space-x-4 px-4">
              {/* <button className="border border-secondary  rounded-md px-2 py-0.5 hover:bg-primaryLight hover:text-white hover:border-gray-100">Keep Shopping</button> */}
              {cartData?.length && (
                <button
                  onClick={() => handleClick("cart")}
                  className="w-full bg-primary text-white px-2 rounded py-0.5 hover:bg-white hover:text-primary hover:border-secondary hover:border hover:scale-105"
                >
                  Go to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
