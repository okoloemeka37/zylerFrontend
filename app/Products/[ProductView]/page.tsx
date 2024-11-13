'use client'
import React, { useEffect,useState} from 'react'
import { cat, single } from '../../actions/Product';
import { useRouter } from 'next/navigation';

export default function SHoW({params}) {
    const token:string=localStorage.getItem('Token')!;
    const router=useRouter()

    const [data, setData] = useState({'id':'','name':"", 'price':1,'stock':1,'category':"",'tag':"", 'gender':"",'Description':"",});
    
    
    const [id, setid] = useState()
    useEffect(() => {


        async function unwrapParams() {
          const resolvedParams = await params;

          setid(resolvedParams.ProductView);
    
        const res=await single(`ViewProduct/${resolvedParams.ProductView}`,token);
    
        setData(res?.result.data);
    console.log(res?.result.data)
    
    const related=await cat(`getRelated/Top/${resolvedParams.ProductView}`, token);
    console.log(related)
        }
    
        unwrapParams();
        
      }, []) 
  return (
    <div className="container mx-auto py-10 px-4">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h2>
          <p className="text-gray-600 text-lg mb-4">{data.Description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-gray-800">{data.price}</span>
          
          </div>
          <p className="text-gray-600 mb-4">
            
          </p>
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
              defaultValue={1}
              min={1}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">
              Add to Cart
            </button>
            <button className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200">
              Buy Now
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
    {/* Related Products Section */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Related Product Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Related Product Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h4 className="font-semibold text-lg text-gray-800 mb-1">
              Related Product 1
            </h4>
            <p className="text-gray-600 text-sm mb-2">$39.99</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              View Product
            </button>
          </div>
        </div>
        {/* Additional Related Products (Repeat or Dynamically Rendered) */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Related Product Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h4 className="font-semibold text-lg text-gray-800 mb-1">
              Related Product 2
            </h4>
            <p className="text-gray-600 text-sm mb-2">$29.99</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}
