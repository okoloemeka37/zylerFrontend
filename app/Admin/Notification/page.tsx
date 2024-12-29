'use client'

import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { HiOutlineBell, HiCheckCircle, HiOutlineEye } from "react-icons/hi";
import { single } from '@/app/actions/Product';
import Link from 'next/link'

export default function NotificationsPage (){
    const [notifications, setnotifications] = useState([{'notice':'','type_id':0,'id':0,'created_at':'','view':'','type':''}]);
    const {token,userCred}=useAuth()

    useEffect(() => {
      
        const ret=async ()=>{
                const not=await single('getNote',token);
setnotifications(not?.result)
        }
    
        ret()
     
    }, [token,userCred])
    
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          
          className="flex items-center gap-2 text-sm font-medium bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          <HiCheckCircle className="text-lg" />
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <HiOutlineBell className="mx-auto text-6xl" />
            <p className="mt-4 text-lg font-medium">No notifications yet!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between px-6 py-4 transition duration-300 ${
                notification.view
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
            >
              {/* Notification Info */}
              <div>
                <h3
                  className={`text-lg font-medium ${
                    notification.view ? "text-gray-800" : "text-blue-600"
                  }`}
                >
                  {notification.type}
                </h3>
                <p className="text-gray-600 text-sm">{notification.notice}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <button
               
                className="flex items-center gap-2 text-sm text-blue-600 font-medium px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Link href={"./"+notification.type}>
                   <HiOutlineEye className="text-lg" />
                View</Link>
             
              </button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

