'use client'
import React, { useEffect, useState } from 'react'
import {catRelated, singleIndex } from '../../actions/Product';
import "../../../styles/body.css"

import { ProCard } from '@/app/component/Cards';
import { SingleProduct } from '@/app/component/ContentLoader';
//import { useAuth } from '@/app/context/AuthContext';


import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import ImageHelper from '@/app/component/ImageHelper';

import SellerProfile from '@/app/component/SellerComp';
import ActBtn from '@/app/component/ActBtn';
import { GetUserController } from '@/app/actions/Auth';
import { FaStar } from 'react-icons/fa';
import { DynamicHlights, highlights } from '@/app/component/Funcs';


interface Params {
  ProductView: string;
}

interface PageProps {
  params: Promise<Params>;
}

function resol(dat:{ 'id': number, 'name': string, 'price': number, 'stock': number, 'image': string, 'category': string, 'tag': string, 'gender': string, 'Description': string,'dynamicField':string}) {
  const dah=dat['dynamicField'];
  if (dah) {
    const obj=JSON.parse(dah);
  return (
    <>
      {Object.entries(obj).map(([key, val]) => (
        <div key={key}>
          <p ><span className="text-gray-800  mb-4 font-semibold">{key}</span>: {typeof val === 'string' && val.indexOf(',') !== -1 ? <DynamicHlights text={val} /> : val as React.ReactNode}</p>
        </div>
      ))}
    </>
  );
  }
}

export default function SHOW({ params }: PageProps) {
  //const router = useRouter()
//  const { token } = useAuth()
  const [isLoad, setisLoad] = useState(false);
  const [Incart, setIncart] = useState('Add To Cart')
  const [data, setData] = useState({ 'id': 0,'user_id':0, 'name': "", 'price': 1, 'stock': 1, 'image': '', 'category': "", 'tag': "", 'gender': "", 'Description': "", 'dynamicField': "" });
  const [Related, setRelated] = useState([{ 'id': 0, 'name': "", 'price': 1, 'stock': 1, 'category': "", 'tag': "", 'gender': "", 'Description': "", 'image':''}]);
  const [chosenStock, setchosenStock] = useState('1');
  const [image, setImage] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [review, setreview] = useState([ { id: 0, name: "", user_id: 0, cus_id: 0, rating: 0, comment: "", image: "" },]);


   const [PageLoading, setPageLoading] = useState(true)  
    useEffect(() => {
    
   const timer= setTimeout(() => {setPageLoading(false)},2000)
   return () => {
   clearTimeout(timer)
      }
    }, [])

  useEffect(() => {
    async function unwrapParams() {
      setisLoad(true);
      const resolvedParams = await params;
      const res = await singleIndex(`ViewProduct/${resolvedParams.ProductView}`);
      setData(res?.result.data[0]);
     
      setisLoad(false);

      if (res?.result.data[0].cart.length == 1) {
        setIncart("In Cart")
      }

      const related = await catRelated(`getRelated/Top/${resolvedParams.ProductView}`);
      setRelated(related?.result.data);
      if (!isLoad) {
        const images = res?.result.data[0].image;
        setImage(images.split(','));
      }
      fetchSellerData(res?.result.data[0].user_id);
    }
       async function fetchSellerData(id:number) {
      try {
        const resp = await GetUserController(`getSellers`,id);
      
        setreview(resp.data.review);
        console.log(resp.data.review)
        } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    }
  
    unwrapParams();
  }, [])

 


  const [cCount, setcCount] = useState(1)

  const handleIncrement = () => {
    setCount((prevCount) =>prevCount + 1);
    setcCount((prevCount) =>prevCount + 1);
    if ((image.length - 1) == count) {
      setCount(0);
      setcCount(1);
    }
  };

  const handleDecrement = () => {
   /*  if (count === 0) {
      setCount(image.length - 1)
      setcCount(4);
    } */
  
    setCount((prevCount) =>prevCount - 1);
    setcCount((prevCount) =>prevCount - 1);
    if (count===0) {
      setCount(image.length-1)
      setcCount(image.length);
    }
   
  };

  if (PageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  
 }else{
  const others = resol(data);
  return (
    <div className="container mx-auto py-10 px-4 bg-white">
      {isLoad ? (<SingleProduct />) :
        (
          <div className="flex flex-col lg:flex-row gap-10">


            <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">

             
             
            <div className="flex justify-center">
  <div className="relative w-[900px] lg:h-[500px] sm:h-[500px] overflow-hidden"> 
    {/* Image */}
  
    <ImageHelper Product={data} height={'full'} width={'full'} count={count} />
    {/* Left Button */}
    <p
      onClick={handleDecrement}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white cursor-pointer"
    >
      <HiChevronLeft size={50} />
    </p>

    {/* Right Button */}
    <p
      onClick={handleIncrement}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white cursor-pointer"
    >
      <HiChevronRight size={50} />
    </p>

    {/* Counter */}
    <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 text-white rounded">
      {cCount}/{image.length}
    </p>
  </div>
</div>


              



              <div>


 <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
  <div className="flex flex-wrap md:flex-nowrap gap-8">
    {/* Left Section */}
    <div className="flex-1 space-y-4">
      <p ><span className=" font-semibold text-gray-800">Name </span>: {data.name}</p>
     
      <p>
        <span className="font-semibold text-gray-800">Price: {data.price}</span>
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">Category:</span> {data.category}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">Tag:</span> {data.tag}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">Gender:</span> {data.gender}
      </p>


               <div className="flex items-center space-x-4 mb-6">
                  <label htmlFor="quantity" className="font-semibold  text-gray-800"> Quantity:  </label>
                  <input type="number"   id="quantity" name="quantity" min={1} className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={chosenStock}onChange={(e) => { setchosenStock(e.target.value) }} />
                </div>


    </div>

    {/* Right Section */}
    <div className="flex-1 space-y-3 ">
      {data.dynamicField?(<h3 className="text-xl font-semibold text-gray-800 mb-4  pb-2">More Details</h3>):''}
      { others}
    </div>
  </div>
</div>

                <div>
                  <ActBtn data={data} chosenStock={chosenStock} cart={Incart} />
                </div>


              </div>
            </div>



            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Product Highlights
                </h3>
               <div>{highlights(data)}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Customer Reviews
                </h3>
                {review.map((val,index)=>{
                  return(
                  <div className="flex items-start mb-4 border-b pb-4" key={index}>
                  <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-${i < val.rating ? "yellow" : "gray"}-500`} />
                  ))}
             
                </div> 
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{val.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {val.comment}
                    </p>
                  </div>
                  
                </div>
                  )
                })}
              </div>

              <div><SellerProfile id={data.user_id}/></div>
            </div>
          </div>
        )}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
        <ProCard Product={Related} ac={''} />
      </div>
    </div>
  )
}
}
