import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputMaker from "../common/inputMaker";
import axios from "axios";

function LogIn() {
  const [data, setData] = useState({});
  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        email: data.emailaddress,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) navigate("/Home", { replace: true });
      })
      .catch((error) => setError({ condition: true, message: error.response.data.detail }));
  }

  function takeData(info, name) {
    setData({ ...data, [name]: info });
  }

    
  return (
    <div className="my-8 ">
      {/* //* logo section  */}
      <div className="text-center">
        <FontAwesomeIcon icon={faLaptopCode} className="h-16 " />
      </div>

      {/* //* header section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold ">Sign In To Your Account </h1>
        {/* //todo add the registration page link in here */}
        <p>
          Or{" "}
          <Link to="/createaccount" className="font-semibold underline">
            {" "}
            create your account now
          </Link>
        </p>
      </div>

      {/*  //* card section  */}
      <div className="bg-white w-4/12 shadow-md rounded-md pt-2 pb-4 pl-4 mt-5 mx-auto">
        {/* //* form  */}
        <form onSubmit={handleSubmit}>
          {/* //? username input  */}
          <div className="pl-3 w-11/12 py-6">
            <InputMaker
              type={"email"}
              name="emailaddress"
              label={"Email Address"}
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          {/* //? password section  */}
          <div className="pl-3 w-11/12 ">
            <InputMaker
              type={"password"}
              name="password"
              label={"Password"}
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          <h3
            className={`${
              error.condition === true ? "block" : "hidden"
            } text-red-500 font-semibold text-center py-2 capitalize `}
          >
            {error.message}
          </h3>

          {/* //* forgot password and remember me section   */}
          <div className="py-3 pl-3 flex justify-between w-11/12">
            {/* //? checkbox section  */}
            <div>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="rounded text-gray-700 "
              />
              <label htmlFor="remember" className="pl-2">
                Remember me
              </label>
            </div>

            {/* //? forgot password  */}
            <div>
              <p>
                <Link to="/forgotpassword" className="capitalize font-semibold">
                  forgot your password?
                </Link>
              </p>
            </div>
          </div>

          {/* //* button for sign in  */}
          <button
            type="submit"
            className="bg-gray-800 text-white rounded-md w-11/12 py-1 mt-1 ml-2"
          >
            {" "}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
