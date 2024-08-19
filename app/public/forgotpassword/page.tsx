"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/api/auth/pocketbase'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const onSubmit = () => {
    try {
      resetPassword(email);
      alert("Password reset link sent to your email");
      router.push('/public/signin');
    } catch (error) {
      console.log(error)
    }
  }

  const onBack = () => {
    router.push('/public/signin');
  }

  return (
    <div className="flex flex-row h-screen justify-between">
      <div className='h-screen flex justify-center sm:flex-col gap-4 w-1/4 sm:px-20 sm:mx-20'>
        <h1 className='text-4xl'>Forgot Password</h1>
        <p>Enter your email address to reset your password</p>
        <Input type='email' placeholder='name@example.com'  onChange={(e) => setEmail(e.target.value)}/>
        <Button onClick={onSubmit}>Reset Password</Button>
        <Button variant="ghost" onClick={onBack}>Back</Button>
      </div>
      <div className="sm:flex flex-col w-1/2 hidden">
        <Image draggable={false} className="h-screen object-cover" src="/images/onboarding.jpg" width={2000} height={2000} alt="Anytime Fitness Hero Bg"/>
      </div>
    </div>
  )
}

export default ForgotPassword