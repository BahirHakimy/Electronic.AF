import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import forgotPassword from '../illustrations/forgotPassword.svg'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required')
})


function ForgotPassword() {
  const [data, setData] = useState({});
  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function onSubmit(values) {
    axios
      .post("http://127.0.0.1:8000/api/sendResetCode/", {
        email : values.forgotPassword
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


  return (
    <div className="h-screen bg-background flex items-center">
      <div className="customizeCard scale-110 h-4/6">

  {/* //*form  section */}
  <div className="pt-4 px-3 space-y-3 bg-white">
    {/* //*header  */}
    <div className="flex justify-between px-7">
      <div className="font-bold text-primaryLight text-2xl">logo</div>
      <div className="text-gray-500 font-bold text-xl  hover:text-gray-700"><Link to={'/'}>Sign In</Link></div>
    </div>

         {/* //* sign in  */}
          <div className="py-6 pl-7 flex flex-wrap ">
            <h1 className="font-bold text-2xl pb-2 pt-6">FORGOT YOUR PASSWORD?</h1>
            <span className="text-gray-400 text-lg font-mono">
              Don't worry we've got u covered 
            </span>
          </div> 
              
          <Formik initialValues={{email : ''}} 
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          >
          <Form >
              {/* //? email */}
            <div className="p-3">
            <label htmlFor="email" className="customizeLabel">Email</label>
            <Field name="email" type="email" id="email" className="customizeForm" placeholder="you@email.com"/>
            <ErrorMessage name="email" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
              </div>


            <span className={`${error.condition ? 'block' : 'hidden'} text-red-500 font-medium text-sm text-center capitalize`}>{error.message}</span>
            {/* button for submit  */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-primaryLight text-white rounded-md w-11/12 h-10 shadow-md drop-shadow-lg shadow-primary py-1  "
              >
                Search
              </button>
            </div>
          </Form>
          </Formik>
          </div>

  {/* //* illustraion part */}
      <div className="bg-gradient-to-b from-primaryDark to-primaryLight relative">
            <img src={forgotPassword}  alt="illustration" className="h-80 absolute scale-75 top-32 left-14"/>
      </div>

</div>
</div>
);
}

export default ForgotPassword;

