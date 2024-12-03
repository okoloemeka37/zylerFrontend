/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect,useRef,useState } from 'react'

import { AddProductFunc, single } from '@/app/actions/Product'
import  GetProduct  from '@/app/actions/Product'
import { useAuth } from '@/app/context/AuthContext';

import ButtonLoaders from '@/app/component/Loaders'
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router=useRouter()

  const {token,userCred,BASE_URL,User}= useAuth()
  const [data, setData] = useState([{'id':'','name':"", 'price':1,'stock':1,'cart':[{'stock':1}],'category':"",'tag':"", 'gender':"",'Description':"",}]);
const [state, setState] = useState([{'price':0,'days':0,'state':''}]);
const [price, setprice] = useState(0)
const [days, setdays] = useState(0)
const [total, setTotal] = useState(0)
const [isLoaded, setisLoaded] = useState(false)
const [OrderData, setOrderData] = useState({
  'state':'',
  'description':'',
  'address':'',
  'product_id':'',
  'day':'',
  'stock':'',
  'SubTotal':0,
  'delivery':0,
})

const selectRef=useRef(null);



 useEffect(() => {
  
   if (token!=='') {
    async function rt() {
      
      const resp=await single(`checkoutBill${userCred.id}`,token);


      setOrderData(prev=>({
        ...prev,product_id:resp?.result.product_ids
      }))


     setData(resp?.result.cart);


     const hol=[];
     resp?.result.cart.forEach(ele=>{
      ele.cart.forEach(ed=>{
        hol.push(ed.stock)
      })
     })

  setOrderData(prev=>({
      ...prev,stock:hol
    })) 

     
     const sData=await GetProduct('getState',token);
    
     setState(sData?.result);
     const tg=resp?.result.cart.reduce((acc:number,current:number)=>acc + (current.price)*current.cart[0].stock,0)

     setTotal(tg);
     setOrderData(prev=>({...prev,SubTotal:tg }))
     
    }
  rt()
   }
}, [token])

const selectId=(e)=>{
 const selectedOption=selectRef.current.selectedOptions[0];
 setprice(selectedOption.getAttribute('data-price'))
 setdays(selectedOption.getAttribute("data-day"));
 
setOrderData(prevData=>({
  ...prevData,state:e.target.value,day:selectedOption.getAttribute("data-day")
}))

setOrderData(prev=>({
  ...prev,delivery:selectedOption.getAttribute('data-price')
}))


}





const submitOrder=async()=>{
const submit=await AddProductFunc('AddOrder',token,OrderData);
console.log(submit)
if(submit?.status==200){
  setisLoaded(false)
  User(submit.result.user);
router.push(BASE_URL+"user/Profile");

}
}




  return (
    <div className="container mx-auto py-10 px-4">
    {/* Page Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-600 mt-2">
        Complete your purchase and confirm your delivery details.
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
  <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  disabled defaultValue={userCred['name']}/>
</div>
<div>
  <label htmlFor="email" className="block text-gray-600">
    Email Address
  </label>
  <input disabled
    type="email"
    id="email"
    name="email"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    defaultValue={userCred['email']}
  />
</div>


<div>
  <label
    htmlFor="delivery-state"
    className="block text-gray-600 mb-2"
  >
    Delivery State
  </label>
  <select  id="delivery-state" ref={selectRef}    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
onChange={selectId}
value={OrderData.state}

>
  <option value="">Chose delivery state</option>
  {state.map((item,index:number)=>(
<option key={index} data-price={item.price} data-day={item.days} value ={item.state}>{item.state}</option>
  ))}
  </select>
  
</div>



<div>
  <label htmlFor="address" className="block text-gray-600">
    Full Address
  </label>
  <input
    type="text"
    id="address"
    name="address"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
   value={OrderData.address}
   onChange={(e)=>{
    setOrderData(prev=>({
      ...prev,address:e.target.value
    }) )
   }}
  />
</div>
          {/* Delivery Information */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Delivery Information
            </h2>
            <p className="text-gray-600 mb-2">
              Estimated Delivery:{" "}
              <span className="font-semibold text-blue-600">
                In {days} business days
              </span>
            </p>
            
            <div className="mt-4">
              <label
                htmlFor="special-instructions"
                className="block text-gray-600"
              >
                Special Instruction
              </label>
              <textarea
                id="special-instructions"
                name="special-instructions"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Leave package at the front door."
               value={OrderData.description}
               onChange={(e)=>{
                setOrderData(prev=>({
                  ...prev,description:e.target.value
                }))
               }}
              />
            </div>
          </div>
        
        </form>
      </div>
      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Order Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800 font-semibold">#{total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Fee</p>
            <p className="text-gray-800 font-semibold">#{price}</p>
          </div>
         
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Timeframe</p>
            <p className="text-gray-800 font-semibold">{days} business days</p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="text-lg font-bold text-gray-800">Total</p>
            <p className="text-lg font-bold text-gray-800">#{total+Number(price)}</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200" onClick={submitOrder}>
          Complete Purchase
        </button>
      </div>
    </div>
  </div>
  
  )
}
