"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {cat, single } from '@/app/actions/Product';

export default function Profile() {
 const router=useRouter()
const {token,userCred}=useAuth();
const [product, setproduct] = useState({'id':0})
const [user, setuser] = useState({'id':0})
const [order, setorder] = useState({'order_id':0})
const [noti, setnoti] = useState([{'notice':'','type_id':0,'id':0}])

useEffect(() => {
  if (!token) {
    router.push("http://localhost:3000/auth/Login")
}
}, [token,router,userCred])


useEffect(() => {
 async function getsum() {
  const resp=await cat('getSum',token);
setproduct(resp?.result[0][0]);
setuser(resp?.result[2][0]);
setorder(resp?.result[1][0]||{'order_id':0});

//notification
const not=await single('getNote',token);
setnoti(not?.result);
}
getsum();

  
}, [token])

if (typeof location !== 'undefined') {
  // Code that uses location
}

  return (
    <div className="container mx-auto p-5">
    <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card for Total Products */}
      <Link href="../Admin/Product">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    
        <div className="mr-4 p-3 bg-blue-100 rounded-full">
          <svg
            className="h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
     
        <div>
          <h3 className="text-xl font-bold text-gray-700">Total Products</h3>
          <p className="text-gray-500">{product.id}</p>
        </div>
      
      </div>
        </Link>
  
      <Link href="../Admin/Product/OrdersView">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      
        <div className="mr-4 p-3 bg-green-100 rounded-full">
          <svg
            className="h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18m-7 5h7"
            />
          </svg>
        </div>
        
        <div>
        
          <h3 className="text-xl font-bold text-gray-700">Total Orders</h3>
          <p className="text-gray-500">{order.order_id}</p>
          
        </div>
      </div>
      </Link>

      <Link href="../Admin/User">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      
        <div className="mr-4 p-3 bg-green-100 rounded-full">
          <svg
            className="h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18m-7 5h7"
            />
          </svg>
        </div>
        
        <div>
        
          <h3 className="text-xl font-bold text-gray-700">Total Users</h3>
          <p className="text-gray-500">{user.id}</p>
          
        </div>
      </div>
      </Link>
      {/* Card for Total Revenue */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="mr-4 p-3 bg-yellow-100 rounded-full">
          <svg
            className="h-10 w-10 text-yellow-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-3 0v6m0-6V6m6 6h-6m3 0V6m-6 0h6M3 12h18"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-700">Total Revenue</h3>
          <p className="text-gray-500">$3,500</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
        
<div > <p className="  text-l font-semibold text-center text-gray-800"></p></div>
        <h3 className="text-xl font-bold mb-4 text-gray-700"><Link href="./Notification">Notification</Link></h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
            
              <th className="py-3 px-4 border-b">notice</th>
            
            </tr>
          </thead>
          <tbody>
           
           
          {noti.map(eri=>(
              <tr className="hover:bg-gray-100 text-center" key={eri.id}>
              <td className="py-3 px-4 border-b"><Link href="">{eri.notice}</Link></td>

            </tr>
          ))}
          
          </tbody>
        </table>
      </div>
    
    </div>
  </div>
  
  
  )
}
