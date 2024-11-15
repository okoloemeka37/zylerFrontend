'use client'

import GetProduct, { DeleteProduct } from '@/app/actions/Product';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProductsList({params}) {
const router=useRouter()

  const token:string=localStorage.getItem('Token')!;



  const [data, setData] = useState([{
   'id':'',
      'name':"",
      'price':1,
      'stock':1,
      'category':"",
      'tag':"",
      'gender':"",
      'Description':"",
    
  }]);
  const [title, setTitle] = useState()

  useEffect(() => {

    async function unwrapParams() {
      const resolvedParams = await params;
      setTitle(resolvedParams.productTag);

    const res=await GetProduct(`GetProduct/${resolvedParams.productTag}`,token);

    setData(res?.result.data);
console.log()

    }

    unwrapParams();
    
  }, []) 
  

  //delete item

  const Delete=async(id:string)=>{
  const res= await DeleteProduct(`DeleteProduct/${id}`,token);

  if (res?.status===200) {
    router.push("../../../user/Product")
  }
  }


  return (
    <div className="container mx-auto p-5">

    <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Product Management ({title})</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
        <Link href="../Product/AddProduct">
        Add New Product
        </Link>
      </button>

     
    </header>


    {/* Product Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   {   data.length !== 0?

      data.map((rel,index)=>(    
      
         <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
        <img
          src={`https://picsum.photos/id/1005/400/200`}
          alt="T-Shirt"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-xl text-gray-700">Name: {rel.name}</h3>
          <p className="text-gray-500">Tag: {rel.tag}</p>
          <p className="text-gray-700">Price: {rel.price}</p>
          <p className="text-gray-600">Stock: {rel.stock}</p>
          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200">
              <Link href={`../../../user/Product/ProductEdit/${rel.id}`}>
              Edit
              </Link>
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200" onClick={()=>Delete(rel.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>)):(<h1>No Product Available For This Tag</h1> )}
   
  
    
  </div>
  
  </div>
  )
}
