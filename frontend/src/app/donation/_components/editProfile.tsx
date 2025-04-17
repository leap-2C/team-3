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
import { UserRoundPen } from 'lucide-react'
type Props = {
  onProfileUpdated: (updatedData: Partial<Profile>) => void
}

type Profile = {
  name: string
  about?: string
  socialMediaURL?: string
}

const EditProfile = ({ onProfileUpdated }: Props) => {
  const userId = 4
  const profileId = 1
  const [data, setData] = useState<Profile>({ name: '' })
  const [updatedData, setUpdatedData] = useState<Partial<Profile>>({})
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/profile/current-user/${userId}`)
      setData(res.data)
    } catch (error) {
      toast.error("Failed to load profile")
    }
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
    const name = updatedData.name ?? data.name
    const about = updatedData.about ?? data.about
    const social = updatedData.socialMediaURL ?? data.socialMediaURL
  
    if (!name?.trim() || !about?.trim() || !social?.trim()) {
      toast.error("Please fill out all fields before saving.")
      return
    }
  
    try {
      await axios.patch(`http://localhost:8000/api/profile/${profileId}`, updatedData)
      toast.success("Profile updated!")
      const newProfile = { ...data, ...updatedData }
      setData(newProfile)
      onProfileUpdated(newProfile)
      setUpdatedData({})
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-white text-black rounded-full' variant="secondary">
          <UserRoundPen />
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
              value={updatedData.name ?? data.name}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30 text-black/50"
            />
          </div>
          <div>
            <h1 className='text-black'>About</h1>
            <Input
              name="about"
              value={updatedData.about ?? data.about ?? ''}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30 text-black/50"
            />
          </div>
          <div>
            <h1 className='text-black'>Social media URL</h1>
            <Input
              name="socialMediaURL"
              value={updatedData.socialMediaURL ?? data.socialMediaURL ?? ''}
              onChange={handleInput}
              className="bg-transparent p-[12px] border border-black/30 text-black/50"
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
