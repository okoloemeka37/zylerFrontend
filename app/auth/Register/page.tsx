"use client"

import AuthController from '@/app/actions/Auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ButtonLoaders from '@/app/component/Loaders'
import { useAuth } from '@/app/context/AuthContext'

interface Ivalues {
  name:string,
  email:string,
  password:string
  password_confirmation:string
} 


export default function Register() {
  const {login,token}=useAuth();
  const router=useRouter()
 if (token) {
     router.push("../../user/Profile")
   }
 

  const [isLoaded, setisLoaded] = useState(false)

  const [error, setErrors] = useState({
    'name':'',
    'email':'',
    'password':'',
    "password_confirmation":''
  })
const [cred, setCred] = useState<Ivalues>({
  'name':'',
    'email':'',
    'password':'',
    "password_confirmation":''
})
  


 


    const Register=async (event)=>{
        event.preventDefault();
        setisLoaded(true)

        const rest=await AuthController(cred,'register');
console.log(rest)


if (rest?.status ===200) {
  login(rest?.result.data.token,rest?.result.data.user)
  router.push("../../product/ViewProduct")
  setisLoaded(false)
}
if (rest?.status ==422) {
  setErrors(rest.error);
  setisLoaded(false)
}

 

    }



  return (

         <div className="flex items-center justify-center min-h-screen">
     

     <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={Register}>
    
   
     <p></p>
       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
       <div className="mb-4">
         <label htmlFor="name" className="block text-gray-700">
           Name
         </label>
         <input type="name"  id="name"  name="name" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
         value={cred.name}
         onChange={(e)=>{
          setCred(prevCred=>({
            ...prevCred,name:e.target.value
          }))
         }}
         />
         <p>{error['name']}</p>
       </div>

       <div className="mb-4">
         <label htmlFor="email" className="block text-gray-700">
           Email
         </label>
         <input
           type="email"
           id="email"
           name="email"
           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={cred.email}
           onChange={(e)=>{
           setCred(prevCred=>({
            ...prevCred,email:e.target.value
           })) 
           }}
           />
            <p>{error['email']}</p>
       </div>
       
       <div className="mb-4">
         <label htmlFor="password" className="block text-gray-700">
           Password
         </label>
         <input
           type="password"
       
           name="password"
           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={cred.password}
           onChange={(e)=>{
           setCred(prevCred=>({
            ...prevCred,password:e.target.value
           })) 
           }}
         />
      <p>{error['password']}</p>
       </div>
       <div className="mb-4">
         <label htmlFor="password" className="block text-gray-700">
         Confirm Password
         </label>
         <input
           type="password"
       
           name="password_confirmation"
           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={cred.password_confirmation}
           onChange={(e)=>{
           setCred(prevCred=>({
            ...prevCred,password_confirmation:e.target.value
           })) 
           }}
         />
     
       </div>
       {!isLoaded?(<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full">SignUp</button>):(<ButtonLoaders ty={'login'} />)}
       

       
       <div className="mt-4 text-center">
         <p className="text-gray-600 text-sm"> Already have an account? <Link href="/auth/Login">Login</Link> </p>
       </div>
     </form>
     
    </div>
  )
}
