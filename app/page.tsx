'use client'
 import React, { useEffect, useState } from 'react'


import { Indexcat } from '@/app/actions/Product'

import Footer from './component/Footer';

import Main from './component/Main';




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
<section className="relative min-h-[85vh] flex items-center justify-center text-white bg-gradient-to-r from-red-500 via-pink-500 to-purple-600">
      <div className="text-center max-w-2xl px-6">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-fadeInUp">
          Upgrade Your <span className="text-yellow-300">Style</span> Today!
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl mt-4 text-gray-200 animate-fadeInUp delay-200">
          Discover the best fashion, shoes, and accessories, all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center gap-4 animate-fadeInUp delay-400">
          <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-lg transition">
            Shop Now
          </button>
          <button className="px-6 py-3 border border-white hover:bg-white hover:text-black text-white text-lg font-semibold rounded-lg transition">
            Explore Categories
          </button>
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
 






