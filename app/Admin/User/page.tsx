'use client'
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { single } from '@/app/actions/Product';
import Link from 'next/link'
const UsersPage = () => {
    const {token,userCred}=useAuth()
    
    const [users, setusers] = useState([{'name':'','email':'','phone':'','created_at':'','id':0}])
  const [searchTerm, setSearchTerm] = useState("");

  
  
  useEffect(() => {
      
    const ret=async ()=>{
            const not=await single('getUser',token);
setusers(not?.result);
console.log(not?.result);
    }

    ret()
}, [token]);
const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">All Customers</h1>
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-gray-600">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Phone</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Joined</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition duration-300"
                  >
                    <td className="px-6 py-3"><Link href="./User/Activities">{user.name}</Link></td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.phone}</td>
                    <td className="px-6 py-3">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-blue-600 hover:underline">

                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colspan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
