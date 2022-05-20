
import LogIn from './components/login';

import CreateAccount from './components/createAccount';
import ForgotPassword from './components/forgotPassword';
import {Route, Routes} from 'react-router-dom'


function App() {
  return (
    // <div className=" pt-8 bg-gray-100 h-screen ">
    //  

    //    {/* //* Form and login section  */}
    //      <LogIn />

    // </div>


        <div className='pt-8 bg-gray-100 h-screen' >
          <Routes>
          <Route path='/' element={<LogIn/>}/>
          <Route path='createaccount' element={<CreateAccount/>}/>
          <Route path='forgotpassword' element={<ForgotPassword/>}/>
          </Routes>
              
        </div>
  );
}

export default App;
