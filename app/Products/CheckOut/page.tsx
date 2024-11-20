'use client'
import React, { useEffect,useState } from 'react'

import { single } from '@/app/actions/Product'
import { useAuth } from '@/app/context/AuthContext';

export default function Checkout() {

  const {token,userCred}= useAuth()
const [Subtotal, setSubtotal] = useState(0)

 useEffect(() => {
  
   if (token!=='') {
    async function rt() {
      
      const resp=await single(`checkoutBill${userCred.id}`,token);
      console.log(resp?.result)
     setSubtotal(resp?.result)
     
    }
  rt()
   }
}, [token])

const total=Subtotal+0+10;
  return (
    <div className="container mx-auto py-10 px-4">
    {/* Page Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-600 mt-2">
        Complete your purchase by providing your details and payment method.
      </p>
    </div>
    {/* Checkout Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Billing Information */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Billing Information
        </h2>
        <form action="#" method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required=""
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-600">
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required=""
            />
          </div>
        </form>
        {/* Payment Options */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Payment Method
          </h2>
          <div className="space-y-4">
            {/* Credit Card Option */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment-method"
                defaultValue="credit-card"
                className="form-radio h-5 w-5 text-blue-600"
                required=""
              />
              <span className="text-gray-700">Credit/Debit Card</span>
            </label>
            {/* PayPal Option */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment-method"
                defaultValue="paypal"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">PayPal</span>
            </label>
            {/* Other Payment Option */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment-method"
                defaultValue="other"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">Other Payment Options</span>
            </label>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Order Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800 font-semibold">${Subtotal}</p>
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
            <p className="text-lg font-bold text-gray-800">Total</p>
            <p className="text-lg font-bold text-gray-800">${total}</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200">
          Complete Purchase
        </button>
      </div>
    </div>
  </div>
  
  )
}
