
import LogIn from './components/login';

import CreateAccount from './components/createAccount';
import ForgotPassword from './components/forgotPassword';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import PasswordReset from './components/PasswordReset';

function App() {
  return (
        <div className='pt-8 bg-gray-100 h-screen' >
          <Routes>
          <Route path='createAccount' element={<CreateAccount/>}/>
          <Route path='forgotPassword' element={<ForgotPassword/>}/>
          <Route path='Home' element={<Home/>}/>
          <Route path='PasswordReset' element={<PasswordReset/>}/>
          <Route path='/' element={<LogIn/>}/>
          </Routes>
              
        </div>
  );
}

export default App;
