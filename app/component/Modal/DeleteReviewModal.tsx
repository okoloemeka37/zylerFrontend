import { DeleteReviewController } from '@/app/actions/CommentController';
import { useAuth } from '@/app/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import ButtonLoaders from '@/app/component/Loaders'

import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  setisOpen:(open:boolean)=>void;
  review: {
    id:number;
  };
  setReview: (review: [{id:0,name:'',user_id:0,cus_id:0,rating:0,comment:'',image:''}]) => void;
}

export default function DeleteConfirmModal({ isOpen,setReview,review,setisOpen }: DeleteConfirmModalProps) {
    const{token}=useAuth();
    const [isLoading, setisLoading] = useState(false)
    const deleteReview=async ()=>{
setisLoading(true)
        const data={
            id:review.id
        }
       const resp=await DeleteReviewController(token,'DeleteReview',data);
 
       if (resp.data.status===200) {
        setReview(resp.data.data);
        setisOpen(false)
        setisLoading(false)
       }
    }
    const cancel=()=>{
        setisOpen(false)
    }
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center max-w-sm"
          >
            <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
            <h2 className="text-xl font-bold">Are you sure?</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              This action cannot be undone.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 bg-gray-400 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-600 transition-all" onClick={cancel}> Cancel</button>
             {isLoading?(<ButtonLoaders ty={'deleting'} />):(<button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" onClick={deleteReview} > Delete </button>)} 
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
