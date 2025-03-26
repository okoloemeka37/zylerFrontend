"use client"

import AuthController from '@/app/actions/Auth'
import Link from 'next/link'

import React, { useState } from 'react'
import ButtonLoaders from '@/app/component/Loaders'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Ivalues {
  name:string,
  email:string,
  password:string
  password_confirmation:string,
  address:string,
  phone:string
} 


export default function Register() {
  const router=useRouter();
  const {login,token,BASE_URL,userCred}=useAuth();

  if (token) {
    
      router.push(BASE_URL+userCred!.status+"/Dashboard")

  }

  
  const [isLoaded, setisLoaded] = useState(false)

  const [error, setErrors] = useState({
    'name':'',
    'email':'',
    'password':'',
    "password_confirmation":'',
    'phone':'',
    'address':''
  })
const [cred, setCred] = useState<Ivalues>({
  'name':'',
    'email':'',
    'password':'',
    "password_confirmation":'',
    'phone':'',
    'address':''
})
  


 


    const Register=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setisLoaded(true)

        const rest=await AuthController(cred,'register');



if (rest?.status ===200) {

if (rest?.result) {
  login(rest.result.data.token, rest.result.data.user);
}

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
         <p className='text-red-700'>{error['name']}</p>
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
            <p className='text-red-700'>{error['email']}</p>
       </div>
       
       
       <div className="mb-4">
         <label htmlFor="email" className="block text-gray-700">
           House Address 
         </label>
         <input
           type="address"
           id="address"
           name="address"
           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={cred.address}
           onChange={(e)=>{
           setCred(prevCred=>({
            ...prevCred,address:e.target.value
           })) 
           }}
           />
            <p className='text-red-700'>{error['address']}</p>
       </div>
       
       <div className="mb-4">
         <label htmlFor="phone" className="block text-gray-700">
           Phone number
         </label>
         <input
           type="phone"
           id="phone"
           name="phone"
           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={cred.phone}
           onChange={(e)=>{
           setCred(prevCred=>({
            ...prevCred,phone:e.target.value
           })) 
           }}
           />
            <p className='text-red-700'>{error['phone']}</p>
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
      <p className='text-red-700'>{error['password']}</p>
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
