'use client'

import {UpdateController} from "@/app/actions/Auth";
import { useEffect, useState } from "react";
import ButtonLoaders from '@/app/component/Loaders'
import Tops from "@/app/component/Tops";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext'

export default function ChangePassword() {
    const router=useRouter();
    const {token,BASE_URL,userCred}=useAuth();
const [data, setdata] = useState({'oldPassword':'','password':'','password_confirmation':'',email:''})
const [id, setid] = useState(0);


useEffect(() => {
 setdata(prev=>({
...prev,email:userCred.email
 }))
 setid(userCred.id)
}, [userCred])



const [mes, setmes] = useState('')

const [isLoaded, setisLoaded] = useState(false)

const [errors, setErrors] = useState({oldPassword: "", password: "",password_confirmation: ""});


    const handleSubmit =async (e: React.FormEvent) => {
      e.preventDefault();
    const resp=await UpdateController(`ChangePassword${id}`,data);
 
   if (resp?.status == 200) {    
    
    setisLoaded(false)
    setmes(resp?.result.data.message);

    setTimeout(() => {
        router.push(BASE_URL+"user/Profile")
    }, 3000);
    }
    if(resp?.status == 404){
      console.log(resp.error.message)
      setisLoaded(false)
      setmes(resp.error.message);
    }
    if (resp?.status ==422) {
      setErrors(resp.error);
      setisLoaded(false)
    }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        {mes.length !=0?(<Tops title={mes} /> ):('')}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Change Password
          </h2>
  
          <form onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="mb-4">
              <label
                htmlFor="current-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                name="currentPassword"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your current password"
                
                value={data.oldPassword}
                onChange={(e)=>{
                    setdata(prev=>({
                        ...prev,oldPassword:e.target.value
                    }))
                }}
              />
                <p className="text-red-600">{errors.oldPassword}</p>
            </div>
  
            {/* New Password */}
            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a new password"
                
                value={data.password}
                onChange={(e)=>{
                    setdata(prev=>({
                        ...prev,password:e.target.value
                    }))
                }}
              />
                <p className="text-red-600">{errors.password}</p>
            </div>
  
            {/* Confirm New Password */}
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="password_confirmation"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your new password"
                
                value={data.password_confirmation}
                onChange={(e)=>{
                    setdata(prev=>({
                        ...prev,password_confirmation:e.target.value
                    }))
                }}
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-center">
            {!isLoaded?(<button type="submit"className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Changes</button>):(<ButtonLoaders ty={'change'} />)}
            </div>
          </form>
        </div>
      </div>
    );
  }
  