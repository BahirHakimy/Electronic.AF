import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axios, getTokens } from "../Api/client";
import Carousel from "../common/carouselMaker";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { FaChevronRight, FaTruck } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState();

  const [authenticated] = useState(getTokens());
  const [cookie] = useCookies(["email"]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_baseURL}core/getProduct/`, {
        id: productId,
      })
      .then((res) => setProductData(res.data))
      .catch((e) => {
        //todo to error handle in here
        console.log(e);
      });
  }, [productId]);

  const addToCart = () => {
    authenticated
      ? axios
          .post(`${process.env.REACT_APP_baseURL}core/addToCart/`, {
            email: cookie.email,
            productId,
          })
          .then((res) => toast.success(res.data.detail))
          .catch((e) => {
            toast.error(e.message);
          })
      : toast.info("Please Sign In to add to cart");
  };

  return (
    <div className="mx-20 mt-10">
      <div className="flex gap-2 items-center text-[1.5rem]">
        <Link
          className="text-gray-400 flex items-center hover:text-black hover:font-semibold gap-2"
          to={"/"}
        >
          Products
          <FaChevronRight />
        </Link>
        <Link
          to={`/category/${productData?.vendor}`}
          className="flex items-center text-gray-400 hover:text-black hover:font-semibold gap-2"
        >
          {productData?.vendor}
          <FaChevronRight />
        </Link>
        <Link className="font-semibold" to={"#"}>
          {productData?.title}
        </Link>
      </div>

      <div className="md:grid grid-cols-2 gap-8  mt-10 mb-10">
        <div>
          <Carousel images={productData?.images} />
          <div className="mt-4">
            <h1 className="text-[2rem] font-bold">About this item:</h1>
            <div className="border-b border-black w-11/12 "></div>
            <p className="mt-4 max-w-[80ch]">{productData?.description}</p>
          </div>
        </div>

        <div className="">
          <div>
            <h1 className="font-bold text-[3rem] ">{productData?.title}</h1>
            <div className="flex items-center gap-2  ">
              <ReactStars
                value={5}
                count={5}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
              <p>(4.9)</p>
              <span className="underline text-gray-500">10reviews</span>
            </div>
            <div className="text-[1.5rem] mt-4 ">
              <p>CPU: {productData?.cpu}</p>
              <p>GPU : {productData?.gpu}</p>
              <p>OS : {productData?.os}</p>
              <p>RAM : {productData?.memory}</p>
              <p>Storage : {productData?.storage}</p>
              <p>Storage Type : {productData?.storageType} </p>
            </div>

            <div className="flex  items-center gap-2 mt-8">
              <p className="px-8  text-[2rem] bg-green-300 font-bold rounded-full w-fit">
                {productData?.price - productData?.price * 0.2}$
              </p>
              <p className="line-through text-gray-400 italic text-[1.5rem]">
                ${productData?.price}
              </p>
            </div>

            <button
              onClick={addToCart}
              className="px-12 rounded-full bg-primary hover:bg-primaryDark hover:text-white font-bold mt-4 font-robotoBold py-4 text-[1.5rem] xl:w-1/2 "
            >
              Add to Cart
            </button>
          </div>
          <div className="border-b border-black mt-4"></div>
          <div className="flex gap-8">
            <div className="mt-4 border-2 rounded-lg border-[#B2C6DC]  w-fit p-8 flex flex-col justify-center items-center">
              <div className="bg-[#B2C6DC] flex justify-center items-center rounded-[50%] h-28 w-28">
                <FaTruck size={48} className="text-gray-700" />
              </div>
              <h4 className="text-[1.5rem]  font-bold mt-1">Shipping</h4>
              <p className="text-[1.5rem] leading-none">Arrives at 3 Days</p>
              <p className="bg-[#9EDDFA] px-12 font-bold text-[1.5rem] py-2 mt-4 rounded-full">
                free
              </p>
            </div>
            <div className="mt-4 border-2 rounded-lg border-[#B2C6DC]  w-fit p-8 flex flex-col  items-center">
              <div className="bg-[#B2C6DC] flex justify-center items-center rounded-[50%] h-28 w-28">
                <FaBagShopping size={48} className="text-gray-700" />
              </div>
              <h4 className="text-[1.5rem]  font-bold mt-1">Delivery</h4>
              <p className="text-[1.5rem] leading-none">Not Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
