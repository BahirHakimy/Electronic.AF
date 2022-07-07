
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import building  from '../illustrations/building.svg'
import { setTokens } from "../Api/client";

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
      try{
      axios
        .post("http://127.0.0.1:8000/api/auth/register/", {
            email : values.email,
            password: values.password,
            phone: values.phone,
            firstname: values.firstName,
            lastname: values.lastName,
          })
          .then((response) => {
              if (response.status === 201) {
                axios.post('http://127.0.0.1:8000/api/auth/token/', {
                  email : values.email,
                  password : values.password
                }).then(res => {
                  if(res.status === 200) {
                    setTokens(res.data)
                    navigate('/products')
                  }
                })
                // todo to error handle in here 
                .catch(e =>  null)
              }
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
            ) 
          } catch(e){
              console.log(e);
          }

        }

        return (
          <div className=" bg-background flex items-center ">
      <div className="customizeCard my-2 scale-95">
  
        {/* //*form  section */}
        <div className="pt-4 px-3 space-y-3 bg-white pb-4 ">
          {/* //*header  */}
          <div className="flex justify-between px-7">
            <div className="font-bold text-primaryLight text-2xl">logo</div>
            <div className="text-gray-500 font-bold text-xl  hover:text-gray-700"><Link to={'/'}>Sign In</Link></div>
          </div>
  
          {/* //* sign in  */}
          <div className="py-6 pl-7 flex flex-wrap ">
            <h1 className="font-bold text-2xl pb-2 pt-6">Create Your Account</h1>
            <span className="text-gray-400 text-md font-mono w-full">
              and find the best deals...
            </span>
          </div>


           <Formik  initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
            <Form>
                {/* //? First Name */}
                <div className="customField">
              <label htmlFor="firstName" className="customizeLabel">First Name</label>
              <Field name="firstName" type="text" id="firstName" className="customizeForm " />
              <ErrorMessage name="firstName" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
                </div>
              
              {/* //? Last Name */}
              <div className="customField">
              <label htmlFor="lastName" className="customizeLabel">Last Name</label>
              <Field name="lastName" type="text" id="lastName" className="customizeForm" />
              <ErrorMessage name="lastName" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
                </div>

              {/* //? Phone Number */}
              <div className="customField">
              <label htmlFor="phone" className="text-sm text-gray-700 font-medium block">Phone Number</label>
              <Field name="phone" type="text" id="phone" className="customizeForm"/>  
              <ErrorMessage name="phone" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
                </div>

              {/* //? email */}
              <div className="customField">
              <label htmlFor="email" className="customizeLabel">Email</label>
              <Field name="email" type="email" id="email" className="customizeForm"/>
              <ErrorMessage name="email" render={msg => <div className="text-red-500 capitalize font-medium">{msg}</div>}/>
                </div>

              {/* //? Password */}
              <div className="customField">
              <label htmlFor="password" className="customizeLabel">Password</label>
              <Field name="password" type="password" id="password" className="customizeForm "/>
              <ErrorMessage name="password" render={msg => <div className="text-red-500  capitalize font-medium">{msg}</div>}/>
                </div>

                  {/* //? Confirm  Password */}
              <div className="customField">
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
              <div className="text-center mt-4 mb-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primaryLight text-white rounded-md w-11/12 h-10 shadow-md drop-shadow-lg  shadow-primary  py-1"
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
                  <img src={building}  alt="illustration" className="h-80 absolute  top-44 left-14"/>
            </div>
  
      </div>
      </div>
    );
}

export default CreateAccount;



