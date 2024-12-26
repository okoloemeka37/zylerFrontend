'use client'
import React, { useState } from "react";
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from "next/navigation";
import ButtonLoaders from '@/app/component/Loaders'

import AuthController from "@/app/actions/Auth";
import PasswordReset from "@/app/component/PasswordReset";
const TokenConfirmation = () => {
  const [code, setcode] = useState("");
  const [isLoaded, setisLoaded] = useState(false);
  const [Errors, setErrors] = useState({'code':''});

  const [email, setEmail]= useState('')

  const router=useRouter();
  const {token,BASE_URL,userCred}=useAuth();
if (token) {

 router.push(BASE_URL+userCred['status']+"/Profile")
}

  const handleSubmit =async (e) => {
    setisLoaded(true);
    e.preventDefault();
    const send={
        code:code
    }
   
    const resp=await AuthController(send,'TokenConfirm');
    
    if (resp?.status ==200){
      setEmail(resp?.result.data.data);
      //console.log(resp?.result.data.data)
    }
    if (resp?.status ==422) {
      setErrors(resp.error);
      setisLoaded(false)
    }
    console.log(resp);
  
  };

  return (
    email.length===0?(    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Confirm Your Token</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the token sent to your email to confirm and reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">
              Token
            </label>
            <input
              type="text"
              id="token"
              value={code}
              onChange={(e) => setcode(e.target.value)}
              placeholder="Enter your token"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              
         
            />
                    <p className="text-red-800">{Errors.code}</p>
          </div>
         
          {!isLoaded?( <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Confirm Token
          </button>):(<ButtonLoaders ty={'login'} />)}
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Resend Token
          </a>
        </div>
      </div>
    </div>):(<PasswordReset Email={email}/>)
  );
};

export default TokenConfirmation;
