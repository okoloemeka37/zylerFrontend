/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { EditProductFunc, single } from '@/app/actions/Product';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'




const cats: { [key: string]: string[] } = {
  'Top':["T-shirts","Shirts","Blouses","Sweaters","Hoodies"],
  'Bottom':["Jeans","Pants","Shorts","Skirts","Leggings"],
  "Dresses":["Casual","Evening","Maxi","Mini","Midi"],
  "BodyWears":["Jackets","Suits","Boxers","Panties","Bras","Cardigans"],
  "Footwear":["Sneakers","Sandals","Boots","Heels","Flats"],
  "Accessories":["Hats","Scarves","Belts","Bags","Jewelry"]
}

interface Params {
  ProductEdit: string;
}
interface PageProps {
  params: Promise<Params>;
}

export default function EditProduct({params}: PageProps) {
const router=useRouter()
  const [Errors, setErrors] = useState({
    "category":'',
   "Description":'',
   "gender":'',
    "name":'' ,
   'tag':'',
   'price':'',
   'stock':''
   })


  const [resData, setResData] = useState({
    'id':0,
    "category":'',
"Description":'',
"gender":'',
 "name":'' ,
'tag':'',
'price':'',
'stock':''
  })
    const [title, setTitle] = useState<string>();
 const [tTS, settTS] = useState<string[]>([])
   const [token, settoken] = useState('')

useEffect(() => {
  settoken(localStorage.getItem("Token")!);

   async function unwrapParams() {
    const resolvedParams = await params;
    setTitle(resolvedParams.ProductEdit);

    const res=  await single(`ViewProduct/${resolvedParams.ProductEdit}`,localStorage.getItem("Token")!);
    setResData(res?.result.data);

    


    }
unwrapParams()
}, [params,title])


 const Edit=async (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
//used the AddProduct Function for this one only differrence is the url attached;

const res= await EditProductFunc(`UpdateProduct/${resData.id}`,token,resData)
console.log(res)
if (res?.status===200) {
  router.push("../../../Admin/Product")
} if (res?.status===422) {
  setErrors(res.error)
}
}


  return (
    <div>
          <div className="container mx-auto p-5">
    <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Edit Product({resData.name})</h2>
    </header>
    <form className="bg-white p-6 rounded-lg shadow-md space-y-6"  onSubmit={Edit}>
      {/* Product Information */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Product Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="product-name" className="block text-gray-600 mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              placeholder="Enter product name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
         value={resData['name']}

         onChange={(e)=>{
          
          setResData(prevresData=>({
            ...prevresData, name:e.target.value
          }))
        }}
        />
        <p className="text-red-600">{Errors.name}</p>
          </div>
          <div>
            <label htmlFor="product-price" className="block text-gray-600 mb-2">
              Product Price
            </label>
            <input
              type="text"
              id="product-price"
              placeholder="Enter product price"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
             
              value={resData['price']}

              onChange={(e)=>{
               
               setResData(prevresData=>({
                 ...prevresData, price:e.target.value
               }))
             }}
            />
            <p className="text-red-600">{Errors.price}</p>
          </div>
          <div>
            <label htmlFor="product-stock" className="block text-gray-600 mb-2">
              Stock Quantity
            </label>
            <input
              type="text"
              id="product-stock"
              placeholder="Enter stock quantity"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={resData['stock']}

              onChange={(e)=>{
               
               setResData(prevresData=>({
                 ...prevresData, stock:e.target.value
               }))
             }}  
            />
                <p className="text-red-600">{Errors.stock}</p>
          </div>

          <div>
            <label
              htmlFor="product-category"
              className="block text-gray-600 mb-2"
            >
              Product Category
            </label>
            <select
              id="product-category"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={resData['category']}

              onChange={(e)=>{
             const val: string = e.target.value; settTS(cats[val] || [])
               setResData(prevresData=>({
                 ...prevresData, category:e.target.value
               }))
             }}

            >
              
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Dresses">Dresses</option>
              <option value="BodyWears">BodyWears</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              {/* Add more categories as needed */}
            </select>
             <p className="text-red-600">{Errors.category}</p>
          </div>


          <div>
            <label
              htmlFor="product-gender"
              className="block text-gray-600 mb-2"
            >
              Gender
            </label>
            <select
              id="product-gender"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={resData['gender']}

              onChange={(e)=>{
               
               setResData(prevresData=>({
                 ...prevresData, gender:e.target.value
               }))
             }}
            >
             
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
              <option value="Babies">Babies</option>
              
            </select>
            <p className="text-red-600">{Errors.gender}</p>
          </div>

          
          <div>
            <label
              htmlFor="product-tag"
              className="block text-gray-600 mb-2"
            >
              Tag
            </label>
            <select
              id="product-tag"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={resData['tag']}

              onChange={(e)=>{
               
               setResData(prevresData=>({
                 ...prevresData, tag:e.target.value
               }))
             }}
            >
              <option value="">Select a Tag</option>
              {tTS.map((val,index)=>(
            <option value={val} key={index}>{val}</option>
           ))}
            </select>
            <p className="text-red-600">{Errors.tag}</p>
          </div>

        </div>
      </div>
      {/* Product Description */}
      <div>
        <label htmlFor="product-description" className="block text-gray-600 mb-2">
          Product Description
        </label>
        <textarea
          id="product-description"
          rows={4}
          placeholder="Enter product description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"     
          
          value={resData['Description']}

          onChange={(e)=>{
           
           setResData(prevresData=>({
             ...prevresData, Description:e.target.value
           }))
         }}
          />
        <p className="text-red-600">{Errors.Description}</p>
      </div>
      {/* Image Upload */}
      <div>
        <label htmlFor="product-image" className="block text-gray-600 mb-2">
          Upload Product Image
        </label>
        <input
          type="file"
          id="product-image"
          accept="image/*"
          className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
       
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
         Save
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}
