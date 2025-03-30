'use client'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import GetProduct from '@/app/actions/Product';


const demoData = {
  total: 15000,
  daily: 500,
  weekly: 3500,
  monthly: 12000,
  chartData: [
    { date: "2025-02-01", revenue: 500 },
    { date: "2025-02-02", revenue: 600 },
    { date: "2025-02-03", revenue: 700 },
    { date: "2025-02-04", revenue: 400 }
  ],
  paymentMethods: [
    { method: "Credit Card", amount: 8000 },
    { method: "PayPal", amount: 5000 },
    { method: "Bank Transfer", amount: 2000 }
  ]
};

//const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function RevenuePage() {
  const [revenueData, setRevenueData] = useState(demoData);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const  { token, userCred, BASE_URL,setterURL } = useAuth()
  const router = useRouter();

    useEffect(() => {
      if (token==='') {
        setterURL(window.location.href)
        router.push(BASE_URL+"/auth/Login")
    }
    }, [token,router,userCred,BASE_URL,setterURL])

  useEffect(() => {
    async function fetchRevenue() {
      if (dateRange.start && dateRange.end) {
        const response = await GetProduct(`retrieveRevenue/${dateRange.start}/${dateRange.end}`, token);
        const data = await response!.result;
        setRevenueData(data);
      }
    }
    fetchRevenue();
  }, [dateRange, token]);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Revenue Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border p-4 rounded shadow bg-white font-semibold text-center">Total: ${revenueData?.total || 0}</div>
        <div className="border p-4 rounded shadow bg-white font-semibold text-center">Daily: ${revenueData?.daily || 0}</div>
        <div className="border p-4 rounded shadow bg-white font-semibold text-center">Weekly: ${revenueData?.weekly || 0}</div>
        <div className="border p-4 rounded shadow bg-white font-semibold text-center">Monthly: ${revenueData?.monthly || 0}</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded shadow w-full">
        <input 
          type="date" 
          value={dateRange.start} 
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
          className="border p-2 rounded w-full sm:w-auto" 
        />
        <input 
          type="date" 
          value={dateRange.end} 
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
          className="border p-2 rounded w-full sm:w-auto" 
        />
        <button onClick={() => exportToCSV(revenueData)} className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">Export CSV</button>
        <button onClick={() => exportToPDF(revenueData)} className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto">Export PDF</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart for Revenue Trends */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-lg font-bold text-gray-800 text-center">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData.chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Pie Chart for Payment Methods */}
      {/*   <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-lg font-bold text-gray-800 text-center">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={revenueData.paymentMethods} dataKey="amount" nameKey="method" cx="50%" cy="50%" outerRadius={100} label>
                {revenueData.paymentMethods.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
 */}


      </div>
    </div>
  );
}
