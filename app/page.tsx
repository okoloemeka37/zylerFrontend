'use client'
 import React, { useEffect,useState } from 'react'

import { Indexcat } from '@/app/actions/Product'

import Footer from './component/Footer';

import Main from './component/Main';



export default function Home() {
 

  
  const [Product, setProduct] = useState([{'name':"", 'Description':'','price':"", 'id':0,'image':''}]);
  useEffect(() => {
   
    const gen= async () => {
      const res= await Indexcat(`getIndex`);
      setProduct(res?.result.data);
  
    
     
   }
   gen()
   }, [])
   
 
  return (
    <>


<div className="min-h-screen bg-gray-50 py-12 px-6">
<section class="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-screen flex items-center">
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="container mx-auto text-center relative z-10 px-4">
    <h1 class="text-5xl font-extrabold leading-tight mb-6 sm:text-6xl lg:text-7xl">
      Discover Your Perfect Look
    </h1>
    <p class="text-xl mb-8 sm:text-2xl lg:text-3xl">
      Stay on top of the trends with the latest styles for every occasion.
    </p>
    <div class="space-x-4">
      <a class="inline-block bg-pink-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300">
        Shop Now
      </a>
      <a  class="inline-block bg-transparent border-2 border-white text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
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
 






