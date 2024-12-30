'use client'

import React, { useEffect, useRef, useState } from 'react';
import { LogoutController } from '../actions/Auth';
import { useRouter } from 'next/navigation';

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
          <Link className="btn btn-ghost text-xl" href="/">Still Searching</Link>
        </div>
        <div className="flex-1 mx-4">
          <div className="form-control w-full">
            <input type="text" placeholder="Search" className="input input-bordered w-full text-center" onInput={ls} ref={searchRef} />
          </div>
        </div>
        <Link href={BASE_URL+"/Products/Cart"}>
          <Image src='data:image/jpeg;base64,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' alt="Cart" width={40} height={40} className='rounded-full' />
        </Link>
        <sup className='text-teal-50'>{cartNum}</sup>
        <div className="flex-none gap-2">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image src={userCred.image !== '' ? `https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/` + userCred.image : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} alt="User avatar" width={40} height={40} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={"/" + userCred['status'] + "/Profile"} className="justify-between">
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
            <Link className="btn btn-active btn-primary" href="/auth/Login">
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
