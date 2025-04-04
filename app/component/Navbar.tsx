'use client'

import React, { useEffect, useRef, useState } from 'react';
import { LogoutController } from '../actions/Auth';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from "react-icons/fa";
import { AddProductFunc } from '@/app/actions/Product'
import "../../styles/nav.css"
import Link from 'next/link';
import ButtonLoaders from './Loaders';
import Image from 'next/image';

import { useAuth } from '../context/AuthContext';


export default function Navbar() {
  const route = useRouter()
  const { logout, isAuthenticated, token, userCred, BASE_URL } = useAuth();
  const [isLoaded, setisLoaded] = useState(false);
  interface Product {
    id: string;
    name: string;
  }



  const [Live, setLive] = useState<Product[]>([]);
  const [showLive, setshowLive] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const liveSearchRef = useRef<HTMLUListElement>(null);
  const [cartNum, setcartNum] = useState(0)
 



  const Logout = async () => {
    setisLoaded(true)
    const response = await LogoutController(token);

    if (response.status === 200) {
      logout()
      route.push(BASE_URL+`/auth/Login`);
      setisLoaded(false)
    }
  }

  useEffect(() => {
    async function rt() {
      const resp: Product[] = Array.isArray(userCred.carts) ? userCred.carts : [];
      setcartNum(resp.length);
    }
    rt()
  }, [token, userCred])

  const ls = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setshowLive(true)
    const data = {
      search: e.target.value
    }
    const resp = await AddProductFunc("lifeSearch", token, data);
    setLive(resp?.result)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchRef.current && !searchRef.current.contains(event.target as Node) &&
      liveSearchRef.current && !liveSearchRef.current.contains(event.target as Node)
    ) {
      setshowLive(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [])

  return (
    <>
      <div className="navbar bg-indigo-800">
        <div className="flex-none">
          <Link href="/"><Image src="/log2.png" alt="Description" height={100} width={100} /></Link>
        </div>
        <div className="flex-1 mx-4">
          <div className="form-control sm:w-50 lg:w-full md:w-full">
            <input type="text" placeholder="Search" className="input input-bordered w-full text-center bg-white" onInput={ls} ref={searchRef} />
          </div>
        </div>
        <Link href={BASE_URL+"/Products/Cart"}><FaShoppingCart className="w-6 h-6 text-gray-800" /></Link>
        <sup className='text-teal-50'>{cartNum}</sup>
        <div className="flex-none gap-2">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={userCred.image !== '' ? `https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/` + userCred.image : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} alt="User avatar" width={40} height={40} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={"/" + userCred['status'] + "/Dashboard"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/Settings/Edit"} className="justify-between">Settings</Link>
                </li>

                {!isLoaded ? (<li onClick={Logout}>
                  <a>Logout</a>
                </li>) : (<ButtonLoaders ty={'logout'} />)}


              </ul>
            </div>
          ) : (
            <Link className="btn btn-active btn-primary ml-4" href="/auth/Login">
              Login
            </Link>
          )}
        </div>
       
      </div>



      <div className='abs'>
        {showLive && (
          <ul className="bg-gray-100 rounded-lg shadow-lg divide-y divide-gray-200 w-80" ref={liveSearchRef}>
            {Live.map((val, index) => (
              <li className="p-4 hover:bg-blue-50 transition" key={index}>
                <Link href={BASE_URL + "/Products/" + val.id} onClick={() => { setshowLive(false); }}><h3 className="text-base font-medium text-gray-800" >{val.name}</h3></Link>

              </li>
            ))}


          </ul>)}


      </div>


    </>

  )
}
