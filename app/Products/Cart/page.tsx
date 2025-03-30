'use client'
import { useEffect,useState } from 'react'

import { DeleteProduct, single } from '@/app/actions/Product';
import { useAuth } from '@/app/context/AuthContext';
import { HiTrash } from "react-icons/hi";
import Link from 'next/link';
import { CartLoader } from '@/app/component/ContentLoader';
import { useRouter } from 'next/navigation';
import ImageHelper from '@/app/component/ImageHelper';

export default function Cart() {
 const router= useRouter()
 const {token,userCred,User,BASE_URL,setterURL}= useAuth()
const [data, setData] = useState([{ id: '', name: '', price: 1, stock: 1, cart: [{ stock: 1 }], category: '', tag: '', gender: '', Description: '', image: '' }]);
const [IsLoaded, setIsLoaded] = useState(false);
 const [PageLoading, setPageLoading] = useState(true)  
  useEffect(() => {
  
 const timer= setTimeout(() => {setPageLoading(false)},2000)
 return () => {
 clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (token==='') {
      setterURL(window.location.href)
      router.push(BASE_URL+"/auth/Login")
  }
  }, [token,router,userCred,BASE_URL,setterURL])
  



useEffect(() => {
  if (token!=='') {
    async function rt() {
      setIsLoaded(true)
      
      const resp=await single(`GetCart${userCred!.id}`,token);
     setData(resp?.result)
     console.log(resp?.result.length)
      setIsLoaded(false)
    }
  rt()
  
   }
}, [userCred,token])

//remove from cart

const delCart=async (id:number)=>{
  setIsLoaded(true)
const resp = await DeleteProduct(`delCart/${id}`, token) 
console.log(resp.result.cart);

 
  User(resp.result.user);
  setData(resp.result.cart);
setIsLoaded(false);

}

if (PageLoading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )

}else{


  return (
    <div className="container mx-auto py-10 px-4">
  {/* Page Header */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-800">Your Cart</h1>
    <p className="text-gray-600 mt-2">
      Review your items before proceeding to checkout.
    </p>
  </div>
  {/* Cart Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    {/* Cart Items */}
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Items in Your Cart
      </h2>
      <div className="space-y-6">
   

   {!IsLoaded?data.map((item,index)=>
  (
  <div className="flex items-center justify-between border-b pb-4" key={index}>
  <div className="flex items-center">
      <div className='w-40'> <ImageHelper Product={item} width={'full'} height={36} count={0} /></div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        {item.name}
      </h3>
      <p className="text-gray-600">Category: {item.category}</p>
      <p className="text-gray-600">
        Quantity: <span className="font-semibold">{item.cart != undefined? item.cart[0].stock:''}</span>
      </p>
    </div>
  </div>
  <div>
  <button className="flex items-center space-x-2 text-red-600 hover:text-red-800" onClick={()=>delCart(Number(item.id))}>
      <HiTrash size={20} />
      <span>Delete</span>
    </button>
    <p className="text-lg font-semibold text-gray-800">#{item.price}</p>
  </div>
</div>
   )):(<CartLoader/>)
  }
{data.length==0?(<div className="text-center text-gray-600"><p>No item in cart</p></div>):(<button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200">
     <Link href="CheckOut">Proceed to Checkout</Link>
      </button>)}
      <button className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200">
     <Link href="/">Continue Shopping </Link>
      </button>

      </div>
    </div>
 
  </div>
</div>

  )
}
}
