'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Indexcat } from '@/app/actions/Product'
import IndexProducts from './IndexProducts';
import { Products } from './ContentLoader';

export default function Main({Product}) {
 
    const cats:object={
        'Latest Products':[],
        'Top':["T-shirts","Shirts","Blouses","Sweaters","Hoodies"],
        'Bottom':["Jeans","Pants","Shorts","Skirts","Leggings"],
        "Dresses":["Casual","Evening","Maxi","Mini","Midi"],
        "BodyWears":["Jackets","Suits","Boxers","Panties","Bras","Cardigans"],
        "Footwear":["Sneakers","Sandals","Boots","Heels","Flats"],
        "Accessories":["Hats","Scarves","Belts","Bags","Jewelry"]
      }
      const [isLoaded, setisLoaded] = useState(false)
      const [title, setTitle] = useState('Latest Product')
      const [showitem, setshowitem] = useState([]);

      const changeTip=async (val,th)=>{
        setisLoaded(true);
        const res= await Indexcat(`getTagPro/${val}`);
        setshowitem(res?.result.data);
        setisLoaded(false)
        if (th=="Latest Products") {
            setTitle(th)
        }{
            setTitle(th+">"+val)
        }
       
      }
      useEffect(() => {
        setshowitem(Product)
        setisLoaded(false);
      }, [Product])
      
  return (
    <div className="flex">
    <div >
    {/* List Container */}
    <div>
    {
 <div className="   h-screen w-64 mr-10  p-4 bg-gray-100 flex flex-col items-center justify-start ">
 {Object.keys(cats).map((key) => (
   <div className="relative group w-full max-w-sm my-2" key={key} id={`item-${key}`}>
     <button className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
      { key=="Latest Products"?(
        <span onClick={()=>{setshowitem(Product);setTitle(key)}}>{key}</span>
      ):(
        <span>{key}</span>
      )}
       <svg
         className="w-4 h-4 transform group-hover:rotate-180 transition-transform"
         xmlns="http://www.w3.org/2000/svg"
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
     </button>
     {/* Dropdown */}
     <div className="absolute top-0 left-full z-10 hidden w-48 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-lg group-hover:block">
       {cats[key].map((option, index) => (
         <p key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>changeTip(option,key)}  >
           {option}
         </p>
       ))}
     </div>
   </div>
 ))}
</div>

}




    </div>
  </div>

<div className=''>
<h3 className='mt-4 text-lg md:text-2xl max-w-2xl'>{title}</h3>
  <div className="grid mt-4 grid-cols-1 mr-12 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
    {!isLoaded?
    showitem.length===0?(<p>No Item Available</p>):showitem.map((val:object,ind:number)=>(
        <IndexProducts Product={val} key={ind} />
      )):(<Products/>)}
    
  </div>
</div>
</div>
  )
}
