  import { useState } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ErrorMessage, Field, Form, Formik} from "formik";
  import * as Yup from 'yup'

  const initialValue = {
    email : '',
    password : ''
  }

  const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string().required('Required')
  }) 

  

function LogIn() {

  const [error, setError] = useState({ condition: false, message: "" });
  const navigate = useNavigate();

  function onSubmit(values) {
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        email: values.emailaddress,
        password: values.password
      })
      .then((response) => {
        if (response.status === 200) navigate("/Home", { replace: true });
      })
      .catch((error) => setError({ condition: true, message: error.response.data.detail }));
  }

  return (
    <div className="my-8 ">
      {/* //* logo section  */}
      <div className="text-center">
        <FontAwesomeIcon icon={faLaptopCode} className="h-16 " />
      </div>

      {/* //* header section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold ">Sign In To Your Account </h1>
        {/* //todo add the registration page link in here */}
        <p>
          Or{" "}
          <Link to="/createaccount" className="font-semibold underline">
            {" "}
            create your account now
          </Link>
        </p>
      </div>

     {/* card section */}
     <div className="bg-white shadow-md rounded w-9/12 lg:w-4/12 mx-auto mt-4 px-3 ">

        <Formik  initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        >
        <Form>
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

export default LogIn;
