'use client'
import Link from "next/link";
import { useState,useEffect } from "react";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { cat } from "@/app/actions/Product";

export default function AdminOrdersPage() {


    const router=useRouter()
    const {token,userCred}=useAuth();
    
    if (!token) {
        router.push("http://localhost:3000/auth/Login")
    }

  const [searchTerm, setSearchTerm] = useState("");

 const [orders, setorder] = useState([])


 useEffect(() => {
   async function ordersAll() {
    const ft=[];
    const resp=await cat('ordersAll',token);
 
setorder(resp?.result);
   }
   
   ordersAll()
 }, [token])
 


  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by customer or order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Export Orders
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
       
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Order Date</th>
             
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => (
               
                <tr className="border-b hover:bg-gray-100 transition" key={item.order_id}> 
                  <td className="px-6 py-3"><Link href={`OrdersView/${item.order_id}`}>{item.order_id}</Link></td>
                <td className="px-6 py-3">{item.user_name}</td>
                  

                   <td className="px-6 py-3">
                   <span
                     className={`inline-block px-3 py-1 text-sm font-semibold rounded-lg ${
                       item.status == "Pending"
                         ? "bg-yellow-200 text-yellow-800"
                         : item.status == "Delivered"
                         ? "bg-green-200 text-green-800"
                         : "bg-blue-200 text-blue-800"
                     }`}
                   >
                    {item.status} 
                   </span>
                   
                 </td>
                 <td className="px-6 py-3">{item.created_at}</td>
          
                 
                  
                </tr>
               
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-3 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          Previous
        </button>
        <div className="text-gray-600">Page 1 of 5</div>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          Next
        </button>
      </div>
    </div>
  );
}
