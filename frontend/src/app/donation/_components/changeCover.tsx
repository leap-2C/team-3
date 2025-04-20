import React, { useState } from 'react'
import { ImageUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
type Props = {
  onCoverUploaded: (url: string) => void
}
const ChangeCover = ({ onCoverUploaded }: Props) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
  const CLOUD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET
  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset',CLOUD_PRESET)
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      const imageUrl = res.data.secure_url
      onCoverUploaded(imageUrl)
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }
  return (
    <div className='absolute top-[20px] right-[20px]'>
      <Button
        asChild
        className='absolute top-[50px] right-[50px] text-black flex gap-[10px] bg-black/30 px-[17px] py-[11px]'
        variant='ghost'
      >
        <label className='cursor-pointer'>
          <ImageUp />
          Upload Image
          <Input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleInput}
          />
        </label>
      </Button>
    </div>
  )
}
export default ChangeCover
