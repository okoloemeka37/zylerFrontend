'use client';

import { DeleteProduct } from '@/app/actions/Product';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import {  FaTimesCircle } from 'react-icons/fa';
import ButtonLoaders from '@/app/component/Loaders'
 // Adjusted the import path to match the relative file structure

interface DeleteProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product:{id:number};
  setProduct: (product: [{id:0,name:'',price:0,stock:0,image:''}]) => void;
}
export default function DeleteProductModal({isOpen, setIsOpen, product, setProduct}: DeleteProductModalProps) {
const {token}=useAuth()
 const [isLoading, setisLoading] = useState(false)
  const handleDelete = async () => {
    // Delete product
    setisLoading(true)
    const resp = await DeleteProduct("DeleteProduct/"+product.id,token);
    setIsOpen(false);
 if (resp!.status === 200) {
    
      setProduct(resp.result.product);
      setisLoading(false)
    }
  
 }

  return (
    <div className="relative">
    

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-96 text-center animate-fadeIn">
            <FaTimesCircle
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer text-xl"
            />

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Product?</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              {isLoading ? (<ButtonLoaders ty={'deleting'} />):(<button  onClick={handleDelete}   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"  >Delete    </button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
