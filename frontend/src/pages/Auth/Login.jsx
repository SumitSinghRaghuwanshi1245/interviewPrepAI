import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = ({setCurrentPage}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();


  // handle login form submit
const handleLogin = async (e) => {
  e.preventDefault()

if (!validateEmail(email)) {
  setError("Please enter a valid email address.");
  return;
}
  if (!password) {
    setError("Please enter password.");
    return;
  }

  setError("");

//  login Api Call
try {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email,
    password,
  });

  const { token } = response.data;

  if (token){
    localStorage.setItem("token", token);
    updateUser(response.data)
    navigate("/dashboard")
  }


  
} catch (error) {
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("Something went wrong. Please try again.");
  }
}

};

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black' > Welcome Back!</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'> Please enter your details to login</p>
      <form onSubmit={handleLogin}>

        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@example.com" type="text" label="Email Address" />

        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" type="password" label="Password" />

         {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        
        <button type='submit' className='btn-primary'>Login</button>
        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account? {"  " }
        <button className='text-primary font-medium underline cursor-pointer' onClick={() => setCurrentPage("signup")}> SignUp</button>
        </p>
      </form>
    </div>
  )
}

export default Login
