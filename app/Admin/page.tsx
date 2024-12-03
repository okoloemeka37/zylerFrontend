'use client'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router=useRouter()
    const {token}=useAuth()
    if (token.length===0) {
        router.push("http://localhost:3000/auth/Register")
    }
  return (
    <div>page</div>
  )
}
