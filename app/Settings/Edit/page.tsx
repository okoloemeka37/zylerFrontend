'use client'
import { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext'
import { UpdateCont } from "@/app/actions/Auth";
import ButtonLoaders from '@/app/component/Loaders'
import Tops from "@/app/component/Tops";
import { useRouter } from "next/navigation";
import "../../../styles/body.css"
import Image from 'next/image';

export default function EditProfilePage() {

    const router=useRouter();
    const {userCred,token,BASE_URL,User}=useAuth();
    const [data, setdata] = useState( {name: '', email: '', status: '', id: '', carts: [], orders: [], phone: '', address: '',image:''});
    const [Preview, setPreview] = useState<string>()
    const [selectedImage, setSelectedImage] = useState<File|null>(null)

    const [mes, setmes] = useState('')

      const [isLoaded, setisLoaded] = useState(false)

      const [errors, setErrors] = useState( {name: '', email: '', status: '', id: '', carts: [], orders: [], phone: '', address: '',image:''});
useEffect(() => {
  if (userCred) {
    setdata(userCred);
    setPreview(`https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/`+userCred!.image);
  }
}, [userCred])



 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
 
  };
  


  const handleSubmit =async (e:React.FormEvent) => {
    e.preventDefault();
   
     const formdata=new FormData();
 
    formdata.append('name',data['name']);
    formdata.append('email',data['email']);
    formdata.append('phone',data['phone']);
    formdata.append('address',data['address']);
    if (!selectedImage) {
      formdata.append('image',data['image']);
      console.log(data['image'])
    }else{
      formdata.append('image',selectedImage);
      console.log(selectedImage)
    }
   
setisLoaded(true)
const resp=await  UpdateCont(`Update${data['id']}`,formdata,token)

for (const [key, value] of formdata.entries()) {
  console.log(key, value);
}
if (resp?.status ===200) {    
    
    setisLoaded(false)
    
  if (resp?.result) {
    setmes(resp.result.data.message);
  }
    setTimeout(() => {
        if (resp?.result) {
          User(resp.result.data.user);
        }
        router.push(BASE_URL+"user/Profile")
    }, 5000);  
    }
   
    if (resp?.status ==422) {
      setErrors(resp.error);
      setisLoaded(false)
    } 
  }


  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let url='';
    const file = e.target.files ? e.target.files[0] : null;
    if (e.target.files && e.target.files[0])  {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        if (file) {
           url = URL.createObjectURL(file);
          setPreview(url);
        }
        setPreview(url)
        console.log(url)
       // const fileArray = Array.from(e.target.files[0]).map((file) =>URL.createObjectURL(file) );
       

      };
    
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  
  const render = (source: string) => {
    return (
     
        
        <Image src={source} alt="" width={500} height={500} className="tj" />
    
    );
  };
  return (
    <div className="container mx-auto py-10 px-6">
       {mes.length !=0?(<Tops title={mes} /> ):('')}
     
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit}  className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto" encType="multipart/form-data">
          <div className="result flex gv">{render(Preview!)}</div>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
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
            value={data.email}
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
            value={data.phone}
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
            value={data.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <p className="text-red-600">{errors.address}</p>
        </div>

        <div>
          <input type="file" name="image" multiple  id="file" onChange={change} />
          <p className="text-red-600">{errors.image}</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
         
          {!isLoaded?(<button type="submit"className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Changes</button>):(<ButtonLoaders ty={'change'} />)}
     
        </div>
      </form>
    </div>
  );
}
