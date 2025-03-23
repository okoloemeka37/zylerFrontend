"use client";

import { useEffect, useState } from "react";
import { FaStar} from "react-icons/fa";
import { AddReview } from "@/app/actions/CommentController";
import { useAuth } from "@/app/context/AuthContext";
import { GetUserController } from "@/app/actions/Auth";
import Link from "next/link"
import EditReviewModal from "@/app/component/Modal/EditReviewModal";
import DeleteConfirmModal from "@/app/component/Modal/DeleteReviewModal";
import ButtonLoaders from "@/app/component/Loaders";


interface Params {
  name: number;
}
interface PageProps{
  params:Promise<Params>
}
export default function SellerReviewPage({params}:PageProps) {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [user, setuser] = useState({id:0,name: "",address: "",rating: 0,reviews: 0,image: "",description: "",totalProducts: 0,created_at: "",website: "",socialMedia: {facebook: "",twitter: "",instagram: ""}});
  const [review, setreview] = useState([{id:0,name:'',user_id:0,cus_id:0,rating:0,comment:'',image:''}]);
  const {userCred,token,BASE_URL}=useAuth()
 const [cv, setcv] = useState(false);
 const [isOpen, setisOpen] = useState(false);
 const [isDeleteOpen, setisDeleteOpen] = useState(false);
const [avgRating,setavgRating]=useState(0);
 const [isLoading, setisLoading] = useState(false)

 const openModal=()=>{
  setisOpen(true);
 }
 const openDeleteModal=()=>{
  setisDeleteOpen(true);
 }

  useEffect(() => {
   async function unwrapParams() {
    const resolvedParams = await params;
     const resp= await GetUserController(`getSellers`,resolvedParams.name);
    
       if (resp.status === 200) {
        console.log(resp.data)
            setuser(resp.data.user)
            setreview(resp.data.review)
            const totalRating = resp.data.review.reduce((sum:number, review:{rating:number}) => sum + review.rating, 0);
  setavgRating(Number(resp.data.review.length > 0 ? (totalRating / resp.data.review.length).toFixed(1) : 0));
          }  
   }
  unwrapParams()
  }, [params])
  
 useEffect(() => {
 if (review.some((r)=>r.cus_id=== Number(userCred.id))) {
  setcv(true)
 }else{
  setcv(false)
 }
 }, [review,userCred])
  

  const handleRatingClick =async (rating: number) => {
    setNewRating(rating);
  };

  const submit=async ()=>{
    setisLoading(true)
    const data={
      rating:newRating,
      comment:newReview,
      cus_id:userCred.id,
      user_id:user.id,
    }
      const resp=await AddReview('addReview',token,data);
      if(resp.status==200){
        setreview(resp.result.review)
        setNewReview('')
        setNewRating(0)
        setisLoading(false);
      }
    
 
}
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">



      {/* Seller Rating Overview */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
        <p className="text-gray-500 dark:text-gray-300">Seller Ratings & Reviews</p>
    <div className="flex justify-center items-center mt-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-${i < avgRating ? "yellow" : "gray"}-500 text-2xl`} />
          ))}
         <span className="text-gray-500 text-sm">({review.length} Reviews)</span>
        </div>
      </div>

   


  {/* Add Review Form */}
   
  <div className="max-w-3xl mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           {token.length==0?(<p><Link href={BASE_URL+"/auth/Login"} className="text-green-800 font-extrabold">Login</Link> To Add Reviews And Rate</p>):(
     <>
     {!cv?(
      <>
      
       <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Leave a Review</h3>
       <div className="mt-4">
         <p className="text-gray-600 dark:text-gray-300">Rate the Seller</p>
         <div className="flex gap-1 mt-2">
           {[...Array(5)].map((_, i) => (
             <FaStar
               key={i}
               className={`text-${i < newRating ? "yellow" : "gray"}-500 cursor-pointer`}
               onClick={() => handleRatingClick(i + 1)}
             />
           ))}
         </div>
       </div>
       <textarea
         className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
         placeholder="Write your review..."
         rows={4}
         value={newReview}
         onChange={(e) => setNewReview(e.target.value)}
       ></textarea>
           {newReview.length === 0 ? (
             ''
           ) : isLoading ? (
             <ButtonLoaders ty={'Adding Review'} />
           ) : (
             <button
               onClick={submit}
               className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all"
             >
               Submit Review
             </button>
           )}
         </>
       ) : (
         ''
       )}
       </>
     )}
      </div>

   {/* User Reviews */}

      <div className="max-w-3xl mx-auto mt-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Customer Reviews</h3>
        {review.map((review) => {
                  return (
          
          <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
         
            <div className="flex items-center gap-3">
            <img
       src={review.image !== '' ? `https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/` + review.image : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
        alt="Seller"
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{review.name}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-${i < review.rating ? "yellow" : "gray"}-500`} />
                  ))}
             
                </div> 
                    
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
            {Number(userCred.id)===review.cus_id?(
              <>
              <i className="text-xs text-cyan-600 cursor-pointer" onClick={openModal}>Edit Review</i>
              <i className="text-xs ml-10  text-red-600 cursor-pointer" onClick={openDeleteModal}>Delete Review</i>
              </>
            ):('')}
            
            
            <EditReviewModal isOpen={isOpen} review={review} setisOpen={setisOpen} setReview={setreview}  />
            <DeleteConfirmModal isOpen={isDeleteOpen}setReview={setreview} review={review} setisOpen={setisDeleteOpen}  />
          </div>
        )})}
      </div>

    
   
    </div>
  );
}
