"use client";
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar';
import { pb } from '@/controllers/Base';
import getDashboardData from '@/controllers/GetDashboardData';
import isLocalStorageAvailable from '@/lib/helpers';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<any>();
  const [username, setUsername] = useState<string>('');
  const router = useRouter();

  if (!pb.authStore.isValid) {
    router.push("/public/signin")    
  }


  useEffect(() => {
    
    try {
      if (data == null) {
        const res = getDashboardData();
        res.then((value) => {
          setData(value)
        })
        setUsername(pb.authStore.model!.username)
        if (isLocalStorageAvailable()) {
          localStorage.setItem('username', pb.authStore.model!.username)
          localStorage.setItem('data', JSON.stringify(data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
    <main className="sm:px-40">
      <Navbar data={data} username={username}/>
      {children}
    </main>
    </>
  );
}
