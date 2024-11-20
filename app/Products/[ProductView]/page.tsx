'use client'
import React, { useEffect,useState} from 'react'
import { AddProductFunc, catRelated, singleIndex } from '../../actions/Product';

import Link from 'next/link';
import {ProCard} from '@/app/component/Cards';
import { SingleProduct } from '@/app/component/ContentLoader';
import { useAuth } from '@/app/context/AuthContext';

export default function SHOW({params}) {

  const {token,userCred}=useAuth()
   
   const [isLoad, setisLoad] = useState(false);
   const [Incart, setIncart] = useState('Add To Cart')

    const [data, setData] = useState({'id':'','name':"", 'price':1,'stock':1,'category':"",'tag':"", 'gender':"",'Description':"",});
    const [Related, setRelated] = useState([{'id':'','name':"", 'price':1,'stock':1,'category':"",'tag':"", 'gender':"",'Description':"",}]);
    const [chosenStock, setchosenStock] = useState('1');

    useEffect(() => {


        async function unwrapParams() {
          setisLoad(true);
          const resolvedParams = await params;

 
    
        const res=await singleIndex(`ViewProduct/${resolvedParams.ProductView}`);
    
        setData(res?.result.data[0]);
        setisLoad(false);
    
if (res?.result.data[0].cart.length ==1) {
  setIncart("In Cart")
}

    const related=await catRelated(`getRelated/Top/${resolvedParams.ProductView}`);

    
    setRelated(related?.result.data)
        }
    
        unwrapParams();
        
      }, []) 

//handle Add To cart

const AddToCart=async()=>{
if (token) {
  const prepData={
    'user_id':userCred.id,
    'stock':chosenStock,
    'product_id':data.id
  }
  const resp=await AddProductFunc('AddCart',token,prepData);

  if (resp?.result.message) {
    setIncart('In Cart')
  }
}
}

  return (
    <div className="container mx-auto py-10 px-4">


    {isLoad?(<SingleProduct/>):(
      <div className="flex flex-col lg:flex-row gap-10">
      {/* Left Section: Image and Product Information */}
      <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
        {/* Product Image */}
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Product Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        {/* Product Information */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Name: {data.name}</h2>
          <p className="text-gray-600 text-lg mb-4">Description: {data.Description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-gray-800">Price: {data.price}</span>
          
          </div>
          <p className="text-gray-600 mb-4"></p>
          <p className="text-gray-600 mb-4">
            Category: <span className="font-semibold">{data.category}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Purchased by: <span className="font-semibold">150 people</span>
          </p>
          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="text-gray-600">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              
              min={1}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={chosenStock}
              onChange={(e)=>{setchosenStock(e.target.value)}}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
           
            <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">
               {token?( 'Buy'):(
                <Link href="/auth/Login">Buy</Link>
               )}
             
            </button>
            <button className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"    onClick={AddToCart}>
            {token?Incart:(
                <Link href="/auth/Login">Add To Cart</Link>
               )}
            </button>
          </div>
        </div>
      </div>
      {/* Right Section: Additional Information and Horizontal Reviews */}
      <div className="lg:w-1/3 space-y-6">
        {/* Additional Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Product Highlights
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>High-quality material</li>
            <li>Available in multiple colors</li>
            <li>Comfortable fit</li>
            <li>30-day return policy</li>
          </ul>
        </div>
        {/* Horizontal Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h3>
          {/* Individual Horizontal Review */}
          <div className="flex items-start mb-4 border-b pb-4">
            <div className="text-yellow-400 mr-2">★★★★☆</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">John Doe</h4>
              <p className="text-gray-600 text-sm">
                This product is amazing! The quality exceeded my expectations.
              </p>
            </div>
          </div>
          {/* Additional Horizontal Review */}
          <div className="flex items-start mb-4 border-b pb-4">
            <div className="text-yellow-400 mr-2">★★★★★</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Jane Smith</h4>
              <p className="text-gray-600 text-sm">
                Perfect fit and super comfortable. Highly recommended!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}



    {/* Related Products Section */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
  
      
    <ProCard Product={Related} ac={''} />
    

    </div>
  </div>
  
  )
}
