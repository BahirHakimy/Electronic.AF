
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";

  const initialValue = {
    firstName : '',
    lastName : '',
    phone : '',
    email : '', 
    password : '',
    confirmPassword : ''
  }

  const validationSchema = Yup.object().shape({
      firstName : Yup.string().required('You need to fill this field'),
      lastName: Yup.string().required('You need to fill this field'),
      phone: Yup.string().length(9, 'please enter the 9 digits of your phone number').required('You need to fill this field'),
      email :Yup.string().email('Invalid Email').required('You need to fill this field'),
      password: Yup.string().min(4, 'Too short').required('You need to fill this field'),
      confirmPassword : Yup.string().required().oneOf([Yup.ref('password')], 'password did not match')
  })



    function CreateAccount() {
    const navigate = useNavigate();
    const [error, setError] = useState({ condition: false, message: "" });
    const onSubmit = values =>  { 
      axios
        .post("http://127.0.0.1:8000/api/register/", {
            email : values.email,
            password: values.password,
            phone: values.phone,
            firstName: values.firstName,
            lastName: values.lastName
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

  return (
    <div className="bg-gray-100 h-screen">
      {/* //* header section */}
      <div className="text-center font-bold font-serif pt-5 ">
        <FontAwesomeIcon icon={faLaptopCode} className="h-16 " />
        <h1 className="text-3xl ">Create Your Account To Continue...</h1>
      </div>

      {/* card section */}
      <div className="bg-white shadow-md rounded w-9/12 lg:w-5/12 mx-auto mt-4 px-3 ">
        <Formik  initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        <Form>
            {/* //? First Name */}
            <div className="p-3">
          <label htmlFor="firstName" className="customizeLabel">First Name</label>
           <Field name="firstName" type="text" id="firstName" className="customizeForm " />
           <ErrorMessage name="firstName" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
            </div>
          
          {/* //? Last Name */}
          <div className="p-3">
          <label htmlFor="lastName" className="customizeLabel">Last Name</label>
           <Field name="lastName" type="text" id="lastName" className="customizeForm" />
           <ErrorMessage name="lastName" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
            </div>

          {/* //? Phone Number */}
          <div className="p-3">
          <label htmlFor="phone" className="text-sm text-gray-700 font-medium block">Phone Number</label>
           <Field name="phone" type="text" id="phone" className="customizeForm"/>  
           <ErrorMessage name="phone" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
            </div>

          {/* //? email */}
          <div className="p-3">
          <label htmlFor="email" className="customizeLabel">Email</label>
           <Field name="email" type="email" id="email" className="customizeForm"/>
           <ErrorMessage name="email" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
            </div>

          {/* //? Password */}
          <div className="p-3">
          <label htmlFor="password" className="customizeLabel">Password</label>
           <Field name="password" type="password" id="password" className="customizeForm "/>
           <ErrorMessage name="password" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
            </div>

              {/* //? Confirm  Password */}
          <div className="p-3">
          <label htmlFor="confirmPassword" className="customizeLabel">Confirm Password</label>
           <Field name="confirmPassword" type="password" id="confirmPassword" className="customizeForm"/>
           <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
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
              className="bg-gray-600 text-white rounded-md w-11/12  py-1  mt-2 mb-4 hover:bg-gray-800"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </Form>
        </Formik>


      </div>
    </div>
  );
}

export default CreateAccount;
