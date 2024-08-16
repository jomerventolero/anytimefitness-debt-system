import React from 'react'
import Image from "next/image"
import { useState, useEffect } from 'react'
import { getAvatar } from "@/api/auth/pocketbase"
import { AccountDropdownMenu } from '../AccountDropDownMenu'
import { pb } from "@/api/auth/pocketbase"


const Navbar = () => {
  const [avatar, setAvatar] = useState<any>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setAvatar(getAvatar());
    setUsername(pb.authStore.model?.username);
    console.log("Avatar URL: ", avatar);
  }, [avatar])    

  return (
    <>
      <div className="flex flex-row gap-4 justify-between pt-5">
        <div>
          <Image src="/images/logo/anytime-fitness-logo.png" width={200} height={200} alt="Anytime Fitness Logo" className="w-[96] aspect-auto"/>
          
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