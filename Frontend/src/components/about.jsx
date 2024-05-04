import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const About = () => {
  const [data, setData] = useState({
    BahirPic: "",
    BahirName: "",
    BahirBio: "",
    MehdiPic: "",
    MehdiName: "",
    MehdiBio: "",
  });

  useEffect(() => {
    axios.get("https://api.github.com/users/BahirHakimy").then((res) =>
      setData({
        ...data,
        BahirPic: res.data.avatar_url,
        BahirName: res.data.name,
        BahirBio: res.data.bio,
      })
    );

    axios.get("https://api.github.com/users/Mehdi-UX-Dev").then((res) =>
      setData({
        ...data,
        MehdiPic: res.data.avatar_url,
        MehdiName: res.data.name,
        MehdiBio: res.data.bio,
      })
    );
  }, [data]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-20 flex-wrap gap-4 mx-4">
        <h1 className="text-lg px-4 text-center">
          <span className="font-bold text-2xl bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Electronic.AF
          </span>{" "}
          is changing the <span className="font-semibold">E-commerce</span>{" "}
          game!
        </h1>
        <Link
          to={"/products"}
          className="bg-primary font-bold  text-center w-full sm:w-fit text-lg px-8 py-4 rounded-full"
        >
          Get Started
        </Link>
      </div>

      <div className=" py-20 ">
        <div className="  flex flex-col lg:flex-row justify-center gap-4 items-center ">
          <img
            src={data.BahirPic}
            alt="Bahir Hakimi"
            className="rounded-full w-40 "
          />
          <div className="pl-4">
            <h1 className="font-semibold ">{data.BahirName}</h1>
            <p>{data.BahirBio}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row  items-center justify-center lg:justify-end lg:pr-20 gap-4">
          <div className=" order-2 lg:order-none">
            <h1 className="font-semibold">{data.MehdiName}</h1>
            <p>{data.MehdiBio}</p>
          </div>
          <img
            src={data.MehdiPic}
            alt="Mohammad Mehdi Wahid"
            className="rounded-full w-40 "
          />
        </div>

        <div className="pl-10 max-w-prose leading-6 relative">
          <p className="font-semibold capitalize">
            A few words from the Creators:
          </p>
          <FaQuoteLeft className="mt-2" />
          <p className="capitalize text-gray-400 pt-1">
            We would like to thank everyone for their support and for putting
            their faith in us during the process of making this e-commerce
            application.
          </p>
          <p className="text-gray-400 capitalize">
            Our Country is trying to catch up rapidly with the digital world and
            it's phenomenos, so we can proudly say we are{" "}
            <span className="text-secondary font-semibold">
              trying to be part of it.
            </span>{" "}
          </p>
          <FaQuoteRight className="absolute left-full" />
        </div>
      </div>

      {/* then the offering this webiste has  */}
      <div className="pl-10 max-w-prose pb-10">
        <p className="text-primary font-bold text-xl pb-1">Our Story</p>
        <p className="capitalize font-bold">
          We are helping in modernizing Afghanistan and opening new ways for
          digital business.
        </p>
        <p className="capitalize font-bold text-xl italic">
          Your Trust is our value
        </p>
      </div>
    </div>
  );
};

export default About;
