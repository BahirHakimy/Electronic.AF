import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


function LogIn() {
  return (
    <div className='my-8 '>
        {/* //* logo section  */}
        <div className='text-center'>
          <FontAwesomeIcon icon={faLaptopCode} className="h-16 "/>
          </div>

      {/* //* header section */}
      <div className='text-center'>
        <h1 className='text-2xl font-bold '>Sign In To Your Account </h1>
        {/* //todo add the registration page link in here */}
        <p>Or <Link to='/createaccount' className='font-semibold underline'> create your account now</Link></p>
      </div>

        {/*  //* card section  */}
         <div className='bg-white w-4/12 shadow-md rounded-md pt-2 pb-4 pl-4 mt-5 mx-auto'>
      {/* //* form  */}
              {/* //todod giving the form proper action field   */}
            <form className='' >
              {/* //? username input  */}
              <div className='pl-3 w-11/12 py-6'>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700  '>Email Address</label>
              <input type='email' id='email' className='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md w-full' required/>
              </div>

              {/* //? password section  */}
              <div className='pl-3 w-11/12 '>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700  '>Password</label>
              <input type='password' id='password' className='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md w-full' required/>
              </div>

            {/* //* forgot password and remember me section   */}
            <div className='py-3 pl-3 flex justify-between w-11/12'>
              {/* //? checkbox section  */}
                <div>
                  <input type="checkbox" name="remember" id="remember" className='rounded text-gray-700 ' />
                  <label htmlFor='remember' className='pl-2'>Remember me</label>
                </div>

                {/* //? forgot password  */}
                <div>
                  <p><Link to='/forgotpassword' className='capitalize font-semibold'>forgot your password?</Link></p>
                </div>
            </div>

            {/* //* button for sign in  */}
                <button type='submit' className='bg-gray-800 text-white rounded-md w-11/12 py-1 mt-1 ml-2'> Sign In</button>

            </form> 
          </div>
    </div>
  )
}

export default LogIn