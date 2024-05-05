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
import { CiLogout } from "react-icons/ci";

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
    <>
      {/* mobile navbar */}
      <div className="lg:hidden flex justify-between items-center mt-10 px-4 md:px-12 lg:px-20 xl:px-24 ">
        <img src="/logo1200.png" alt="" className="w-16 h-16" />

        <VscThreeBars size={48} onClick={() => handleClick("bars")} />
        <div
          className={`fixed ${
            visibility.bars ? "block" : "hidden"
          } bg-white shadow-md w-2/3 h-screen top-0 right-0 z-10 lg:hidden `}
        >
          <FaX
            size={48}
            className="ml-auto mr-8 mt-8"
            onClick={() => setVisiblity((prev) => ({ ...prev, bars: false }))}
          />
          <div className="flex flex-col divide-y-2  mt-12 ">
            <Link className="text-xl pl-4 pb-4" to={"/products/category/HP"}>
              Categories
            </Link>
            <Link className="text-xl pl-4 pt-4" to={"/about"}>
              About Us
            </Link>
            {visibility.logout && (
              <CiLogout
                onClick={() => {
                  setTokens(null);
                  navigate("/");
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between items-center lg:mt-10 px-4 md:px-12 lg:px-20 xl:px-24  `}
      >
        <div className="hidden lg:flex  items-center gap-12 font-bold ">
          <img src="/logo1200.png" alt="" className="w-16 h-16" />
          <MyDropdown />

          <Link
            className={`hidden lg:inline-block text-xl ${
              location.pathname === "/about"
                ? "underline text-primary"
                : "no-underline"
            } underline-offset-8  `}
            to={"/about"}
          >
            About Us
          </Link>
        </div>

        {/* cart in medium and large pages  */}
        <div className=" hidden lg:flex items-center gap-12">
          {visibility.searchBar ? (
            <div className="flex items-center gap-2 mr-8">
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
              size={32}
              onClick={() =>
                setVisiblity((prev) => ({ ...prev, searchBar: true }))
              }
              className="cursor-pointer"
            />
          )}
          <Link
            className={`bg-primary font-bold px-12 py-4 text-lg  rounded-full hover:text-black hover:font-bold ${
              visibility.signIn ? "block" : "hidden"
            }`}
            to={"/login"}
          >
            Sign In
          </Link>

          <div className="relative ">
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
              <div className="pt-2 gap-4 px-4">
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

          {authenticated?.access && (
            <div>
              <CiLogout
                onClick={() => {
                  setTokens(null);
                  navigate("/");
                }}
                size={32}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
