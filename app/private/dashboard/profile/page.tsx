"use client"
import Navbar from '@/components/Navbar'
import { ProfileDialog } from '@/components/ProfileDialog'
import isLocalStorageAvailable from '@/lib/helpers'

const Profile = () => {

  const navbarData = () => {
    if(isLocalStorageAvailable()) {
      const data = JSON.parse(localStorage.getItem('data')!)
      return data
    }
  }
  const username = localStorage.getItem('username')
  const data = navbarData()

  return (
    <>
      <div className="h-screen flex flex-col gap-4 px-20 mx-20">
        <Navbar data={navbarData()} username={username}/>
        <div className="flex flex-col gap-4 w-1/4">
          <h1 className="text-4xl">Profile</h1>
          <p className="text-lg font-semibold">Username: <span className='font-normal'>{username}</span></p>
          <p className="text-lg font-semibold">Name: <span className='font-normal'>{data.firstName + " " + data.lastName}</span></p>
          <ProfileDialog />
        </div>
      </div>
    </>
  )
}

export default Profile

