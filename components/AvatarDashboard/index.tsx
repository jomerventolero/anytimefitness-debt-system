"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Props = {
  avatar?: string
}

const index = (props: Props) => {
  return (
    <>
      <Avatar>
        <AvatarImage
          src={props.avatar}
        />
        <AvatarFallback delayMs={600} className='bg-[#6E38D5] text-white'>AF</AvatarFallback>
      </Avatar>
    </>
  )
}

export default index