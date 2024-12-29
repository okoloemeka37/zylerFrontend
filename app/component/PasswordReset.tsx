'use client'
import React, { useState } from "react";
import {UpdateController} from "@/app/actions/Auth";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface PasswordResetProps {
  Email: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ Email }) => {
  const router=useRouter()
  const {BASE_URL}=useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [suc, setsuc] = useState('')


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length === 0 || password !== confirmPassword) {
      setError("Passwords Do not Match");
    } else {
      const data = { password };
      const resp= await UpdateController(`ChangePassword${Email}`, data);
      console.log(resp?.result);
      if (resp && resp.result) {
        setsuc(resp.result.data.message);
      }

      setTimeout(() => {
        router.push(BASE_URL + "auth/Login");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter your new password below.
      </p>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {suc && (
          <div className="mb-4 p-3 bg-blue-600 text-white rounded">
            {suc}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset Password
        </button>
      </form>
      <div className="mt-4 text-center">
        <a
          href="/login"
          className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Back to Login
        </a>
      </div>
    </div>
  </div>
    
  );
};

export default PasswordReset;
