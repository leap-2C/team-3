import React from 'react'
import { Button } from '@/components/ui/button'
import { ImageUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const ChangeAvatar = ({ onAvatarUploaded }: { onAvatarUploaded: (url: string) => void }) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
console.log("this"+CLOUD_NAME);

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Covaar')


    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      const imageUrl = res.data.secure_url
     
      
      onAvatarUploaded(imageUrl)
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  return (
    <Button
      asChild
      className='absolute bottom-0 text-black flex gap-[10px] bg-black/30 px-[17px] py-[11px]'
      variant='ghost'
    >
      <label className='cursor-pointer'>
        <ImageUp />
        <Input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleInput}
        />
      </label>
    </Button>
  )
}
export default ChangeAvatar
