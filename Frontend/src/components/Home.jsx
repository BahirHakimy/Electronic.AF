import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="sm:overflow-x-hidden h-screen relative px-4 lg:px-20">
      <div className="flex justify-center h-[80%] items-center">
        <div className="lg:max-w-[75ch] lg:pt-20 pt-10">
          <h1 className="text-[3rem] lg:text-[4rem] font-bold font-robotoBold leading-none  ">
            Electronic
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-primaryLight text-transparent">
              .AF
            </span>
          </h1>
          <p className="text-[1.5rem] lg:text-[2rem] font-robotoBold leading-none mt-4 font-bold text-gray-500 ">
            Surf Through the Ocean Of Quality
          </p>
          <p className="text-gray-500 text-[1.5rem] font-roboto mt-8  md:max-w-prose  lg:max-w-[55ch] xl:max-w-none">
            Electronic.AF brings quality to the country by bringing the most
            reliable <strong className="text-black">Computer</strong> products
            from the most reliable sources.
          </p>
          <div>
            <Link
              className="flex w-fit mt-12   items-center font-robotoBold text-lg border border-gray-950 hover:bg-primary hover:border-primary   px-12 py-4 rounded-full font-bold "
              to={"/products"}
            >
              <p>Browse</p>
              <BiChevronRight size={32} />
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">
          <img src="./devices.svg" alt="surfing" className="w-[800px] h-full" />
        </div>
      </div>
    </div>
  );
}

export default Home;
