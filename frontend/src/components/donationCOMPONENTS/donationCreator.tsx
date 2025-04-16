import React from 'react'
import DonationProfile from './donationProfile'
import RecentDonations from './recentDonations'
import CreateDonation from './createDonation'

const DonationCreator = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-[20px] py-[200px]">
      <div className="w-fit flex flex-col gap-[12px]">
        <DonationProfile />
        <RecentDonations />
      </div>
      <CreateDonation />
    </div>
  )
}

export default DonationCreator
