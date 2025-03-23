/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'
import { Products } from './ContentLoader'
import Image from 'next/image';

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProCardProps {
  Product: ProductType[];
  ac: string;
}

export function ProCard({ Product, ac }: ProCardProps) {
  const image = (Product.length > 0 && Product[0].image) ? Product[0].image.split(',') : [];
  return (
    <>
      <div className="grid mt-4 grid-cols-1 mr-12 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Product.length === 1 ? (
          <Products />
        ) : (
          Product.map((data: ProductType) => (
            <div
              key={data.id}
              className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56">
                <img
                  src={`https://raw.githubusercontent.com/okoloemeka37/ImageHolder/main/uploads/${image[0]}`}
                  alt="Product Image"
                  width={500}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover shadow-lg hover:shadow-xl"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  #{data.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {data.name}
                </h3>
                <div className="mt-4 items-center">
                  <Link href={`${ac + data.id}`}>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

interface WishCardProps {
  Product: ProductType[];
}

export function WishCard({ Product }: WishCardProps) {
  return (
    <>
      <div className="grid mt-4 grid-cols-1 mr-12 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Product.length === 0 ? (
          <Products />
        ) : (
          Product.map((data: ProductType) => (
            <div
              key={data.id}
              className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Product Image"
                  width={500}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover shadow-lg hover:shadow-xl"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  #{data.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {data.name}
                </h3>
                <div className="mt-4 items-center">
                  <Link href={"/Products/" + data.id}>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

interface AdmiTagProps {
  Product: { tag: string; stockCount: number }[];
}

export function AdmiTag({ Product }: AdmiTagProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {Product.length === 1 ? (
        <Products />
      ) : (
        Product.map((data, index) => (
          <div
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            key={index}
          >
            <Link href={`../../Admin/Product/${data.tag}`}>
              <Image
                src="https://images.unsplash.com/photo-1485736231968-0c8ad5c9e174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Product Image"
                width={500}
                height={500}
                className="w-full h-36 object-cover transition-transform duration-500 transform group-hover:scale-105"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-700">{data.tag}</h4>
                <p className="text-gray-600">Stock: {data.stockCount}</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}