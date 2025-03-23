'use client';
import { EditReviewAndRating } from '@/app/actions/CommentController';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import ButtonLoaders from '../Loaders';

interface EditReviewModalProps {
    isOpen: boolean;
    
    review: {
    rating: number;
    comment: string;
    id:number;
  user_id:number;
  
  };
  setisOpen: (isOpen: boolean) => void;
  setReview: (review: [{id:0,name:'',user_id:0,cus_id:0,rating:0,comment:'',image:''}]) => void;
}

export default function EditReviewModal({ isOpen, review ,setisOpen,setReview}: EditReviewModalProps) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const {token}=useAuth()
  const [isLoading, setisLoading] = useState(false)

  const Save= async()=>{
    setisLoading(true)
    const data={
        rating,
        comment,
        'user_id':review.user_id
    }
    console.log(data)
        const resp =await EditReviewAndRating(`EditRating/${review.id}`,token,data)
        setReview(resp?.result.data);
        setisOpen(false)
        setisLoading(false)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={()=>{setisOpen(false)}}>
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Your Review</h2>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`cursor-pointer text-2xl transition-all ${
                i < rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
              }`}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-400 dark:focus:ring-blue-500"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all" onClick={()=>{setisOpen(false)}}>
            Cancel
          </button>
         {isLoading?(<ButtonLoaders ty={'Editing'}/>):(<button  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all" onClick={Save}> Save Changes</button>)} 
        </div>
      </div>
    </div>
  );
}
