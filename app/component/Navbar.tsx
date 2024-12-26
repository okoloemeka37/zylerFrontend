'use client'


import React, { useEffect, useRef, useState } from 'react';


import { LogoutController } from '../actions/Auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { AddProductFunc } from '@/app/actions/Product'
import "../../styles/nav.css"

import Link from 'next/link';
import ButtonLoaders from './Loaders';
import Image from 'next/image';

export default function Navbar() {

 const route= useRouter()
 const {logout,isAuthenticated,token,userCred,BASE_URL}=useAuth();

 const [isLoaded, setisLoaded] = useState(false);

 const [Live, setLive] = useState([]);
 const [showLive, setshowLive] = useState(false);
 const searchRef=useRef(null);

const Logout=async()=>{
  setisLoaded(true)
 const response=await LogoutController(token);

 if (response.status=== 200) {
  logout()
  route.push("http://localhost:3000/auth/Login");
  setisLoaded(false)
 }
 
}

const [cartNum, setcartNum] = useState(0)
useEffect(() => {
  async function rt() {
  
    const resp=userCred.carts;
    
   setcartNum(resp.length);

   
  } 
rt()
}, [token,userCred])


//live search
const ls=async (e)=>{
  setshowLive(true)
  const data={
    search:e.target.value
  }

const resp=await AddProductFunc("lifeSearch",token,data);
setLive(resp?.result)
console.log(showLive)
}

const handleOutsideClick=(event)=>{
  if(searchRef.current && !searchRef.current.contains(event.target)){
setshowLive(false)

  }

}
useEffect(() => {
  document.addEventListener('mousedown',handleOutsideClick);

  return () => {
    document.removeEventListener('mousedown',handleOutsideClick);
  }
}, [])


  return (
    <>
<div className="navbar bg-indigo-800">
  <div className="flex-none">
    <Link className="btn btn-ghost text-xl" href="/">Still Searching</Link>
  </div>
  
  <div className="flex-1 mx-4">
    <div className="form-control w-full">
      <input type="text" placeholder="Search" className="input input-bordered w-full text-center" onInput={ls} ref={searchRef} />
    </div>
  </div>
  <Link href="http://localhost:3000/Products/Cart"> <Image src='/cart.png'alt="A description of the image"width={50} height={30}/></Link>
<sup className='text-teal-50'>{cartNum}</sup>
  <div className="flex-none gap-2">
    {isAuthenticated? (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar"  src={userCred.image !==''?`https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/`+userCred.image:'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link href={"/"+userCred['status']+"/Profile"} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href={"/Settings/Edit"} className="justify-between">Settings</Link>
          </li>

          {!isLoaded?(<li onClick={Logout}>
            <a>Logout</a>
          </li>):(<ButtonLoaders ty={'logout'} />)}

          
        </ul>
      </div>
    ) : (
      <Link className="btn btn-active btn-primary" href="/auth/Login">
        Login
      </Link>
    )}
  </div>
</div>



<div className='abs'>
  {showLive && (
    <ul className="bg-gray-100 rounded-lg shadow-lg divide-y divide-gray-200 w-80" ref={searchRef}>
  {Live.map((val,index)=>(
      <li className="p-4 hover:bg-blue-50 transition" key={index}>
      <Link href={BASE_URL+"/Products/"+val.id} onClick={()=>{setshowLive(false); }}><h3 className="text-base font-medium text-gray-800" >{val.name}</h3></Link>
      
    </li>
  ))}
  
    
</ul>)}


</div>


</>

  )
}
