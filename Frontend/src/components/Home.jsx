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
        <div className="max-w-[75ch] lg:pt-20">
          {/* title  */}
          <h1 className="text-[4rem] font-bold font-robotoBold leading-none pb-2 ">
            Electronic
            <span className="bg-clip-text   bg-gradient-to-r from-secondary to-primaryLight text-transparent">
              .AF
            </span>
          </h1>
          <h2 className="text-[2rem] font-robotoBold leading-none font-bold text-gray-500 ">
            <span className=" "></span> Surf Through the Ocean Of Quality
          </h2>
          <p className="text-gray-500 text-[1.5rem] font-roboto pt-4 pb-10">
            Electronic.AF brings quality to the country by bringing the most
            reliable <strong className="text-black">Computer</strong> products
            from the most reliable sources.
          </p>
          {/* buttons */}
          <div className=" ">
            <button className="bg-primaryLight font-robotoBold text-[1.25rem] w-[200px] h-[64px] px-4 py-2 rounded-lg font-bold hover:bg-primaryDark hover:text-white">
              <Link to={"/products"}>Browse</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
