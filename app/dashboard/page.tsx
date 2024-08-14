"use client"
import React from 'react'
import { pb } from "@/api/auth/pocketbase"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const DashBoard = () => {
  const router = useRouter(); 

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/public/signin")    
    }
  },)

  return (
    <div className='h-screen flex sm:flex-col gap-4 px-20 mx-20'>
      <Navbar />
      <div className="flex gap-4 justify-between">

      </div>
      
    </div>
  )
}

export default DashBoard