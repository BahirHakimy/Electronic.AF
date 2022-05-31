import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'

  const initialValue = {

  }

  const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Required'),
      password : Yup.string().min(4, 'Too short').max(9, 'Too long ').required('Required'),
      confirmPassword : Yup.string().min(4, 'Too short').max(9, 'Too long ').required('Required')
  })


const PasswordReset = () => {

    const [error, setError] = useState({ condition: false, message: "" });
    const navigate = useNavigate();
  
    function onSubmit(values) {

      //todo match the passwords 
      axios
        .post("http://127.0.0.1:8000/api/passwordReset/", {
          email : values.resetPasswordEmail,
          resetCode : values.resetPasswordNumber,
          newPassword: values.resetPassword
        })
        .then((response) => {
                if(response.status === 200) navigate('/Home')
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
  <div className="grid grid-cols-1 max-w-5xl mx-auto shadow-xl scale-110 ">

    {/* //*form  section */}
    <div className="pt-4 px-3 space-y-3 bg-white">
      {/* //*header  */}
      <div className="flex justify-between px-7">
        <div className="font-bold text-primaryLight text-2xl">logo</div>
        <div className="text-gray-500 font-bold text-xl  hover:text-gray-700"><Link to={'/'}>Sign In</Link></div>
      </div>

      {/* //* sign in  */}
      <div className="py-6 pl-7  ">
        <h1 className="font-bold text-2xl pb-2 pt-6">Enter the 6 digit you recieved in your email</h1>
        <span className="text-gray-400 text-lg font-mono">
          kindly check your spam if you did not recieve it
        </span>
      </div>

                <Formik 
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          >
          <Form >
          {/* //? email */}
          <div className="p-3">
          <label htmlFor="email" className="customizeLabel">Email</label>
          <Field name="email" type="email" id="email" className="customizeForm"/>
          <ErrorMessage name="email" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
          </div>

          {/* //? Password */}
          <div className="p-3">
          <label htmlFor="password" className="customizeLabel">Password</label>
          <Field name="password" type="text" id="password" className="customizeForm "/>
          <ErrorMessage name="password" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
          </div>

          {/* //? Password */}
          <div className="p-3">
          <label htmlFor="confirmPassword" className="customizeLabel">Confirm Password</label>
          <Field name="confirmPassword" type="text" id="confirmPassword" className="customizeForm "/>
          <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
          </div>


          <span className={`${error.condition ? 'block' : 'hidden'} text-red-500 font-medium text-sm text-center capitalize`}>{error.message}</span>
          {/* button for submit  */}
          <div className="text-center">
          <button
            type="submit"
            className="bg-gray-600 text-white rounded-md w-11/12  py-1  my-2 hover:bg-gray-800"
          >
            Reset
          </button>
          </div>
          </Form>
          </Formik>
              
              </div>

            
  </div>
  </div>
);
}

export default PasswordReset


