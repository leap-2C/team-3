"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, User, ArrowUpRight, ImageUp } from 'lucide-react'
import DonProfileSkel from './donProfileSkel'
import { CldImage } from 'next-cloudinary'
import { ToastContainer, toast } from 'react-toastify'
import EditProfile from './editProfile'
import ChangeCover from './changeCover'

type Profile = {
  name: string;
  socialMediaURL: string;
  about?: string;
  backgroundImage: string;
  avatarImage: string;
};

const DonationProfile = () => {
  const userId = 16
  const [profileData, setProfileData] = useState<Profile | null>(null)

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/profile/current-user/${userId}`)
      setProfileData(data)
    } catch (error) {
      toast.error("Failed to load profile")
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const copyToClipboard = () => {
    if (profileData?.socialMediaURL) {
      navigator.clipboard.writeText(profileData.socialMediaURL)
      toast("Text copied")
    }
  }

  return (
    <div>
      {profileData ? (
        <div className='w-full flex flex-col gap-[12px]'>
          {profileData.backgroundImage ? (
            <CldImage
              width="1"
              height="1"
              src={profileData.backgroundImage}
              sizes="100vw"
              alt="User avatar"
              className="w-full h-[250px] object-cover absolute top-0 left-0 z-[-1]"
            />
          ) : (
            <div className='bg-black/50 w-full h-[250px] absolute z-[-1] top-0 left-0' />
          )}

          <ChangeCover />

          <Badge className='px-[42px] py-[27px] flex flex-col gap-[30px] rounded-[16px] bg-[#0A0B0C] border-2 border-gray-800 w-full'>
            <div className='flex items-center w-full justify-between gap-[200px]'>
              <div className='flex items-center gap-[30px]'>
                <div className='rounded-full border-3 w-[116px] h-[116px] flex justify-center items-center'>
                  {profileData.avatarImage ? (
                    <div className='flex relative group w-fit'>
                      <CldImage
                        width="1"
                        height="1"
                        src={profileData.avatarImage}
                        sizes="100vw"
                        alt="User avatar"
                        className="rounded-full w-[116px] h-[116px] object-cover"
                      />
                      <ImageUp className='hidden group-hover:flex absolute top-[70%] right-[40%] cursor-pointer' />
                    </div>
                  ) : (
                    <User />
                  )}
                </div>
                <div>
                  <p className='font-bold text-[20px]'>{profileData.name}</p>
                  <p className='text-[12px] text-white/50'>{profileData.socialMediaURL}</p>
                </div>
              </div>
              <div className='flex gap-[17px] w-fit'>
                <Button className='bg-[#0363FB] rounded-full p-[10px]' variant="secondary" onClick={copyToClipboard}>
                  <Copy className='text-white' />
                </Button>
                <EditProfile onProfileUpdated={fetchProfile} />
              </div>
            </div>

            <div className='w-full flex flex-col'>
              <h1 className='font-medium text-[12px] text-white/50'>About</h1>
              <p className='text-white text-[14px]'>{profileData.about || 'No bio added yet.'}</p>
            </div>
          </Badge>

          <Badge className='rounded-[16px] font-[400] flex justify-between w-full bg-[#0A0B0C] border-2 border-gray-800 px-[42px]'>
            <div className='py-[27px]'>
              <h1 className='text-[12px] text-white/50 w-full'>Social Media URL</h1>
              <h1 className='text-[14px] w-full'>{profileData.socialMediaURL}</h1>
            </div>
            <div className='w-[30px] h-[30px] hover:bg-blue-600 rounded-full transition-colors duration-300 flex justify-center items-center'>
              <a href={profileData.socialMediaURL} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight />
              </a>
            </div>
          </Badge>
        </div>
      ) : (
        <DonProfileSkel />
      )}
      <ToastContainer />
    </div>
  )
}

export default DonationProfile
