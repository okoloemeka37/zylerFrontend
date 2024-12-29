'use client'
import { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { cat, EditProductFunc } from "@/app/actions/Product";
import ButtonLoaders from '@/app/component/Loaders'

interface Params {
  orderid: string;
}

interface PageProps {
  params: Promise<Params>;
}
export default function OrderDetailsPage({params}: PageProps) {
  const router = useRouter();
  const [user, setuser] = useState({ 'name': '', 'email': '' });
  const [order, setorder] = useState({ 'order_id': 0, 'address': '', 'created_at': '', 'status': '', 'state': '', 'total': 0 });
  const [shop, setshop] = useState([{ 'name': "", 'price': 0 }]);
  const [stock, setstock] = useState([]);
  const [upStat, setupStat] = useState({ 'status': 'Pending' });

  const [isLoaded, setisLoaded] = useState(true);

  const { token,userCred } = useAuth();

  if (!token) {
    router.push("http://localhost:3000/auth/Login");
  }

  useEffect(() => {
    async function unwrap() {
      const resolvedParams = await params;
      const order_id = resolvedParams.orderid;

      const resp = await cat(`orderGet${order_id}`, token);
      setorder(resp?.result.order[0]);
      setuser(resp?.result.user[0]);
      setshop(resp?.result.shop);
      setstock(resp?.result.pt);
    }

    unwrap();
  }, [params, token,userCred]);

  const update = async () => {
    setisLoaded(false);
    const resp = await EditProductFunc(`editOrderStat${order.order_id}`, token, upStat);
console.log(resp?.result.message)
    if (resp?.result.message === "Status Upated") {
      setisLoaded(true);
      setorder(prev => ({
        ...prev, status: upStat.status
      }));
    }else{
      console.log("hj")
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {order.created_at}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status == "cancelled"
                        ? "bg-red-700 text-white"
                        : "bg-red-200 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Customer Name:</strong> {user.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {order.address + " , " + order.state}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border text-left">Item Name</th>
                <th className="px-6 py-3 border text-left">Quantity</th>
                <th className="px-6 py-3 border text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {shop.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 border">{item.name}</td>
                  <td className="px-6 py-3 border">{stock[index]}</td>
                  <td className="px-6 py-3 border">#{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-right mt-4 font-semibold text-lg">Total : #{order.total} </p>
      </div>

      {/* Update Order Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Update Status</h2>
        <div className="flex items-center gap-4">
          <label htmlFor="status" className="text-gray-600">
            Status:
          </label>
          <select id="status" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => {
            setupStat({ status: e.target.value });
          }}>
            <option value="" defaultChecked>Choose Status</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
          {isLoaded? (
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={update}>
              Update Status
            </button>
          ) : (
            <ButtonLoaders ty={' '} />
          )}
        </div>
      </div>
    </div>
  );
}
