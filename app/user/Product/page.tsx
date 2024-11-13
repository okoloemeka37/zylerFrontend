'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cat } from '@/app/actions/Product'

export default function Products() {
  const Just=['Top','Bottom','Dress','BodyWears','Footwear','Accessories']
  const [Top, setTop] = useState([{'tag':"", 'stockCount':''}]);
  const [Bottom, setBottom] = useState([{'tag':"", 'stockCount':''}]);
  const [Dress, setDress] = useState([{'tag':"", 'stockCount':''}]);
  const [BodyWears, setBodyWears] = useState([{'tag':"", 'stockCount':''}]);
  const [Footwear, setFootwear] = useState([{'tag':"", 'stockCount':''}]);
  const [Accessories, setAccessories] = useState([{'tag':"", 'stockCount':''}]);

  useEffect(() => {
   
   const gen= async () => {
    
    for (let i = 0; i < Just.length; i++) {
      const element = Just[i];
      
      const res= await cat(`setCat/${element}`,localStorage.getItem('Token')!);

  
  
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

        case 'FootWears':
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
<div className="container mx-auto p-5">
 
<header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Product By Category</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
        <Link href="/user/Product/AddProduct">
        Add New Product
        </Link>
      </button>

     
    </header>
  
  <div className="space-y-8">
    {/* Category: Top */}

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Top</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {Top.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="T-Shirt"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}
     



      </div>
    </div>

  {/* Category: Bottoms */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Bottoms</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {Bottom.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="T-Shirt"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}

       


        


        

        </div>


      
    </div>


     {/* Category: Dresses */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Dresses</h3>
      {Dress.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="Dress"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}
    </div>




  {/* Category: BodyWear */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">BodyWears</h3>
      {BodyWears.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="T-Shirt"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}
    </div>

  {/* Category: FootWear */}
  <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">FootWears</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      
      {Footwear.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="Foot"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}
            
      </div>
    </div>


  {/* Category: Accessories */}

  <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Accessories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
     
      {Accessories.map((data,index)=>(
             <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
          <Link href={`../../user/Product/${data.tag}`}>
          <Image width={100} height={100}
            src="https://via.placeholder.com/300x200"
            alt="Accessories"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
          
            <p className="text-gray-600">Stock: {data.stockCount}</p>
          </div>
          </Link>
        </div>
        ))}


      </div>
    </div>





  </div>
</div>

  )
}
