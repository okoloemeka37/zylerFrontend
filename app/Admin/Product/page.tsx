'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { cat } from '@/app/actions/Product'
import { AdmiTag } from '@/app/component/Cards'

export default function Products() {
  const [Top, setTop] = useState([{'tag':"", 'stockCount':0}]);
  const [Bottom, setBottom] = useState([{'tag':"", 'stockCount':0}]);
  const [Dress, setDress] = useState([{'tag':"", 'stockCount':0}]);
  const [BodyWears, setBodyWears] = useState([{'tag':"", 'stockCount':0}]);
  const [Footwear, setFootwear] = useState([{'tag':"", 'stockCount':0}]);
  const [Accessories, setAccessories] = useState([{'tag':"", 'stockCount':0}]);

  useEffect(() => {
    const Just=['Top','Bottom','Dress','BodyWears','Footwear','Accessories']

   const gen= async () => {
    
    for (let i = 0; i < Just.length; i++) {
      const element = Just[i];
      
      const res= await cat(`setCat/${element}`,localStorage.getItem('Token')!);

      const formattedProducts = res?.result.data.map((product: { tag: string; stockCount: string }) => ({
        ...product,
        stockCount: Number(product.stockCount)
      }));

    switch (element) {
      case 'Bottom':
        setBottom(formattedProducts)
        break;

    case 'Dress':
      setDress(formattedProducts)
      break;

      case 'BodyWears':
        setBodyWears(formattedProducts)
        break;

        case 'Footwear':
          setFootwear(formattedProducts)
          break;

          case 'Accessories':
            setAccessories(formattedProducts)
            break


      case 'Top':
        setTop(formattedProducts);
        break;
    }

    console.log(formattedProducts)
    }

    
  }
  gen()
  }, [])
  

  return (
<div className="container mx-auto p-5">
 
<header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Product By Category</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
        <Link href="/Admin/Product/AddProduct">
        Add New Product
        </Link>
      </button>

     
    </header>
  
  <div className="space-y-8">
    {/* Category: Top */}

    <div className="bg-white p-6 rounded-lg shadow-md"> <h3 className="text-xl font-bold text-gray-700 mb-4">Top</h3><AdmiTag Product={Top}/></div>

  {/* Category: Bottoms */}
    <div className="bg-white p-6 rounded-lg shadow-md"> <h3 className="text-xl font-bold text-gray-700 mb-4">Bottoms</h3><AdmiTag Product={Bottom}/></div>


     {/* Category: Dresses */}
    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold text-gray-700 mb-4">Dresses</h3> <AdmiTag Product={Dress}/> </div>




  {/* Category: BodyWear */}
    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold text-gray-700 mb-4">BodyWears</h3> <AdmiTag Product={BodyWears}/>   </div>




  {/* Category: FootWear */}
  <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold text-gray-700 mb-4">FootWears</h3><AdmiTag Product={Footwear}/></div>


  {/* Category: Accessories */}

  <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold text-gray-700 mb-4">Accessories</h3><AdmiTag Product={Accessories}/> </div>

  </div>
</div>

  )
}
