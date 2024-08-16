"use client"
import Navbar from '@/components/Navbar'
import { ProfileDialog } from '@/components/ProfileDialog'
import React, { useEffect, useState } from 'react'
import { pb } from "@/api/auth/pocketbase"

const Profile = () => {
  const [profile, setProfile] = useState<any>({});

  const fetchProfile = async () => {
    const profileData = await pb.authStore.model;
    setProfile(profileData);
  }

  useEffect(() => {
    fetchProfile();
  }, [profile])

  return (
    <>
      <div className="h-screen flex flex-col gap-4 px-20 mx-20">
        <Navbar />
        <div className="flex flex-col gap-4 w-1/4">
          <h1 className="text-4xl">Profile</h1>
          <p className="text-lg font-semibold">Username: <span className='font-normal'>{profile.username}</span></p>
          <p className="text-lg font-semibold">Name: <span className='font-normal'>{profile.firstName + " " + profile.lastName}</span></p>
          <ProfileDialog />
        </div>
      </div>
    </>
  )
}

export default Profile

