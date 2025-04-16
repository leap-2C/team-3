import React from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { ImageUp } from 'lucide-react';
import axios from 'axios';

const ChangeCover = () => {
  const profileId = 3; 

  const handleUpload = async (result: any) => {
    const imageUrl = result?.info?.secure_url;

    if (!imageUrl) return console.error("No image URL returned from Cloudinary.");

    try {
      const res = await axios.patch(`http://localhost:8000/api/profile/${profileId}`, {
        backgroundImage: imageUrl,
      });
      console.log("✅ Profile cover updated:", res.data);
    } catch (err) {
      console.error("❌ Failed to update profile cover:", err);
    }
  };

  return (
    <div className="absolute top-0 right-0">
      <div className="flex gap-[5px] px-[17px] py-[11px] bg-[#0000004D]/30 text-white items-center rounded-[8px] cursor-pointer hover:bg-[#00000080]/40 transition-all">
        <ImageUp className="w-4 h-4" />
        <CldUploadButton
          uploadPreset="Covaar"
          onUpload={handleUpload}
          className="text-white font-medium"
        >
          Upload Cover
        </CldUploadButton>
      </div>
    </div>
  );
};

export default ChangeCover;
