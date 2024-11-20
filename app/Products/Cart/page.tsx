'use client'
import React, { useEffect,useState } from 'react'

import { single } from '@/app/actions/Product';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { CartLoader } from '@/app/component/ContentLoader';
export default function Cart() {
 const {token,userCred}= useAuth()
 const [data, setData] = useState([{'id':'','name':"", 'price':1,'stock':1,'cart':[{'stock':1}],'category':"",'tag':"", 'gender':"",'Description':"",}]);
const [IsLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  
   if (token!=='') {
    async function rt() {
      setIsLoaded(true)
      
      const resp=await single(`GetCart${userCred.id}`,token);
     setData(resp?.result)
      setIsLoaded(false)
    }
  rt()
  
   }
}, [token])

const tol=data.reduce((acc,current)=>  acc +current.price,0);

console.log((tol))
  return (
    <div className="container mx-auto py-10 px-4">
  {/* Page Header */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-800">Your Cart</h1>
    <p className="text-gray-600 mt-2">
      Review your items before proceeding to checkout.
    </p>
  </div>
  {/* Cart Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    {/* Cart Items */}
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Items in Your Cart
      </h2>
      <div className="space-y-6">
   

   {!IsLoaded?data.map((item,index)=>
  (
  <div className="flex items-center justify-between border-b pb-4" key={index}>
  <div className="flex items-center">
    <img
      src="https://via.placeholder.com/100x100"
      alt="Product Image"
      className="w-20 h-20 object-cover rounded-lg mr-4"
    />
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        {item.name}
      </h3>
      <p className="text-gray-600">Category: {item.category}</p>
      <p className="text-gray-600">
        Quantity: <span className="font-semibold">{item.cart[0].stock}</span>
      </p>
    </div>
  </div>
  <div>
    <p className="text-lg font-semibold text-gray-800">${item.price}</p>
  </div>
</div>
   )):(<CartLoader/>)
  }


      </div>
    </div>
    {/* Order Summary */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-gray-800 font-semibold">${tol}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Delivery</p>
          <p className="text-gray-800 font-semibold">$10.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax</p>
          <p className="text-gray-800 font-semibold">$0.00</p>
        </div>
        <div className="flex justify-between border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">Total</p>
          <p className="text-lg font-semibold text-gray-800">${tol+10+0}</p>
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200">
     <Link href="CheckOut">Proceed to Checkout</Link>
      </button>
    </div>
  </div>
</div>

  )
}
