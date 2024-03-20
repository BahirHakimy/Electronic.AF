import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="sm:overflow-x-hidden h-screen relative  ">
      {/* //*svg */}
      <div className="hidden lg:block  ">
        <img
          src="/cover.png"
          alt="surfing"
          className="w-full absolute top-[25%]"
        />
      </div>
      {/* //* navbar */}
      <div className="flex justify-between items-center mx-6  md:mx-10 lg:mx-32 pt-12 ">
        {/* //*  logo */}
        <div>
          <img src="/logo1200.png" alt="" className="h-20 w-20 object-cover" />
        </div>

        {/* //* links  */}
        <div className=" space-x-[1.5rem]">
          <span className="  text-xl hover:text-black hover:bg-primaryLight hover:border-0 hover:font-semibold border border-black rounded-md px-8 py-2 ">
            <Link to={"/logIn"}>Sign In</Link>
          </span>
          <span className="hidden md:inline-block text-xl">
            <Link to={"/about"}>About Us</Link>
          </span>
        </div>
      </div>

      {/* //* body   */}
      <div className="grid ml-20 relative  sm:pt-24  z-20 ">
        {/* colOne */}
        <div className="max-w-prose text-center lg:pt-20">
          {/* title  */}
          <h1 className="text-5xl font-bold pb-2">
            Electronic<span className="text-primary">.AF</span>
          </h1>
          <h2 className="text-3xl font-bold pb-6">
            <span className="bg-clip-text text-4xl  bg-gradient-to-r from-secondary to-primaryLight text-transparent ">
              Surf
            </span>{" "}
            Through the Ocean Of Quality
          </h2>
          <p className="text-gray-500 text-lg pb-4">
            Electronic.AF brings quality to the country by bringing the most
            reliable <strong className="text-black">Computer</strong> products
            from the most reliable sources.
          </p>
          {/* buttons */}
          <div className=" ">
            <button className="bg-primaryLight text-lg rounded-lg font-bold px-8 py-2 hover:bg-primaryDark hover:text-white">
              <Link to={"/products"}>Browse</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
