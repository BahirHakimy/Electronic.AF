import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="bg-gray-100 h-screen">
          {/* //*header section */}
          <div className="text-center pt-8">
            <h1 className="text-4xl font-medium capitalize">Please Enter the following credentials to reset your password</h1>

          </div>
    
          {/* card section */}
          <div className="bg-white w-4/12 mx-auto mt-5">
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
      );
}

export default PasswordReset