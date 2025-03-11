'use client'
import React from 'react'

import Link from 'next/link'
import ImageHelper from './ImageHelper';
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function IndexProducts({ Product }: { Product: Product }) {
  return (
  
    <div className="max-w-sm w-60 ml-3 p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" >
          
    <Link href={'Products/'+Product.id}>
   <ImageHelper Product={Product} width={'full'} height={36} count={0} />
{/* Product Image */}
<div className="relative">



  {/* Discount Badge */}
 {/*  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
    20% OFF
  </span> */}
 
</div>
{/* Product Details */}
<div className="mt-4">
  {/* Title */}
  <h3 className="text-lg font-semibold text-gray-800">{Product.name}</h3>
   
  {/* Rating */}

  {/* Price */}
  <div className="mt-3 flex justify-between items-center">
    <span className="text-lg font-bold text-gray-800">#{Product.price}</span>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none">
    view
    </button>
  </div>
</div>
</Link>
</div>

  )
}
