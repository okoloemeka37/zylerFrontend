'use client'

import React, { useEffect,useState } from 'react'
import TableData from '../../component/TableData'
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function ViewProduct() { 
   const router=useRouter()
   const token=localStorage.getItem("Token")!;
   useEffect(() => {
  

  if (token == null) {
    router.push("../../auth/Login");
  }


}, [])


 const [product, setProduct] = useState();

  //const token=localStorage.getItem("Token")!;








console.log(token)

  const getProducts=async ()=>{
    const response = await axios.get(`http://127.0.0.1:8000/api/GetProducts`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        console.log(response.data)
        return setProduct(response.data);
  }
  
useEffect(() => {
  
getProducts();
 
}, [])

        
    
  return (
    <div>
      {product !== undefined?(
        <TableData products={product} />
      ): ("No Item")
      
      }
           
    </div>
  )
}
