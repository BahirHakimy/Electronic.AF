import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { setTokens } from "../Api/client";
import { useAuth } from "../hooks/authContext";

  const initialValue = {
     email : '',
     password: '',
     confirmPassword : ''
  }

  const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Required'),
      password : Yup.string().min(4, 'Too short').max(9, 'Too long ').required('Required'),
      confirmPassword : Yup.string().min(4, 'Too short').max(9, 'Too long ').required('Required').oneOf([Yup.ref('password')], 'password did not match', )
  })


  const PasswordReset = () => {

    const {user} = useAuth()
    const [error, setError] = useState({ condition: false, message: "" });
    const navigate = useNavigate();
  
    function onSubmit(values) {
      try{
          if(user.email !== '' ||  user.resetCode !== ''){
          axios
        .post("http://127.0.0.1:8000/api/auth/passwordReset/", {
          email : user.email,
          resetCode : user.resetCode,
          newPassword: values.resetPassword
        })
        .then((response) => {
                if(response.status === 200){
                  axios.post('http://127.0.0.1:8000/api/auth/token/',{
                    email: user.email,
                    password: values.newPassword
                  }).then(res => {
                    setTokens(res.data)
                    navigate('/products')
                  })
                }
        })
        .catch((error) =>
          setError({
            condition: true,
            message:
            error.response.data.detail
          })
        )
        } else {
            //* to take back user to the forgot password
            if(user.email === ''){
              navigate('/forgotPassword')
            }
        }
      }catch(e){

      }
    }
  
 
    return (
      <div className="h-screen bg-background flex items-center">
       <div className="grid grid-cols-1 max-w-5xl md:mx-auto shadow-xl mx-3  ">

    {/* //*form  section */}
    <div className="pt-4 px-12 space-y-3 bg-white pb-16  ">
      {/* //*header  */}
      <div className="flex justify-between px-7">
        <div className="font-bold text-primaryLight text-2xl">logo</div>
        <div className="text-gray-500 font-bold text-xl  hover:text-gray-700"><Link to={'/'}>Sign In</Link></div>
      </div>

      {/* //* Reset Your password  */}
      <div className="py-6 pl-7 md:mx-24    ">
        <h1 className="font-bold text-2xl pb-2 pt-6">Reset Your Password</h1>
      </div>

                <Formik 
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          >
          <Form >

          {/* //? Password */}
          <div className="p-3">
          <label htmlFor="password" className="customizeLabel">New Password</label>
          <Field name="password" type="text" id="password" className="customizeForm " placeholder="youPass"/>
          <ErrorMessage name="password" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
          </div>

          {/* //? Confirm Password */}
          <div className="p-3">
          <label htmlFor="confirmPassword" className="customizeLabel">Confirm New Password</label>
          <Field name="confirmPassword" type="text" id="confirmPassword" className="customizeForm" placeholder="youPass"/>
          <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
          </div>


          <span className={`${error.condition ? 'block' : 'hidden'} text-red-500 font-medium text-sm text-center capitalize`}>{error.message}</span>
          {/* button for submit  */}
          <div className="text-center py-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-primaryLight text-white rounded-md w-11/12 h-10 shadow-md drop-shadow-lg  shadow-primary  py-1"
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


