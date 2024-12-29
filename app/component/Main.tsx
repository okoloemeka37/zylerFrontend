'use client'
import React, { useEffect, useState } from 'react'

import { Indexcat } from '@/app/actions/Product'
import IndexProducts from './IndexProducts';
import { Products } from './ContentLoader';

interface ProductType {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface MainProps {
  Product: ProductType[];
}

export default function Main({ Product }: MainProps) {
  const cats: { [key: string]: string[] } = {
    'Latest Products': [],
    'Top': ["T-shirts", "Shirts", "Blouses", "Sweaters", "Hoodies"],
    'Bottom': ["Jeans", "Pants", "Shorts", "Skirts", "Leggings"],
    "Dresses": ["Casual", "Evening", "Maxi", "Mini", "Midi"],
    "BodyWears": ["Jackets", "Suits", "Boxers", "Panties", "Bras", "Cardigans"],
    "Footwear": ["Sneakers", "Sandals", "Boots", "Heels", "Flats"],
    "Accessories": ["Hats", "Scarves", "Belts", "Bags", "Jewelry"]
  }
  const [isLoaded, setisLoaded] = useState(false)
  const [title, setTitle] = useState('Latest Product')
  const [showitem, setshowitem] = useState<ProductType[]>([]);

  const changeTip = async (val: string, th: string) => {
    setisLoaded(true);
    const res = await Indexcat(`getTagPro/${val}`);
    setshowitem(res?.result.data);
    setisLoaded(false)
    if (th === "Latest Products") {
      setTitle(th)
    } else {
      setTitle(th + ">" + val)
    }
  }

  useEffect(() => {
    setshowitem(Product)
    setisLoaded(false);
  }, [Product])

  return (
    <div className="flex flex-col md:flex-row">
    {/* Sidebar */}
    <div>
      <div className="h-auto md:h-screen w-full md:w-64 mb-6 md:mr-10 p-4 bg-gray-100 flex flex-col items-center justify-start">
        {Object.keys(cats).map((key) => (
          <div className="relative group w-full max-w-sm my-2" key={key} id={`item-${key}`}>
            <button className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              {key === "Latest Products" ? (
                <span onClick={() => { setshowitem(Product); setTitle(key) }}>{key}</span>
              ) : (
                <span>{key}</span>
              )}
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown */}
            <div className="absolute top-0 left-full z-10 hidden w-48 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-lg group-hover:block">
              {cats[key].map((option, index) => (
                <p key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => changeTip(option, key)}>
                  {option}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  
    {/* Main Content */}
    <div className="flex-1">
      <h3 className="mt-4 text-lg md:text-2xl max-w-2xl">{title}</h3>
      <div className="grid mt-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isLoaded ? (
          showitem.length === 0 ? (
            <p>No Item Available</p>
          ) : (
            showitem.map((val: ProductType, ind: number) => (
              <IndexProducts Product={val} key={ind} />
            ))
          )
        ) : (
          <Products />
        )}
      </div>
    </div>
  </div>
  
  )
}
