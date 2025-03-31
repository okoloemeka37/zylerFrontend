
import React, {useState} from 'react'
import { AddProductFunc } from '../actions/Product';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import ButtonLoaders from '@/app/component/Loaders';

interface ActBtnProps {
  data: {
    id: number;
    // Add other properties of data as needed
  };
  chosenStock:string; // Replace with the actual type of chosenStock
  cart: string;
}

export default function ActBtn({data, chosenStock, cart}: ActBtnProps) {
    const {token,userCred,User,BASE_URL}=useAuth();
const [isLoaded, setisLoaded] = useState(false)
const [isWILoaded, setisWILoaded] = useState(false)
const [Incart, setIncart] = useState(cart)
const router=useRouter()

     const AddToCart = async () => {
        setisLoaded(true)
        if (token) {
          const prepData = {
            'user_id': userCred!.id,
            'stock': chosenStock,
            'product_id': data.id
          }
          const resp = await AddProductFunc('AddCart', token, prepData);
          if (resp?.result.message) {
            setisLoaded(false)
            setIncart('In Cart');
            User(resp?.result.user)
            router.push(BASE_URL + "Products/Cart");
          }
        }
      }

      async function wishList() {
        setisWILoaded(true)
                console.log(userCred)
                const sending = {
                  'user_id': Number(userCred!.id),
                  'product_id': data.id
                }
                await AddProductFunc('addWish', token, sending)
                setisWILoaded(false)
              }
      
  return (
    <div className="lg:flex  lg:space-x-4 sm:space-y-6 lg:space-y-0 justify-between">
    <div className='w-full'>{!isWILoaded?(<button onClick={wishList} className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all">
    <FaHeart size={20} />
      {token ?("Add to Wishlist"):(<Link href="/auth/Login">Add to Wishlist</Link>)}
  </button>):(<ButtonLoaders ty={'change'} />)} </div>
          <div className='w-full'> {!isLoaded?(  <button className="flex-1 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200" onClick={AddToCart}>
      {token ? Incart : (<Link href="/auth/Login">Add To Cart</Link>)}
    </button>):(<ButtonLoaders ty={'change'} />)}</div>

   
  </div>
  )
}
