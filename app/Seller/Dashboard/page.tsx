'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {  FaPlus, FaEdit, FaTrash } from 'react-icons/fa';


import GetProduct from '@/app/actions/Product';
import ImageHelper from '@/app/component/ImageHelper';
import React from 'react';
import DeleteProductModal from '@/app/component/Modal/DeleteProduct';

export default function SellerDashboard() {
  interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
  }

 
const [products, setproduct] = useState<Product[]>([])
  const { userCred, token, BASE_URL,setterURL } = useAuth();
  const router=useRouter();

  const [isOpen, setisOpen] = useState(false)
  useEffect(() => {
   
   if (token==='' || userCred.status !=='Seller') {
    setterURL(window.location.href)
    router.push(BASE_URL+"auth/Login");
    
  
   } async function getProduct() {
    const resp= await GetProduct(`getSellerProduct/${Number(userCred.id)}`,token);

    if (resp!.status === 200) {
    setproduct(resp?.result.product)
       }
    }
    getProduct()
  }, [token,userCred,BASE_URL,setterURL,router])
  
  

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen p-8`}>
   
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">Seller  Dashboard</h1>
      
      </header>

      {/* Stats */}
    {/*   <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Sales', value: userCred.totalSales, icon: <FaShoppingCart /> },
          { title: 'Total Products', value: userCred.totalProducts, icon: <FaBox /> },
          { title: 'Earnings', value: userCred.earnings, icon: <FaMoneyBillWave /> },
          { title: 'Pending Orders', value: userCred.pendingOrders, icon: <FaStar /> },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg text-gray-500 dark:text-gray-300">{stat.title}</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
            <div className="text-gray-500 dark:text-gray-300 text-2xl">{stat.icon}</div>
          </div>
        ))}
      </section> */}

      {/* Product Management */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Products</h2>
         <Link href={BASE_URL+"/Product/AddProduct"}>
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
            
            <FaPlus /> Add Product
          </button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {products.length === 0? (<p>No Products</p>):(
            <table className="w-full text-left">
            <thead className="border-b text-gray-500 dark:text-gray-300">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((product) => (
              
                  <tr  key={product.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <DeleteProductModal isOpen={isOpen} setIsOpen={setisOpen} product={product} setProduct={setproduct}/>
                  <td className="p-3 flex items-center gap-2">
                  <Link className='flex' href={BASE_URL+"/Products/"+product.id} > 
                    <ImageHelper Product={product} width={20} height={10} count={0} />
                   {product.name}
                   </Link>
                  </td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3 flex gap-2">
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 transition-all">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-700 transition-all" onClick={()=>setisOpen(true)}> 
                      <FaTrash />
                    </button>
                  </td>
                  
                </tr>
            
              ))}
            </tbody>
          </table>
          )}
          
        </div>
      </section>

      {/* Profile Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-6">
        <div className="w-10 rounded-full">
                  <img src={userCred.image !== '' ? `https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/` + userCred.image : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} alt="User avatar" width={40} height={40} />
                </div>          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{userCred.name}</h3>
            <p className="text-gray-500 dark:text-gray-300">Fashion Store Owner</p>
            <button className="mt-2 px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-all">
             <Link href={"/Settings/Edit"} className="justify-between">Edit Profile</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
