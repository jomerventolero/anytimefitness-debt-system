import React from 'react'
import Image from "next/image"
import { AccountDropdownMenu } from '../AccountDropDownMenu'
import { CgGym } from "react-icons/cg";

const Navbar = (props: any) => {

  return (
    <>
      <div className="flex flex-row gap-4 justify-between pt-5">
        <div>
          <Image src="/images/logo/anytime-fitness-logo.png" width={200} height={200} alt="Anytime Fitness Logo" className="w-[96] aspect-auto"/>
          
        </div>
        <div className="flex flex-row gap-4 font-mono">
          
        </div>
        <div className="flex flex-row gap-4 rounded-lg border-[1px] border-gray-200 px-2 self-center">
          <div className="self-center font-semibold">@{props.username}</div>
          {props.data?.gym?.name == 'all' ? null : <span className="self-center flex flex-row gap-1"><CgGym className="text-[#6E38D5] self-center"/> {props.data?.gym?.name}</span>}
          <AccountDropdownMenu />          
        </div>
      </div>
    </>
  )
}

export default Navbar