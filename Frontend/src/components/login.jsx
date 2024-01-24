import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import sign from "../illustrations/sign.svg";
import * as Yup from "yup";
import {setTokens } from "../Api/client";
import {jwtDecode} from "jwt-decode";
import {HiOutlineMail} from 'react-icons/hi'
import {RiLockPasswordLine} from 'react-icons/ri'
import { useCookies } from "react-cookie";

const initialValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

function LogIn() {
  const [error, setError] = useState({ condition: false, message: ""});
  const [cookie,setCookie] = useCookies(['email'])
  const navigate = useNavigate();
 
  
  
  function onSubmit(values) {
    try {
      axios
        .post("http://127.0.0.1:8000/api/auth/token/",{
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          if (response.status === 200) {
            setTokens(response.data);
            jwtDecode(response.data.access);
            setCookie('email', values.email, {path : '/'})
            navigate("/products", { replace: true });
          }
        })
        .catch((error) =>
          setError({ condition: true, message: error?.response?.data.detail })
        );
    } catch (e) {
      //todo to take the appropariate action for error hanlding
    }
  }

  return (
    <div className="lg:h-screen bg-background flex items-center mx-3 ">
      <div className="customizeCard  mt-3 md:mx-auto rounded ">
        {/* //*form  section */}
        <div className="pt-4 px-3 space-y-3 bg-white">
          {/* //*header  */}
          <div className="flex justify-between px-7">
                 {/* //*  logo */}
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold '>
              <span className='font-serif text-3xl md:text-4xl '>E</span>.AF</h1>
        </div>
            <div className="text-black font-bold text-xl  hover:text-gray-400">
              <Link to={"/createAccount"}>Create Account</Link>
            </div>
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
              <div className="px-5 py-2 ">
                <label htmlFor="email" className="customizeLabel pl-1">
                  Email
                </label>
                <div className="flex justify-between relative">
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="customizeForm"
                  placeholder="you@mail.com"
                />
                <HiOutlineMail className="h-5 w-5 mt-4 absolute right-4"/>
                </div>
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
                <div className="flex relative justify-between">
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="customizeForm "
                  placeholder="youPass"
                /> 
                  <RiLockPasswordLine className="h-5 w-5 absolute  right-4 mt-4"/>
                </div>
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

              <div className="flex justify-end mr-8">
                <Link to={"/forgotPassword"}>
                  <span className="text-gray-500">Forgot Password?</span>
                </Link>
              </div>

              {/* button for submit  */}
              <div className="text-center mt-8 mb-16">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primaryLight text-white rounded-md w-11/12 h-10 shadow-md drop-shadow-lg  shadow-primary  py-1  "
                >
                  {" "}
                  Sign In
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        {/* //* illustraion part */}
        <div className="hidden md:inline-block bg-gradient-to-b from-primaryDark to-primaryLight relative">
          <div className="h-full flex items-center bg-primary rounded-full scale-75 justify-center opacity-25"></div>
          <img
            src={sign}
            alt="illustration"
            className="h-80 absolute scale-75 top-32 left-10 lg:left-14"
          />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
