import { FaCheckCircle, FaStar, FaPhoneAlt } from "react-icons/fa";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetUserController } from "../actions/Auth";

interface SellerProfileProps {
  id: number;
}

interface SellerData {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  totalProducts: number;
  created_at: string;
  website: string;
  review: Review[];
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

interface Review {
  id: number;
  name: string;
  user_id: number;
  cus_id: number;
  rating: number;
  comment: string;
  image: string;
}

export default function SellerProfile({ id }: SellerProfileProps) {
  const [data, setdata] = useState<SellerData>({
    id: 0,
    name: "",
    address: "",
    rating: 0,
    reviews: 0,
    image: "",
    description: "",
    totalProducts: 0,
    created_at: "",
    website: "",
    review: [],
    socialMedia: { facebook: "", twitter: "", instagram: "" },
 
  });
  const [review, setreview] = useState<Review[]>([
    { id: 0, name: "", user_id: 0, cus_id: 0, rating: 0, comment: "", image: "" },
  ]);
  const [avgRating, setavgRating] = useState(0);
useEffect(() => {
    async function fetchData() {
      try {
        const resp = await GetUserController(`getSellers`, id);
        setdata(resp.data.user);
        setreview(resp.data.review);
        const totalRating = resp.data.review.reduce((sum:number, review:{rating:number}) => sum + review.rating, 0);
        setavgRating(Number(resp.data.review.length > 0 ? (totalRating / resp.data.review.length).toFixed(1) : 0));
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    }
    fetchData();
  }, [id])
  
    const date=new Date(data.created_at);
    
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4 w-full max-w-md mx-auto">

      {/* Seller Image */}
      <img
       src={data.image !== '' ? `https:\/\/raw.githubusercontent.com\/okoloemeka37\/ImageHolder\/main\/uploads\/` + data.image : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
        alt="Seller"
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />

      {/* Seller Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold  gap-1">
            <Link href={`../Seller/SellersProfile/`+data.id} className="flex items-center">
          {data.name}
          <FaCheckCircle className="text-blue-500" title="Verified Seller" />
          </Link>
        </h3>
        <p className="text-gray-500 text-sm">Member since {date.getFullYear()}</p>

        {/* Seller Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
           <FaStar key={i} className={`text-${i < avgRating ? "yellow" : "gray"}-500 text-2xl`} />
          ))}
          <span className="text-gray-500 text-sm">({review.length} Reviews)</span>
        </div>
      </div>

      {/* Contact Button */}
      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition-all">
        <FaPhoneAlt size={20} />
      </button>
    </div>
  );
}
