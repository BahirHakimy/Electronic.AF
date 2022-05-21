import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMaker from "../common/inputMaker";

function ForgotPassword() {
  const [data, setData] = useState({});
  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/sendResetCode/", {
        email : data.forgotPassword
      })
      .then((response) => {
        if (response.status === 200) navigate("/PasswordReset")
      })
      .catch((error) =>
        setError({
          condition: true,
          message:
          error.response.data.detail
        })
      );
  }

  function takeData(info, name) {
    setData({ ...data, [name]: info });
  }

  return (
    <div className="bg-gray-100 h-screen">
      {/* //*header section */}
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <h3 className="text-xl font-semibold">Don't Worry We've Got you</h3>
      </div>

      {/* card section */}
      <div className="bg-white w-4/12 mx-auto mt-5">
        <form onSubmit={handleSubmit}>
          {/* //* card header section  */}
          <div className="text-center">
            <h3 className="capitalize font-semibold">
              Just Give us the <span className="font-bold">Email</span> and
              you're set to go{" "}
            </h3>
          </div>

          {/* //? Last Name */}
          <div className="p-2">
            <InputMaker
              type={"email"}
              name="forgotPassword"
              label="Email"
              styling={{ labelStyling: "block", input: "w-full" }}
              required={true}
              data={takeData}
            />
          </div>

          <span className={`${error.condition ? 'block' : 'hidden'} text-red-500 font-medium text-sm text-center capitalize`}>{error.message}</span>
          {/* button for submit  */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 text-white rounded-md w-11/12  py-1  my-2 hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
