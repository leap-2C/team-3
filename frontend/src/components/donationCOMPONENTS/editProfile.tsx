import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserRoundPen } from 'lucide-react';

type Props = {
  onProfileUpdated: (msg: string) => void
}

type Profile = {
  name: string
  about?: string
  socialMediaURL?: string
}

const EditProfile = ({ onProfileUpdated }: Props) => {
  const userId = 16
  const profileId = 3

  const [data, setData] = useState<Profile>({ name: '' })
  const [updatedData, setUpdatedData] = useState<Partial<Profile>>({})

  const fetchProfile = async () => {
    const res = await axios.get(`http://localhost:8000/api/profile/current-user/${userId}`)
    setData(res.data)
    console.log(res.data);
    
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const sendData = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/profile/${profileId}`, updatedData)
      toast.success("Profile updated!")
      onProfileUpdated("updated")
      await fetchProfile()    
    } catch (error) {
      console.error("Error updating profile:", error)
    }
    setUpdatedData({})
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className='bg-white text-black rounded-full' variant="secondary">
          {/* <p className='font-[700] text-[14px]'>Edit profile</p> */}
          <UserRoundPen/>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className='flex gap-[28px] flex-col'>
        <AlertDialogTitle>
          <h1 className='font-[600] text-[20px]'>Edit profile</h1>
          <p className='font-[400] text-[14px] text-black/50'>
            Make changes to your profile here. Click save when you're done.
          </p>
        </AlertDialogTitle>

        <AlertDialogDescription className='flex flex-col gap-[12px]'>
          <div>
            <h1 className='text-black'>Name</h1>
            <Input
              name="name"
              defaultValue={data.name}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30"
            />
          </div>
          <div>
            <h1 className='text-black'>About</h1>
            <Input
              name="about"
              defaultValue={data.about}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30"
            />
          </div>
          <div>
            <h1 className='text-black'>Social media URL</h1>
            <Input
              name="socialMediaURL"
              defaultValue={data.socialMediaURL}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30"
            />
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={sendData}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditProfile
