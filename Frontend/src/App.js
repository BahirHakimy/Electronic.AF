
import LogIn from './components/login';
import CreateAccount from './components/createAccount';
import ForgotPassword from './components/forgotPassword';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import PasswordReset from './components/PasswordReset';
import NotFound from './components/404';
import {ToastContainer} from 'react-toastify'
import Send from './components/sendResetCode';
import { AuthProvider } from './hooks/authContext';
import Products from './components/products';
import Cart from './components/cart';

function App() {
  return (
        <div className='' >
          <AuthProvider >
          <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='createAccount' element={<CreateAccount/>}/>
          <Route path='sendResetCode' element={<Send/>}/>
          <Route path='forgotPassword' element={<ForgotPassword/>}/>
          <Route path='logIn' element={<LogIn/>}/>
          <Route path='PasswordReset' element={<PasswordReset/>}/>
          <Route path='Products' element={<Products/>} />
          <Route path='cart' element={<Cart/>}/>
          <Route path='/' element={<Home/>}/>
          </Routes>
          </AuthProvider>
          <ToastContainer />
        </div>
  );
}

export default App;
