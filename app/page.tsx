'use client'
import React, { useEffect,useState } from 'react'

import { Indexcat } from '@/app/actions/Product'
import {ProCard} from './component/Cards';

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
       
       const res= await Indexcat(`getIndexPro/${element}`);
 
   
   
     switch (element) {
       case 'Bottom':
         setBottom(res?.result.data);
         
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
      
      <div className="tag mt-15 ml-10"><h3 className="text-2xl font-sans  text-gray-700 mb-4">Top</h3><ProCard Product={Top} ac={'Products/'} /></div>
 

        <div className="tag mt-15 ml-10"><h3 className="text-2xl font-sans  text-gray-700 mb-4">Bottom</h3><ProCard Product={Bottom} ac={'Products/'} /></div>


        <div className="tag mt-15 ml-10"><h3 className="text-2xl font-sans  text-gray-700 mb-4">Dresses</h3><ProCard Product={Dress} ac={'Products/'} /></div>

  
        <div className="tag mt-15 ml-10">
      <h3 className="text-2xl font-sans  text-gray-700 mb-4">BodyWears</h3>

      <ProCard Product={BodyWears} ac={'Products/'}/>
  </div>


  <div className="tag mt-15 ml-10"><h3 className="text-2xl font-sans  text-gray-700 mb-4">FootWears</h3><ProCard Product={Footwear} ac={'Products/'} /> </div>




  <div className="tag mt-15 ml-10"> <h3 className="text-2xl font-sans  text-gray-700 mb-4">Accessories</h3> <ProCard Product={Accessories} ac={'Products/'} /></div>


    </div>

    </>
  )
}
