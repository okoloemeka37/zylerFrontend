'use client'
 import React, { useEffect,useState } from 'react'

import { Indexcat } from '@/app/actions/Product'
import {ProCard} from './component/Cards';

export default function Home() {
  const Just=['Top','Bottom','Dress','BodyWears','Footwear','Accessories']
  const [Top, setTop] = useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Bottom, setBottom] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Dress, setDress] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [BodyWears, setBodyWears] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Footwear, setFootwear] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Accessories, setAccessories] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  
  useEffect(() => {
   
    const gen= async () => {
    
     
     for (let i = 0; i < Just.length; i++) {
       const element = Just[i];
       
       const res= await Indexcat(`getIndexPro/${element}`);
 
   
   
     switch (element) {
       case 'Bottom':
         setBottom(res?.result.data);
         
         break;
 
     case 'Dress':
       setDress(res?.result.data)
       break;
 
       case 'BodyWears':
         setBodyWears(res?.result.data)
         break;
 
         case 'Footwear':
           setFootwear(res?.result.data)
           break;
 
           case 'Accessories':
             setAccessories(res?.result.data)
             break
 
 
       case 'Top':
         setTop(res?.result.data);
         break;
     }
 
     console.log(res?.result.data)
     }
 
     
   }
   gen()
   }, [])
   
 
  return (
    <>


<div className="min-h-screen bg-gray-50 py-12 px-6">
       <div className="relative h-screen bg-gray-900 mb-40">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1702661159134-2e8d4dcf0231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Redefine Your Wardrobe
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl">
          Discover exclusive collections that inspire your style and define
          elegance.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <a
            href="/shop"
            className="px-8 py-4 text-lg font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Start Shopping
          </a>
          <a
            href="#categories"
            className="px-8 py-4 text-lg font-semibold border border-white bg-transparent rounded-lg hover:bg-white hover:text-gray-900 transition"
          >
            Explore Categories
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <a href="#categories" className="flex flex-col items-center">
            <span className="text-sm text-gray-300">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
 
 <div id="categories" className='mt-25'>
      
      <div className="tag mt-25 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">Top</h2></div><ProCard Product={Top} ac={'Products/'} /></div>
 

        <div className="tag mt-15 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">Bottom </h2></div><ProCard Product={Bottom} ac={'Products/'} /></div>


        <div className="tag mt-15 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">Dresses</h2></div><ProCard Product={Dress} ac={'Products/'} /></div>

  
        <div className="tag mt-15 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">BodyWears</h2></div><ProCard Product={BodyWears} ac={'Products/'}/>
  </div>


  <div className="tag mt-15 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">FootWears</h2></div><ProCard Product={Footwear} ac={'Products/'} /> </div>




  <div className="tag mt-15 ml-10"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold text-gray-700">Accessories</h2></div> <ProCard Product={Accessories} ac={'Products/'} /></div>

  </div>
    </div>

    </>
  )
}
 






