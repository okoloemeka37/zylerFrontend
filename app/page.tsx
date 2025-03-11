'use client'
 import React, { useEffect, useState } from 'react'
 import Image from 'next/image'

import { Indexcat } from '@/app/actions/Product'

import Footer from './component/Footer';

import Main from './component/Main';
import { requestNotificationPermission } from './Mis/Ask';



export default function Home() {
 

  
  const [Product, setProduct] = useState([{'name':"", 'Description':'','price':0, 'id':'0','image':''}]);

  const [PageLoading, setPageLoading] = useState(true)  
  useEffect(() => {
  
 const timer= setTimeout(() => {setPageLoading(false)},2000)
 return () => {
 clearTimeout(timer)
    }
  }, [])
  
  useEffect(() => {
   
    const gen= async () => {
      const res= await Indexcat(`getIndex`);
      setProduct(res?.result.data);
  
    
     
   }
   gen()
   }, [])
   
 if (PageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
     </div>
    )
  
 }else{
  return (
    <>


<div className="min-h-screen bg-gray-50 py-12 px-6">
<button onClick={requestNotificationPermission}>Enable Notifications</button>

<section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-screen flex items-center">
    <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="container mx-auto text-center relative z-10 px-4">
    <h1 className="text-5xl font-extrabold leading-tight mb-6 sm:text-6xl lg:text-7xl">
      Discover Your Perfect Look
    </h1>
    <p className="text-xl mb-8 sm:text-2xl lg:text-3xl">
      Stay on top of the trends with the latest styles for every occasion.
    </p>
    <div className="space-x-4">
      <a className="inline-block bg-pink-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300">
        Shop Now
      </a>
      <a  className="inline-block bg-transparent border-2 border-white text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
        View Collections
      </a>
    </div>
  </div>
</section>



<Main Product={Product}/>

</div>




<Footer/>


</>


  )

}
}
 






