"use client"
import GetProduct from '@/app/actions/Product'
import ProductPageLoader from '@/app/component/ContentLoader';
//import ContentLoader from 'react-content-loader';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'

type Params = {
  productId: string;
};

export default function Product({params} : { params: Promise<Params> | Params }) {
  const resolvedParams = use(params) as Awaited<typeof params>;
  const { productId } = resolvedParams;

  const [pro, setPro] = useState({
    'name':'',
    'Description':"",
    'price':0
  });
  const [ready, setReady] = useState('');


  const getP =async (token:string)=>{
   
      const resp=await GetProduct(`ViewProduct${productId}`,token);
      setPro(resp?.result.data);
      console.log(resp?.result.data)
      setReady("yes");

  }

  useEffect(() => {
    const token=localStorage.getItem("Token")!;
getP(token)

  
    
  }, [])
  


  return (

    <>
  {/* Product Page */}
  <div className="h-screen flex flex-col bg-gray-100">
  
    {/* Product Section */}
    
    {ready==''?(<ProductPageLoader/>  ):(<section className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Product Image */}
        <div className="lg:w-1/2">
        <Image width={100} height={100} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkXRdM0L-klxRoIWtIAHp05A5F9AI2HtJzQ&s' alt='Product Image' className="object-cover h-full w-full"/>
    
        </div>
        {/* Product Details */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold">{pro.name}</h2>
          <p className="text-gray-600">{pro.Description}</p>
          <p className="text-3xl font-bold mt-4">${pro.price}</p>
          {/* Call-to-Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">
              Buy Now
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
)}


    {/* Related Products Section */}
    <section className="bg-white py-4">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="flex flex-wrap -mx-4">
          {/* Related Product 1 */}
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
        
            <Image width={100} height={100} src='https://addict-clothes-store.com/cdn/shop/products/ad01_s_bk_f_1080x.jpg?v=1610707433'              alt="Related Product 1"
              className="object-cover h-48 w-full"/>
            <h3 className="text-lg font-bold mt-2">Related Product 1</h3>
            <p className="text-gray-600">$49.99</p>
          </div>
          {/* Related Product 2 */}
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <Image width={100} height={100} src='https://addict-clothes-store.com/cdn/shop/products/ad01_s_bk_f_1080x.jpg?v=1610707433'              alt="Related Product 1"
              className="object-cover h-48 w-full"/>
            <h3 className="text-lg font-bold mt-2">Related Product 2</h3>
            <p className="text-gray-600">$69.99</p>
          </div>
          {/* Related Product 3 */}
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <Image width={100} height={100} src='https://addict-clothes-store.com/cdn/shop/products/ad01_s_bk_f_1080x.jpg?v=1610707433'              alt="Related Product 1"
              className="object-cover h-48 w-full"/>
            <h3 className="text-lg font-bold mt-2">Related Product 3</h3>
            <p className="text-gray-600">$79.99</p>
          </div>
        </div>
      </div>
    </section>
    {/* Footer */}
    <footer className="bg-gray-200 py-4 mt-4">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <p className="text-gray-600">
          © 2023 Clothing Store. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</>

  
  )
}
