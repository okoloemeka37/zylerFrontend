"use client"
import React, {useState } from 'react'
import AuthController from '@/app/actions/Auth'
import { useAuth } from '@/app/context/AuthContext'
import Link from 'next/link'

import ButtonLoaders from '@/app/component/Loaders'
import { useRouter } from 'next/navigation'


interface Ivalues {
  email:string,
  password:string
} 
//401;


export default function Login() { 
  const router=useRouter();
   const {login,token,prevURL,setterURL}=useAuth();
if (token) {

    router.push(prevURL);
    setterURL('')
  
}

  const [isLoaded, setisLoaded] = useState(false)


  const [email, setEmail] = useState('')
const [password, setPassword]= useState('');
const [errors, setErrors] = useState({
  'email':'',
  'password':'',
  'gen':''
});


const submit=async (event:React.FormEvent)=>{

event.preventDefault();
setisLoaded(true)

const data:Ivalues={
email:email,
password:password
}


const rest= await AuthController(data,'login')
  

if (rest?.status === 200 && rest.result) {

login(rest.result.data.token, rest.result.data.user);

 

setisLoaded(false)
}
if (rest?.status ==422) {
  setErrors(rest.error);
  setisLoaded(false)
}
if (rest?.status ==401) {
  setErrors({'email':'','password':'','gen':rest.error});
  setisLoaded(false)
}
 




}



  return (
    <div className="flex items-center justify-center min-h-screen">
     

    <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={submit}>
      {errors.gen =='Invalid Credentials'?( 
         <div role="alert" className="alert alert-error">
  <span>Error! {errors.gen} </span>
</div>):("")}
  
    <p></p>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={email}
onChange={(e)=>setEmail(e.target.value)}
        />
        <p>{errors.email}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
         <p>{errors.password}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
      
        <Link href="ForgotPassword" className="text-blue-500 hover:text-blue-700 text-sm">
          Forgot password?
        </Link>
      </div>{!isLoaded?( <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full">
        Login
      </button>):(<ButtonLoaders ty={'login'} />)}
     
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm"> Don&apos;t  have an account? <Link href="/auth/Register">Sign up</Link> </p>
      </div>
    </form>
    </div>
  )
}
