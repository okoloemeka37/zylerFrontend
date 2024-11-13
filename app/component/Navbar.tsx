'use client'


import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { LogoutController } from '../actions/Auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
 const route= useRouter()

  const [token, setToken] = useState(null);

useEffect(() => {
  const getToken=localStorage.getItem('Token')!;
  setToken(getToken)
  console.log(token)
}, [token])

const Logout=async()=>{
  
 const response=await LogoutController(token);
 console.log(response)
 if (response.status=== 200) {
  localStorage.removeItem("Token");
  route.push("http://localhost:3000/auth/Login")
 }
 setToken(null)
}
  return (
<div className="navbar bg-indigo-800">
  <div className="flex-none">
    <a className="btn btn-ghost text-xl">Still Searching</a>
  </div>
  
  <div className="flex-1 mx-4">
    <div className="form-control w-full">
      <input type="text" placeholder="Search" className="input input-bordered w-full text-center" />
    </div>
  </div>

  <div className="flex-none gap-2">
    {token !== null ? (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link href="/user/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href="/user/profile/settings" className="justify-between">Settings</Link>
          </li>
          <li onClick={Logout}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    ) : (
      <Link className="btn btn-active btn-primary" href="/auth/login">
        Login
      </Link>
    )}
  </div>
</div>


  )
}
