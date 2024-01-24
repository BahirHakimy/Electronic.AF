import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axios } from "../Api/client";
import Carousel from "../common/carouselMaker";
import { RiEmotionSadLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import Review from "./Review";
import { useRef } from "react";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";

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
  const [cookie] = useCookies(["email"]);
  const [rating, setRating] = useState(0);
  const inputRef = useRef();

  // ? useEffect for product detail
  useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/api/core/getProduct/`, {
        id: productId,
      })
      .then((res) => setProductData(res.data))
      .catch((e) => {
        //todo to error handle in here
        console.log(e);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ? useEffect for getReview All and gerReview Self
  useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/api/core/getProductReviews/`, {
        productId,
      })
      .then((res) => {
        setReview(res.data);
        //  ? if there is data then check for the user's review
        //! is it necessary to have data from the user itself
        if (Array.isArray(res.data)) {
          axios
            .post(`http://127.0.0.1:8000/api/core/getRating/`, {
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
        .post("http://127.0.0.1:8000/api/core/addToCart/", {
          email: cookie.email,
          productId,
        })
        .then((res) => toast.success(res.data.detail))
        .catch((e) => {
          //todo error handling in here
        });
    }
  };

  const handleChange = (data) => {
    setPostReview({ ...postReview, postData: data.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/api/core/submitReview/`, {
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
    <div className="p-5">
      {/* links tree */}
      <div className="pl-2 pt-2 ">
        <Link to={"/"}>
          <span className="font-semibold hover:text-gray-400">Products</span>
        </Link>
        <span className="px-2 ">/</span>
        <Link to={"category/hp"}>
          {/* //todo make this dynamic it should not be hp rather dynamic */}
          <span className="font-semibold hover:text-gray-400">
            {productData?.vendor}
          </span>
        </Link>
        <span className="px-2">/</span>
        <Link to={"#"}>
          <span className="text-gray-400 hover:text-black hover:font-semibold">
            {productData?.title}
          </span>
        </Link>
      </div>

      {/* section */}
      <div className="md:grid grid-cols-2 ">
        {/* pictures  */}
        <div className="col-span-1 ">
          <Carousel images={productData?.images} />
        </div>

        {/* info about product  */}
        <div className="col-span-1 divide-y-2 space-y-5 pt-5  ">
          <div>
            {/* Name  */}
            <h1 className="font-bold text-lg">{productData?.title}</h1>
            {/* review and price   */}

            <div className="flex justify-between pr-7 pt-3 ">
         
              <ReactStars count={5} size={24} activeColor="#ffd700" />,
              {productData?.price}$
            </div>

            {/* properties ram storage  */}
            <div className="pt-10 ">
              <p>
                <span className="font-bold pr-1">CPU</span> : {productData?.cpu}
              </p>
              <p>
                <span className="font-bold pr-1">GPU</span> : {productData?.gpu}
              </p>
              <p>
                <span className="font-bold pr-1">OS</span> : {productData?.os}
              </p>
              <p>
                <span className="font-bold pr-1">RAM</span>:{" "}
                {productData?.memory}
              </p>
              <p>
                <span className="font-bold pr-1">Storage</span> :{" "}
                {productData?.storage}
              </p>
              <p>
                <span className="font-bold pr-1">Storage Type</span>:{" "}
                {productData?.storageType}{" "}
              </p>
            </div>

            {/* add to cart  */}

            <div className="px-10 pt-7 mx-auto">
              <button
                onClick={() => handleClick("addToCart")}
                className="border rounded bg-primary border-primary text-white w-full h-10 hover:bg-white hover:ring-black hover:border-black hover:text-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* description  */}

          <div className="pt-5">
            <p className="font-semibold">Description:</p>
            &nbsp; {productData?.description}
          </div>

          {/* review  */}

          <div className="pt-3 ">
            <h1 className="pb-2 font-semibold">Reviews :</h1>
            {Array.isArray(review) ? (
              <Review review={review} />
            ) : (
              <div className="flex text-gray-400 space-x-2 justify-center">
                {" "}
                <h1>This Product has no review</h1>{" "}
                <RiEmotionSadLine className="mt-1" size={18} />
              </div>
            )}

            {/* submit review  */}

            <div className="mt-5">
              {/* <button hidden={postReview.submitReview} onClick={() => handleClick('visibility')} className='bg-primary border border-primary text-white rounded px-2 py-0.5 hover:bg-white hover:text-primary hover:ring-black hover:border-black'>Submit Review</button> */}
              <div className="flex space-x-4">
                <span className="">Rate this Product</span>
                {/* <StarRatingComponent  name='ratingProduct' onStarClick={handleClick} value={postReview.postRating}/> */}
                <ReactStars
                
                  count={5}
                  onChange={handleClick}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>

              <form
                onSubmit={handleSubmit}
                hidden={postReview.formSubmitReview}
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="customizeForm w-96"
                  id="review"
                  placeholder="Submit your review"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-primary text-white rounded px-4 py-1 w-24 ml-3 "
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
