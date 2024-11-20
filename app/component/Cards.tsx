/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'
import { Products } from './ContentLoader'

export  function ProCard({Product, ac}) {
 
  return (
   <>
       <div className="grid mt-4 grid-cols-1 mr-12 sm:grid-cols-2 lg:grid-cols-5 gap-6">
    { Product.length ===1?(<Products/>):(
       Product.map((data:any,index:number)=>
        (<div className="max-w-xs w-60 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
        
          <div className="relative group">
            <img  src="https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
    alt="Product Image"className="w-full h-36 object-cover transition-transform duration-500 transform group-hover:scale-105"/>
         </div>
        
          <div className="p-5">
            
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{data.name}</h3>
        
            <p className="text-gray-600 text-sm mb-2">
          {data.Description.substring(0,50)+"..."}
            </p>
        
            <p className="text-gray-700 font-bold text-lg mb-4">{data.price}</p>
            <Link href={`${ac+data.id}`}>
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              View
            </button> 
            </Link>
          </div>
          
        </div>
       
      ))
    )}
</div>

   </>
  )
}



export function AdmiTag ({Product}){
  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
  {Product.length ===1?(<Products/>):(Product.map((data:string,index:number)=>(
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
    <Link href={`../../user/Product/${data.tag}`}>
    <img  src="https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
    alt="Product Image"className="w-full h-36 object-cover transition-transform duration-500 transform group-hover:scale-105"/>
    <div className="p-4">
      <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
    
      <p className="text-gray-600">Stock: {data.stockCount}</p>
    </div>
    </Link>
  </div>
    )  ))}
 
  </div>
  )
}