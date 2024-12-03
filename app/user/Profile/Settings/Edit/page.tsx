'use client'
import { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext'
import { UpdateController } from "@/app/actions/Auth";
import ButtonLoaders from '@/app/component/Loaders'
import Tops from "@/app/component/Tops";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const router=useRouter();
    const {userCred,token,BASE_URL,User}=useAuth();
    const [formData, setFormData] = useState({id:0,name: "", email: "",phone: "",address: "",});

    const [mes, setmes] = useState('')

      const [isLoaded, setisLoaded] = useState(false)

      const [errors, setErrors] = useState({name: "", email: "",phone: "",address: "",});
useEffect(() => {
  
setFormData(userCred);

}, [userCred])



 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
setisLoaded(true)
const resp=await  UpdateController(`Update${formData['id']}`,token,formData)

if (resp?.status ===200) {    
    
    setisLoaded(false)
  /*   setmes(resp?.result.data.message);
    setTimeout(() => {
        User(resp?.result.data.user);
        router.push(BASE_URL+"user/Profile")
    }, 5000); */
    }
    if (resp?.status ==422) {
      setErrors(resp.error);
      setisLoaded(false)
    }
  }
  return (
    <div className="container mx-auto py-10 px-6">
       {mes.length !=0?(<Tops title={mes} /> ):('')}
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-600">{errors.name}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <p className="text-red-600">{errors.email}</p>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <p className="text-red-600">{errors.phone}</p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <p className="text-red-600">{errors.address}</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
         
          {!isLoaded?(<button type="submit"className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Changes</button>):(<ButtonLoaders ty={'change'} />)}
     
        </div>
      </form>
    </div>
  );
}
