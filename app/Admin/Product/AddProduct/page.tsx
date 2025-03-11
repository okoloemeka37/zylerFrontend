"use client"
import { AddProductFunc } from "@/app/actions/Product"
import {useRouter } from "next/navigation";

import { useEffect, useState,useRef } from "react"
import "../../../../styles/body.css"

import ButtonLoaders from "@/app/component/Loaders";
import fakeClick, { Addfield, Change, Render } from "@/app/component/Funcs";


interface Data{
  'name':string,
  'price':string,
  'stock':number,
  'category':string,
  'tag':string,
  'gender':string,
  'Description':string,

}

const cats: { [key: string]: string[] } = {
  'Top':["T-Shirt","Shirts","Blouses","Sweaters","Hoodies"],
  'Bottom':["Jeans","Pants","Shorts","Skirts","Leggings"],
  "Dress":["Casual","Evening","Maxi","Mini","Midi"],
  "BodyWears":["Jackets","Suits","Boxers","Panties","Bras","Cardigans"],
  "Footwear":["Sneakers","Sandals","Boots","Heels","Flats"],
  "Accessories":["Hats","Scarves","Belts","Bags","Jewelry"]
}
const removed: number[] = [];
export default function AddProduct() {


  const [selectedFiles, setFiles] = useState<string[]>([]);

  const remove = (index: number) => {
     const newFiles = selectedFiles.filter((_, i) => i !== index);
    setFiles(newFiles); 

    removed.push(index);
  
  };



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
'stock':'',
'image':''
})

const [data, setData] = useState<Data>(  {
  'name':"",
  'price':'1',
  'stock':1,
  'category':"",
  'tag':"",
  'gender':"",
  'Description':"",
  
});


//adding

const [image, setimage] = useState<File[]>([]);

const [isLoaded, setisLoaded] = useState(false)

const formData=new FormData()
const Add =async (e:React.FormEvent)=>{
  e.preventDefault();


//handle dynamic fields
const dyn= document.querySelectorAll(".dynamic-field");

const dynObj: { [key: string]: string } = {}

for (let i = 0; i < dyn.length; i++) {
  let check=0;
  const val = dyn[i].querySelector('.val') as HTMLInputElement;

if (val.value.length === 0) {
  console.log(val)
  const err = document.createElement('p');
  err.textContent = 'This Field Must Not Be Empty';
  err.className = 'text-red-600';

  val.parentElement?.parentElement?.appendChild(err); 
  check=1
}else{check=0}

const nam = dyn[i].querySelector('.na') as HTMLInputElement;
console.log(val)
if (nam.value.length === 0) {
  const err = document.createElement('p');
  err.textContent = 'This Field Must Not Be Empty';
  err.className = 'text-red-600';

  nam.parentElement?.appendChild(err); 
  
  check=1
  return false;
}else{check=0}
if(check===0) {

 dynObj[nam.value] = val.value;
}
}




formData.append('name',data['name']);
formData.append('price', data['price'].toString());
formData.append('stock',data['stock'].toString());
formData.append('category',data['category']);
formData.append('tag',data['tag']);
formData.append('gender',data['gender']);
formData.append('Description',data['Description']);
if(Object.keys(dynObj).length > 0) formData.append('dynamicField', JSON.stringify(dynObj));


if(image){
  if (removed.length === 0) {
  for (let index = 0; index < image.length; index++) {
      formData.append("images[]", image[index]);
      console.log('pl'+image)
    }
  }else{
    for (let index = 0; index < image.length; index++) {
      if (!removed.includes(index)) {
        formData.append("images[]", image[index]);
      }
    }
  }

}

//const formDataObject: Record<string, unknown> = Object.fromEntries(formData.entries());

setisLoaded(true)

const resp=await AddProductFunc(`AddProduct`,token,formData);
 
 
 if (resp?.status===200) {
  router.push("../../../Admin/Product")
  
      setisLoaded(false)
  
   }
   if (resp?.status===422) {
     setErrors(resp.error)
     setisLoaded(false)
   }  
}



const mainclick = useRef<HTMLInputElement>(null)
const morefields=useRef<HTMLDivElement>(null)


  return (
    <div className="container mx-auto p-5">
    <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Upload New Product</h2>
    </header>

    <form className="bg-white p-6 rounded-lg shadow-md space-y-6" onSubmit={Add} encType="multipart/form-data">
      {/* Product Information */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Product Information
        </h3>
        <div className="result flex flex-col md:flex-row">{Render({ source: selectedFiles, remove })}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"  ref={morefields}>
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
          <input type="file" className="invisible" name="" ref={mainclick} multiple  id="file" onChange={(e)=>{Change({ e, setFiles, setimage })}} />

          <span className="bg-green-500 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200" onClick={() => fakeClick(mainclick)} >Add Images</span>




          <div className="relative inline-block group">
      <div><span className="bg-blue-500 text-white p-2 rounded cursor-pointer" >Add More Input Fields</span></div>
      <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
        <span  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>Addfield(morefields,'text')}>Text</span>
        <span  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>Addfield(morefields,'number')}> Number</span>
      </div>
    </div>



           <p className="text-red-600">{Errors.image}</p>
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
                 ...prevData,price:e.target.value
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
           onChange={(e)=>{const val:string=e.target.value;settTS(cats[val] || [])
            setData(prevData=>({
              ...prevData,category:e.target.value })) }  }  >
                
             <option value="">Select Category</option>
              <option  value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Dress">Dress</option>
              <option value="BodyWears">BodyWears</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            
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
          Product Highlights
        </label>
        <textarea
          id="product-description"
          rows={4}
          placeholder="highlights separated by comma"
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
     
      <div className="flex justify-end"> {!isLoaded?( <button type="submit"   className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"> Upload Product </button>):(<ButtonLoaders ty={'Creating Product'} />)}</div>
    </form>
  </div>
  
  )
}
