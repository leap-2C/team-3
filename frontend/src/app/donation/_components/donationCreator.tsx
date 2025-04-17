'use client'

import React from 'react'
import { useUser } from '@/lib/UserContext'
import DonationProfile from './donationProfile'
import RecentDonations from './recentDonations'
import CreateDonation from './createDonation'

const DonationCreator = () => {
  const { user } = useUser()

  if (!user) {
    return <div className="text-white text-center">Loading user info...</div>
  }

  const userId = parseInt(user.id)
  const profileId = userId 
  const receiverId = userId 

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-[20px] py-[200px]">
      <div className="w-fit flex flex-col gap-[12px]">
        <DonationProfile userId={userId} profileId={profileId} />
        <RecentDonations userId={userId} />
      </div>
      <CreateDonation userId={userId} receiverId={receiverId} />
    </div>
  )
}

export default DonationCreator
