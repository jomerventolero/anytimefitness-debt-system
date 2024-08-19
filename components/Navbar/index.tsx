import React from 'react'
import Image from "next/image"
import { useState, useEffect } from 'react'
import { AccountDropdownMenu } from '../AccountDropDownMenu'
import getDashboardData from '@/controllers/GetDashboardData'
import { useCancelToken } from '@/api/auth/pocketbase'
import { pb } from '@/api/auth/pocketbase'

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [club, setClub] = useState("")
  const { createCancelToken, cancelRequest } = useCancelToken();

  useEffect(() => {
    const source = createCancelToken();
    source.signal.addEventListener("abort", () => {});
    getDashboardData().then((data) => {
      
      setClub(data.club)
    })
    setUsername(pb.authStore.model?.username)

    return () => {
      cancelRequest()
      source.abort();
    }
  }, [username, club])    

  return (
    <>
      <div className="flex flex-row gap-4 justify-between pt-5">
        <div>
          <Image src="/images/logo/anytime-fitness-logo.png" width={200} height={200} alt="Anytime Fitness Logo" className="w-[96] aspect-auto"/>
          
        </div>
        <div className="flex flex-row gap-4 font-mono">
          <span>Club: {club}</span>
        </div>
        <div className="flex flex-row gap-4 rounded-lg border-[1px] border-gray-200 px-2 self-center">
          <div className="self-center font-semibold">@{username}</div>
          <AccountDropdownMenu />          
        </div>
      </div>
      <hr/>
    </>
  )
}

export default Navbar