import React from 'react'
import DonationProfile from './donationProfile'
import RecentDonations from './recentDonations'
import CreateDonation from './createDonation'

const DonationCreator = () => {
  const userId = 16//current user id
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-[20px] py-[200px]">
      <div className="w-fit flex flex-col gap-[12px]">
        <DonationProfile userId={userId} />
        <RecentDonations userId={userId} />
      </div>
      <CreateDonation userId={userId} />
    </div>
  )
}

export default DonationCreator
