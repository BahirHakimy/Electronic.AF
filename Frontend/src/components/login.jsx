import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import sign from '../illustrations/sign.svg'
import * as Yup from "yup";

const initialValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

function LogIn() {
  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function onSubmit(values) {
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        email: values.emailaddress,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) navigate("/Home", { replace: true });
      })
      .catch((error) =>
        setError({ condition: true, message: error.response.data.detail })
      );
  }

  return (
        <div className="h-screen bg-background flex items-center">
    <div className="customizeCard scale-110 ">

      {/* //*form  section */}
      <div className="pt-4 px-3 space-y-3 bg-white">
        {/* //*header  */}
        <div className="flex justify-between px-7">
          <div className="font-bold text-primaryLight text-2xl">logo</div>
          <div className="text-gray-500 font-bold text-xl  hover:text-gray-700"><Link to={'/createAccount'}>Create Account</Link></div>
        </div>

        {/* //* sign in  */}
        <div className="py-6 pl-7  ">
          <h1 className="font-bold text-2xl pb-2 pt-6">SIGN IN</h1>
          <span className="text-gray-400 text-lg font-mono">
            Sign in to continue exploration of the best laptops
          </span>
        </div>

        <Formik
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <Form>
            {/* //? email */}
            <div className="px-5 py-2">
              <label htmlFor="email" className="customizeLabel pl-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className="customizeForm"
                placeholder="you@mail.com"
              />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div className="text-red-500 capitalize font-medium">
                    {msg}
                  </div>
                )}
              />
            </div>

            {/* //? Password */}
            <div className="px-5 py-4">
              <label htmlFor="password" className="customizeLabel pl-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                className="customizeForm "
                placeholder="youPass"
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div className="text-red-500  capitalize font-medium">
                    {msg}
                  </div>
                )}
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
            <div className="text-center mt-8 mb-16">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-primaryLight text-white rounded-md w-11/12 h-10 shadow-md drop-shadow-lg  shadow-primary  py-1  "
              >
                {" "}
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* //* illustraion part */}
          <div className="bg-gradient-to-b from-primaryDark to-primaryLight relative">
       
            <div className="h-full flex items-center bg-primary rounded-full scale-75 justify-center opacity-25"></div>
                <img src={sign}  alt="illustration" className="h-80 absolute scale-75 top-32 left-14"/>

          </div>

    </div>
    </div>
  );
}

export default LogIn;
