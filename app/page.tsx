'use client'
import React, { useEffect,useState } from 'react'

import Link from 'next/link'
import { cat } from '@/app/actions/Product'

export default function Home() {
  const Just=['Top','Bottom','Dress','BodyWears','Footwear','Accessories']
  const [Top, setTop] = useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Bottom, setBottom] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Dress, setDress] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [BodyWears, setBodyWears] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Footwear, setFootwear] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  const [Accessories, setAccessories] =useState([{'name':"", 'Description':'','price':"", 'id':0}]);
  useEffect(() => {
   
    const gen= async () => {
     
     for (let i = 0; i < Just.length; i++) {
       const element = Just[i];
       
       const res= await cat(`getPro/${element}`,localStorage.getItem('Token')!);
 
   
   
     switch (element) {
       case 'Bottom':
         setBottom(res?.result.data)
         break;
 
     case 'Dress':
       setDress(res?.result.data)
       break;
 
       case 'BodyWears':
         setBodyWears(res?.result.data)
         break;
 
         case 'Footwear':
           setFootwear(res?.result.data)
           break;
 
           case 'Accessories':
             setAccessories(res?.result.data)
             break
 
 
       case 'Top':
         setTop(res?.result.data);
         break;
     }
 
     console.log(res?.result.data)
     }
 
     
   }
   gen()
   }, [])
   
 
  return (
    <>


    <div className="drev mt-28">
      
      <div className="tag mt-15 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">Top</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
    {Top.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}
</div>



  </div>
 

  <div className="tag mt-20 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">Bottom</h3>
  
      {Bottom.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}


  </div>
  
  <div className="tag mt-20 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">Dresses</h3>

      {Dress.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}

  </div>

  
  <div className="tag mt-20 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">BodyWears</h3>

      {BodyWears.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}
  </div>


  <div className="tag mt-20 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">FootWears</h3>
      {Footwear.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}
  </div>




  <div className="tag mt-20 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">Accessories</h3>
      {Accessories.map((data,index:number)=>
      (<div className="max-w-xs w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={index}> 
      
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
          <Link href={`Products/${data.id}`}>
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            View
          </button> 
          </Link>
        </div>
        
      </div>
     
    ))}
  </div>


    </div>

    </>
  )
}
