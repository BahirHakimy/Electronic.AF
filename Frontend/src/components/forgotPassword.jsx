import React from 'react'
import InputMaker from '../common/inputMaker'

function ForgotPassword() {
  return (
    <div className='bg-gray-100 h-screen'>
        {/* //*header section */}
        <div className='text-center pt-8'>
                <h1 className='text-4xl font-bold'>Forgot Password</h1>
                <h3 className='text-xl font-semibold'>Don't Worry We've Got you</h3>
        </div>

        {/* card section */}
        <div className='bg-white w-4/12 mx-auto mt-5'>
            <form>
            {/* //* card header section  */}
                <div className='text-center'>
                        <h3 className='capitalize font-semibold'>Just Give us the <span className='font-bold'>Email</span> & your <span className='font-bold'>security code </span> and you're set to go </h3>
                </div>

            {/* //? Last Name */}
            <div className='p-2'>
                <InputMaker type={'email'} name="forgotPassword" label="Email" styling={{labelStyling: 'block', input: 'w-full'}}/>
              </div>

                       {/* button for submit  */}
              <div className='text-center'>
              <button type='submit' className='bg-gray-600 text-white rounded-md w-11/12  py-1  my-2 hover:bg-gray-800'>Search</button>
              </div>
     

              </form>
        </div>
    </div>
  )
}

export default ForgotPassword