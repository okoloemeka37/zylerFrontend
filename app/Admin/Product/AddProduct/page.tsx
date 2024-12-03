"use client"
import { AddProductFunc } from "@/app/actions/Product"
import {useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface Data{
  'name':string,
  'price':number,
  'stock':number,
  'category':string,
  'tag':string,
  'gender':string,
  'Description':string,
}

const cats:object={
  'Top':["T-Shirt","Shirts","Blouses","Sweaters","Hoodies"],
  'Bottom':["Jeans","Pants","Shorts","Skirts","Leggings"],
  "Dress":["Casual","Evening","Maxi","Mini","Midi"],
  "BodyWears":["Jackets","Suits","Boxers","Panties","Bras","Cardigans"],
  "Footwear":["Sneakers","Sandals","Boots","Heels","Flats"],
  "Accessories":["Hats","Scarves","Belts","Bags","Jewelry"]
}

export default function AddProduct() {
const router=useRouter();

     const [token, settoken] = useState('');
  useEffect(() => {

  settoken(localStorage.getItem("Token")!);
  }, [])
  

const [tTS, settTS] = useState(["T-shirts","Shirts","Blouses","Sweaters","Hoodies"])

const [Errors, setErrors] = useState({
 "category":'',
"description":'',
"gender":'',
 "name":'' ,
'tag':'',
'price':'',
'stock':''
})

const [data, setData] = useState<Data>(  {
  'name':"",
  'price':1,
  'stock':1,
  'category':"",
  'tag':"",
  'gender':"",
  'Description':"",
});

const Add =async (e:React.FormEvent)=>{
  e.preventDefault();
console.log(data.Description)
  const resp=await AddProductFunc(`AddProduct`,token,data);
  
  if (resp?.status===200) {
    router.push("../../../user/Product")
  }
  if (resp?.status===422) {
    setErrors(resp.error)
  }
}

  return (
    <div className="container mx-auto p-5">
    <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Upload New Product</h2>
    </header>
    <form className="bg-white p-6 rounded-lg shadow-md space-y-6" onSubmit={Add}>
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
           value={data.name}

        onChange={(e)=>{
          setData(prevData=>({
            ...prevData, name:e.target.value
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
              value={data.price}
              onChange={(e)=>{
               setData(prevData=>({
                 ...prevData,price:Number(e.target.value)
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
           value={data.stock}
           onChange={(e)=>{
            setData(prevData=>({
              ...prevData,stock:Number(e.target.value)
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
            <select  id="product-category"    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
           onChange={(e)=>{const val:string=e.target.value;settTS(cats[val])
            setData(prevData=>({
              ...prevData,category:e.target.value })) }  }  >
             <option value="">Select Category</option>
              <option  value="Top">Top</option>
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
           onChange={(e)=>{
            setData(prevData=>({
              ...prevData,gender:e.target.value
            }))
           }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
              <option value="Babies">Babies</option>
              {/* Add more categories as needed */}
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
              onChange={(e)=>{
                setData(prevData=>({
                  ...prevData,tag:e.target.value
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
          onChange={(e)=>{
            setData(prevData=>({
              ...prevData,Description:e.target.value
            }))
           }}
           value={data.Description}
   
        />
          <p className="text-red-600">{Errors.description}</p>
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
          Upload Product
        </button>
      </div>
    </form>
  </div>
  
  )
}
