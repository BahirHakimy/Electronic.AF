
import LogIn from './components/login';
import CreateAccount from './components/createAccount';
import ForgotPassword from './components/forgotPassword';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import PasswordReset from './components/PasswordReset';
import NotFound from './components/404';

import Send from './components/sendResetCode2';
import { AuthProvider } from './hooks/authContext';

function App() {
  return (
        <div className='' >
          <AuthProvider >
          <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='createAccount' element={<CreateAccount/>}/>
          <Route path='sendResetCode' element={<Send/>}/>
          <Route path='forgotPassword' element={<ForgotPassword/>}/>
          <Route path='Home' element={<Home/>}/>
          <Route path='PasswordReset' element={<PasswordReset/>}/>
          <Route path='/' element={<LogIn/>}/>
          </Routes>
          </AuthProvider>
        </div>
  );
}

export default App;
