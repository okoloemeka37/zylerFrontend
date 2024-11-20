"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';


export default function Profile() {
 const router=useRouter()
const {token,userCred}=useAuth()
console.log(userCred)
if (!token) {
    router.push("http://localhost:3000/auth/Login")
}


  return (
    <div className="container mx-auto p-5">
    <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card for Total Products */}
      <Link href="../user/Product">
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
          <p className="text-gray-500">150</p>
        </div>
      
      </div>
        </Link>
      {/* Card for Total Orders */}
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
          <p className="text-gray-500">75</p>
          
        </div>
      </div>
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
        <h3 className="text-xl font-bold mb-4 text-gray-700">Recent Orders</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">Customer</th>
              <th className="py-3 px-4 border-b">Total</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">#12345</td>
              <td className="py-3 px-4 border-b">John Doe</td>
              <td className="py-3 px-4 border-b">$100.00</td>
              <td className="py-3 px-4 border-b">Shipped</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">#12346</td>
              <td className="py-3 px-4 border-b">Jane Smith</td>
              <td className="py-3 px-4 border-b">$50.00</td>
              <td className="py-3 px-4 border-b">Pending</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">#12347</td>
              <td className="py-3 px-4 border-b">Michael Lee</td>
              <td className="py-3 px-4 border-b">$75.00</td>
              <td className="py-3 px-4 border-b">Delivered</td>
            </tr>
            {/* More recent orders can be added here */}
          </tbody>
        </table>
      </div>
    
    </div>
  </div>
  
  
  )
}
