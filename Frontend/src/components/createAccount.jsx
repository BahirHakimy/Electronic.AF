import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import InputMaker from '../utils/inputMaker';

function CreateAccount() {
  return (
    <div className='bg-gray-100 h-screen'>
        {/* //* header section */}
        <div className='text-center font-bold font-serif pt-5 '>
              <FontAwesomeIcon icon={faLaptopCode} className="h-16 "/>
            <h1 className='text-3xl '>Create Your Account To Continue...</h1>
        </div>

        {/* card section */}
        <div className='bg-white shadow-md rounded w-4/12 mx-auto mt-4 '>
          
          <form >
             {/* //?First Name */}
             <div className='p-2'>
                <InputMaker type={'text'} name="firstName" label="First Name" styling={{labelStyling: 'block', input: 'w-full'}}/>
              </div>

              {/* //? Last Name */}
             <div className='p-2'>
                <InputMaker type={'text'} name="lastName" label="Last Name" styling={{labelStyling: 'block', input: 'w-full'}}/>
              </div>

              {/* //? email */}
              <div className='p-2'>
                <InputMaker type={'email'} name="firstName" label="Email Address" styling={{labelStyling: 'block', input: 'w-full'}}/>
              </div>

               {/* //? Last Name */}
             <div className='p-2'>
                <InputMaker type={'password'} name="password" label="Password" styling={{labelStyling: 'block', input: 'w-full'  }}/>
              </div>

              {/* button for submit  */}
              <div className='text-center'>
              <button type='submit' className='bg-gray-600 text-white rounded-md w-11/12  py-1  my-2 hover:bg-gray-800'> Sign Up</button>
              </div>

              </form>
        </div>
    </div>
  )
}

export default CreateAccount