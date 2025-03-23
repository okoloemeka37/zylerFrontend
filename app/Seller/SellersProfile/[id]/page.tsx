// app/page.js (or app/seller/[id]/page.js for dynamic routing)
'use client'
import { GetUserController } from "@/app/actions/Auth";
import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaPhoneAlt, FaComments, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import ImageHelper from "@/app/component/ImageHelper";


interface Params {
  id: number;
}
interface PageProps{
  params:Promise<Params>
}



export default function SellerProfilePage({params}:PageProps) {
  const [seller, setseller] = useState({id: 0, name: "", address: "", rating: 0, reviews: 0, image: "", description: "", totalProducts: 0, created_at: "", website: "", products: [], socialMedia: {facebook: "", twitter: "", instagram: ""}});
 const [product, setproduct] = useState([{id: 0,name: "",image: "",price: ""}]);
  useEffect(() => {
   async function unwrapParams() {
      
      const resolvedParams = await params;
      
   const resp= await GetUserController(`getSellers`,resolvedParams.id);

   if (resp.status === 200) {
    console.log(resp.data)
        setseller(resp.data.user)
        setproduct(resp.data.user.products)
      }
    
      }
  unwrapParams()
  }, [params])


  function formatDate(date: string) {
    return new Date(date).getFullYear();
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto"
      >
        <img src={`https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/`+seller.image} width={120} height={120} className="w-28 h-28 rounded-full object-cover border-4 border-blue-500" alt={seller.name} />
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            {seller.name} <FaCheckCircle className="text-blue-500" title="Verified Seller" />
          </h2>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <FaMapMarkerAlt /> {seller.address}
          </p>
          <div >
          <Link className="flex items-center gap-1 mt-1" href={'./Review/'+seller.id}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-${i < seller.rating ? 'yellow' : 'gray'}-500`} />
            ))}
            <span className="text-gray-500 text-sm">({seller.reviews} Reviews)</span>
         </Link> 
         </div>
          <p className="text-gray-400 text-sm">Member since {formatDate(seller.created_at)}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">{seller.description}</p>
          <p className="text-gray-500 mt-1 font-semibold">Total Listings: {seller.products.length}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-3 font-semibold">Address: {seller.address}</p>

          {/* Social Links & Website */}
         {/*  <div className="flex gap-4 mt-4">
            <a href={seller.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 text-xl">
              <FaGlobe />
            </a>
            <a href={seller.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xl">
              <FaFacebook />
            </a>
            <a href={seller.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-xl">
              <FaTwitter />
            </a>
            <a href={seller.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 text-xl">
              <FaInstagram />
            </a>
          </div> */}
        </div>
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition-all">
            <FaPhoneAlt size={20} />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition-all">
            <FaComments size={20} />
          </button>
        </div>
      </motion.div>

      {/* Seller's Products */}
      <h3 className="text-3xl font-bold mt-12 text-center text-gray-900 dark:text-white">Seller&apos;s Products</h3>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.3 }} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto"
      >
        {product.map((product) => (
          <motion.div 
            key={product.id} 
            whileHover={{ scale: 1.05 }} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
           
           <ImageHelper Product={product} width={400} height={300} count={0} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h4>
            <p className="text-gray-600 dark:text-gray-300 font-semibold">{product.price}</p>
            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all">
              <Link href={'../../Products/'+product.id}>
              View Product</Link>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
