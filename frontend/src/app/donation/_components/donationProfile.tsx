"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, User, ArrowUpRight } from "lucide-react";
import DonProfileSkel from "./donProfileSkel";
import { CldImage } from "next-cloudinary";
import { ToastContainer, toast } from "react-toastify";
import EditProfile from "./editProfile";
import ChangeCover from "./changeCover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ChangeAvatar from "./changeAvatar";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
type Profile = {
  id?: number;
  name: string;
  socialMediaURL: string;
  about?: string;
  backgroundImage: string;
  avatarImage: string;
};

const DonationProfile = ({ userId }: { userId: number }) => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  // const test = process.env.API_URL;
  console.log(userId);
  const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        // `${test}/api/profile/current-user/${userId}`
        `https://team-3-4qbb.onrender.com/api/profile/current-user/${userId}`
      );
      console.log("this", data);

      setProfileData(data);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const copyToClipboard = () => {
    if (profileData?.socialMediaURL) {
      navigator.clipboard.writeText(profileData.socialMediaURL);
      toast("Text copied");
    }
  };

  // const handleCoverUpload = async (url: string) => {
  //   try {
  //     await axios.patch(`http://localhost:8000/api/profile/${profileData?.id}`, {
  //       backgroundImage: url,
  //     });
  //     setProfileData(prev => prev ? { ...prev, backgroundImage: url } : prev);
  //     toast.success("Cover image updated!");
  //   } catch (err) {
  //     console.error("Failed to update cover image", err);
  //     toast.error("Failed to update cover image");
  //   }
  // };
  // const handleAvatarUpload = async (url: string) => {
  //   try {
  //     await axios.patch(`http://localhost:8000/api/profile/${profileData?.id}`, {
  //       avatarImage: url,
  //     });
  //     setProfileData(prev => prev ? { ...prev, avatarImage: url } : prev);
  //     toast.success("Avatar image updated!");
  //   } catch (err) {
  //     console.error("Failed to update avatar image", err);
  //     toast.error("Failed to update avatar image");
  //   }
  // };
  return (
    <div>
      {profileData ? (
        <div className="w-full flex flex-col gap-[12px]">
          {profileData.backgroundImage ? (
            // <CldImage
            //   width="1"
            //   height="1"
            //   src={profileData.backgroundImage}
            //   sizes="100vw"
            //   alt="User avatar"
            //   className="w-full h-[250px] absolute top-0 left-0 z-[-1]"
            // />
            <div></div>
          ) : (
            <Skeleton className="bg-black/50 w-full h-[250px] absolute z-[-1] top-0 left-0" />
          )}
          {/* Uncomment to allow cover change */}
          {/* <ChangeCover onCoverUploaded={handleCoverUpload} /> */}
          <Badge className="px-[42px] py-[27px] flex flex-col gap-[30px] rounded-[16px] bg-[#0A0B0C] border-2 border-gray-800 w-full">
            <div className="flex items-center w-full justify-between gap-[200px]">
              <div className="flex items-center gap-[30px]">
                <div className="rounded-full border-4 border-black w-[116px] h-[116px] flex justify-center items-center">
                  {profileData.avatarImage ? (
                    <div className="flex relative group w-fit items-center justify-center">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={profileData.avatarImage} />
                      </Avatar>
                      {/* Uncomment this to allow avatar update overlay on hover */}
                      {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <ChangeAvatar onAvatarUploaded={handleAvatarUpload} />
                      </div> */}
                    </div>
                  ) : (
                    <User />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[20px]">{profileData.name}</p>
                  <p className="text-[12px] text-white/50">
                    {profileData.socialMediaURL}
                  </p>
                </div>
              </div>
              <div className="flex gap-[17px] w-fit">
                {/* Uncomment for copy and edit features */}
                {/* <Button className='bg-[#0363FB] rounded-full p-[10px]' variant="secondary" onClick={copyToClipboard}>
                  <Copy className='text-white' />
                </Button>
                <EditProfile
                  userId={userId}
                  onProfileUpdated={(newData) => {
                    setProfileData(prev => ({
                      ...prev!,
                      ...newData,
                    }));
                  }}
                /> */}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <h1 className="font-medium text-[12px] text-white/50">About</h1>
              <p className="text-white text-[14px]">
                {profileData.about || "No bio added yet."}
              </p>
            </div>
          </Badge>
          <Badge className="rounded-[16px] font-[400] flex justify-between w-full bg-[#0A0B0C] border-2 border-gray-800 px-[42px]">
            <div className="py-[27px]">
              <h1 className="text-[12px] text-white/50 w-full">
                Social Media URL
              </h1>
              <h1 className="text-[14px] w-full">
                {profileData.socialMediaURL}
              </h1>
            </div>
            <div className="w-[30px] h-[30px] hover:bg-blue-600 rounded-full transition-colors duration-300 flex justify-center items-center">
              <a
                href={profileData.socialMediaURL}
                target="_blank"
                rel="noopener noreferrer">
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
  );
};

export default DonationProfile;
