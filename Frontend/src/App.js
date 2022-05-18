
import LogIn from './components/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import CreateAccount from './components/createAccount';
import ForgotPassword from './components/forgotPassword';


function App() {
  return (
    // <div className=" pt-8 bg-gray-100 h-screen ">
    //   {/* //* logo section  */}
    //     <div className='text-center'>
    //     <FontAwesomeIcon icon={faLaptopCode} className="h-16 "/>
    //     </div>

    //    {/* //* Form and login section  */}
    //      <LogIn />

    // </div>


    // * for creating the account page 
        <div >
              {/* <CreateAccount/> */}
              <ForgotPassword />
        </div>
  );
}

export default App;
