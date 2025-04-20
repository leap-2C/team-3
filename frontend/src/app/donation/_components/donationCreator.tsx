"use client"
import React from 'react'
import DonationProfile from './donationProfile'
import RecentDonations from './recentDonations'
import CreateDonation from './createDonation'
import { useParams } from 'next/navigation'

const DonationCreator = () => {
  const params = useParams();
  const userId = parseInt(params.id as string, 10);


  if (isNaN(userId)) {
    return <div>Invalid user ID</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-[20px] py-[200px]">
      <div className="w-fit flex flex-col gap-[12px]">
        <DonationProfile userId={userId} />
        <RecentDonations userId={userId} />
      </div>
      <CreateDonation />
    </div>
  )
}

export default DonationCreator
