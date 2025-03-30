'use client'

import { single } from "@/app/actions/Product";
import { WishCard } from "@/app/component/Cards";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


export default function CustomerDashboard() {
    const router=useRouter();
    const {userCred,token,BASE_URL,setterURL}=useAuth();
    
    useEffect(() => {
      if (token=='') {
        setterURL(window.location.href)
        router.push(BASE_URL+"auth/Login")
    }
    }, [token,router,userCred,BASE_URL,setterURL])
    
     
    const [user, setuser] = useState({'name':'','email':'','phone':'00000000000','address':''});
    const [orders, setOrders] = useState([{'order_id':0,'status':'','total':0,'created_at':''}]);

    const [wish, setwish] = useState([]);

 
   useEffect(() => {
    console.log(userCred['orders'])
    setuser(userCred);
    if (userCred['orders']==undefined) {
      
    }else{   setOrders(userCred['orders'])}
 

    //get wishlist

    const getWish=async ()=>{
const resp=await single(`getWish${userCred.id}`,token);
setwish(resp?.result.data);
console.log(resp?.result);
    }

    getWish();
   }, [userCred,token])
   
  
    return (
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {user.address}
            </p>
           <Link href={BASE_URL+"Settings/Edit"}> <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Edit Profile</button></Link>
            
            </div>
  
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            {orders.length > 0 ? (
            
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left">Order ID</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Total</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.order_id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{order.order_id}</td>
                        <td className="px-6 py-3">{order.created_at}</td>
                        <td className="px-6 py-3">{order.total}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-200 text-green-800"
                                : order.status === "In Progress"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             
            ) : (
              <p className="text-gray-600">You have no recent orders.</p>
            )}
             <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View All Orders
            </button>
            
          </div>
        </div>
  
        {/* Wishlist and Settings */}

          {/* Wishlist */}
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
            {wish.length===0?(        
          
          <p className="text-gray-600">Your favorite items will appear here.</p>):(
            <WishCard Product={wish}  />
          )} 
            
          
          {/* Account Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <ul className="text-gray-600 space-y-2">
              <li className="text-blue-700"><Link href={BASE_URL+"Settings/ChangePassword"}>Change Password</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  