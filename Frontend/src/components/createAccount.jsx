import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import InputMaker from "../common/inputMaker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const [data, setData] = useState({});
  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", {
        firstname: `${data.firstName}`,
        lastname: `${data.lastName}`,
        email: `${data.email}`,
        phone: `${data.number}`,
        password: `${data.password}`,
      })
      .then((response) => {
        if (response.status === 201) navigate("/Home", { replace: true })
      })
      .catch((error) =>
        setError({
          condition: true,
          message:
            error.response.data.errors.email ||
            error.response.data.errors.phone ||
            error.response.data.errors.firstname || 
            error.response.data.errors.lastName || 
            error.response.data.errors.password
        })
      );
  }

  console.log(error);
  console.log(data.firstname, data.lastname);
  function takeData(info, name) {
    setData({ ...data, [name]: info });
  }

  return (
    <div className="bg-gray-100 h-screen">
      {/* //* header section */}
      <div className="text-center font-bold font-serif pt-5 ">
        <FontAwesomeIcon icon={faLaptopCode} className="h-16 " />
        <h1 className="text-3xl ">Create Your Account To Continue...</h1>
      </div>

      {/* card section */}
      <div className="bg-white shadow-md rounded w-4/12 mx-auto mt-4 ">
        <form onSubmit={handleSubmit}>
          {/* //?First Name */}
          <div className="p-2">
            <InputMaker
              type={"text"}
              name="firstName"
              label="First Name"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          {/* //? Last Name */}
          <div className="p-2">
            <InputMaker
              type={"text"}
              name="lastName"
              label="Last Name"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          {/* //? Phone Number */}
          <div className="p-2">
            <InputMaker
              type={"number"}
              name="number"
              label="Phone Number"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
              placeholder="Only the 9 digits '781123456' "
            />
          </div>

          {/* //? email */}
          <div className="p-2">
            <InputMaker
              type={"email"}
              name="email"
              label="Email Address"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          {/* //? Last Name */}
          <div className="p-2">
            <InputMaker
              type={"password"}
              name="password"
              label="Password"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          <span
            className={`${
              error.condition ? "block" : "hidden"
            } text-red-500 font-medium capitalize text-center `}
          >
            {error.message}
          </span>

          {/* button for submit  */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 text-white rounded-md w-11/12  py-1  my-2 hover:bg-gray-800"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
