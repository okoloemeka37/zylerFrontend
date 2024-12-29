'use client'
import Link from "next/link";
import React, {  useState } from "react";
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from "next/navigation";
import AuthController from "@/app/actions/Auth";
import ButtonLoaders from '@/app/component/Loaders'

const ForgotPassword = () => {
  const router=useRouter();
  const {token,BASE_URL,userCred}=useAuth();
if (token) {

 router.push(BASE_URL+(userCred as { status: string }).status +"/Profile")
}

const [Errors, setErrors] = useState({'email':''});
const [data, setdata] = useState('');
const [isLoaded, setisLoaded] = useState(false);


const sendLink=async()=>{
  setisLoaded(true);
  const send={
    email:data
  }
  const resp=await AuthController(send,'passReset');
  console.log(resp);
  if (resp?.status ==200){
    router.push(BASE_URL+'auth/ForgotPassword/ConfirmToken')
  }
  if (resp?.status ==422) {
    setErrors(resp.error);
    setisLoaded(false)
  }
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your email address below, and we will send you a link to reset your password.
        </p>
    
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         onChange={(e)=>setdata(e.target.value)}  />
            <p className="text-red-800">{Errors.email}</p>
          </div>
       
       
          {!isLoaded?(  <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={sendLink}>
            Send Reset Link
          </button>):(<ButtonLoaders ty={'login'} />)}

        <div className="mt-4 text-center">
          <Link
            href="Login"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
