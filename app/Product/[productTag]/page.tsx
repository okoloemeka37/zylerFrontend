'use client'
import { useEffect, useState } from 'react';
import GetProduct, { DeleteProduct } from '@/app/actions/Product';
import { Products } from '@/app/component/ContentLoader';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import Image from 'next/image';

interface Params {
  productTag: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default function ProductsList({ params }: PageProps) {
  const router = useRouter();
  const { token, userCred, BASE_URL,setterURL } = useAuth()
  const [isload, setisload] = useState(false)
  const [data, setData] = useState([{
    'id': '',
    'name': "",
    'price': 1,
    'stock': 1,
    'category': "",
    'tag': "",
    'gender': "",
    'Description': "",
    'image': ''
  }]);
  const [title, setTitle] = useState<string | undefined>()


      useEffect(() => {
        if (token==='') {
          setterURL(window.location.href)
          router.push(BASE_URL+"/auth/Login")
      }
      }, [token,router,userCred,BASE_URL,setterURL])

  useEffect(() => {
    async function unwrapParams() {
      setisload(true)
      const resolvedParams = await params;
      setTitle(resolvedParams.productTag);
      const res = await GetProduct(`GetProduct/${resolvedParams.productTag}`, token);
      setData(res?.result.data);
      setisload(false);
    }
    unwrapParams();
  }, [params, token])

  const Delete = async (id: string) => {
    const res = await DeleteProduct(`DeleteProduct/${id}`, token) as { status: number };
    if (res?.status === 200) {
      router.push(BASE_URL+"/Admin/Product")
    }
  }

  return (
    <div className="container mx-auto p-5">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Product Management ({title})</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
          <Link href="../Product/AddProduct">
            Add New Product
          </Link>
        </button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isload ? data.length !== 0 ?
          data.map((rel, index) => {
            const images = rel.image;
            const image = images.split(',');
            return (
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300" key={index}>
                <Link href={BASE_URL + '/Products/' + rel.id}>
                  <Image
                    src={`https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/${image[0]}`}
                    alt="T-Shirt"
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl text-gray-700">Name: {rel.name}</h3>
                    <p className="text-gray-500">Tag: {rel.tag}</p>
                    <p className="text-gray-700">Price: {rel.price}</p>
                    <p className="text-gray-600">Stock: {rel.stock}</p>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200">
                        <Link href={`../Product/ProductEdi/${rel.id}`}>Edit</Link>
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200" onClick={() => Delete(rel.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }) : (<h1>No Product Available For This Tag</h1>) : (<Products />)
        }
      </div>
    </div>
  )
}
