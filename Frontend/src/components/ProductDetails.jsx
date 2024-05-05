import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axios, getTokens } from "../Api/client";
import Carousel from "../common/carouselMaker";
import { RiEmotionSadLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import Review from "./Review";
import { useRef } from "react";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { FaChevronRight } from "react-icons/fa";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState();
  const [review, setReview] = useState();
  const [postReview, setPostReview] = useState({
    submitReview: false,
    formSubmitReview: true,
    postData: "",
    postRating: 0,
  });
  const [authenticated] = useState(getTokens());
  const [cookie] = useCookies(["email"]);
  const [rating, setRating] = useState(0);
  const inputRef = useRef();

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

  // ? useEffect for getReview All and gerReview Self
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_baseURL}core/getProductReviews/`, {
        productId,
      })
      .then((res) => {
        setReview(res.data);
        //  ? if there is data then check for the user's review
        //! is it necessary to have data from the user itself
        if (Array.isArray(res.data)) {
          axios
            .post(`${process.env.REACT_APP_baseURL}core/getRating/`, {
              productId,
            })
            .then((res) => setRating(res.data.average_rating))
            .catch((e) => {
              //todo error handle in here
              console.log(e);
            });
        }
      })
      .catch((e) => {
        //todo to error handle in here
        // console.log(e);
      });
    //! this function is not updating automatically
  }, [setReview, productId]);

  // handleclick funciton
  const handleClick = (param) => {
    if (typeof param === "number")
      setPostReview({
        ...postReview,
        postRating: param,
        formSubmitReview: false,
      });

    if (param === "addToCart") {
      axios
        .post(`${process.env.REACT_APP_baseURL}core/addToCart/`, {
          email: cookie.email,
          productId,
        })
        .then((res) => toast.success(res.data.detail))
        .catch((e) => {
          //todo error handling in here
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_baseURL}core/submitReview/`, {
        productId,
        email: cookie.email,
        rating: postReview.postRating,
        review: postReview.postData,
      })
      .then((res) => {
        toast.success(res.data.detail);
        setPostReview({ ...postReview, postData: "", postRating: 0 });
        inputRef.current.value = "";
      })
      .catch((e) => {
        //todo error handling in here
      });
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

      {/* section */}
      <div className="md:grid grid-cols-2 ">
        {/* pictures  */}
        <div className="col-span-1 ">
          <Carousel images={productData?.images} />
        </div>

        <div className="col-span-1">
          <div>
            <h1 className="font-bold text-[3rem]">{productData?.title}</h1>
            <div className="flex items-center gap-2 ">
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

            <div className="text-[1.5rem] ">
              <p>CPU: {productData?.cpu}</p>
              <p>GPU : {productData?.gpu}</p>
              <p>OS : {productData?.os}</p>
              <p>RAM:{productData?.memory}</p>
              <p>Storage:{productData?.storage}</p>
              <p>Storage Type: {productData?.storageType} </p>
            </div>

            <div className="flex  items-center gap-2 ">
              <p className="px-8  text-[2rem] bg-green-300 font-bold rounded-full w-fit">
                {productData?.price - productData?.price * 0.2}$
              </p>
              <p className="line-through text-gray-400 italic text-[1.5rem]">
                ${productData.price}
              </p>
            </div>

            <button
              onClick={() => handleClick("addToCart")}
              className="px-12 rounded-full bg-primary font-bold font-robotoBold py-4 text-[1.5rem]  w-1/2 "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
