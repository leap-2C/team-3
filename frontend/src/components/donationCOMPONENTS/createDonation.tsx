"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wine } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const userId = 4 // receiver id
const donorId = 16

const CreateDonation = () => { 
  const [selected, setSelected] = useState<number>(1)
  const [formData, setFormData] = useState({
    specialMessage: "",
    socialMediaURL: ""
  })

  const handleAmount = (amount: number) => setSelected(amount)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const support = async () => {
    const send = {
      amount: selected,
      specialMessage: formData.specialMessage,
      socialURLOrBuyMeACoffee: formData.socialMediaURL,
      donorId,
      recipientId: userId,
    }


    try {
      await axios.post('http://localhost:8000/api/donation/create-donation', send)
      toast.success("Donation successful! 🎉")
      setSelected(1)
      setFormData({ specialMessage: "", socialMediaURL: "" })
    } catch (err) {
      toast.error("Failed to donate.")
      console.error(err)
    }
  }

  return (
    <Badge className='bg-[#0A0B0C] w-fit h-fit p-[30px] flex flex-col items-start gap-[35px] rounded-[16px] border-2 border-gray-800'>
      <h1 className='font-bold text-[20px]'>Buy Vodka</h1>

      <div>
        <h2 className='text-[14px] font-medium mb-2'>Select amount</h2>
        <div className='flex gap-2 flex-wrap'>
          {[1, 5, 10, 20].map((amount) => (
            <Badge
              key={amount}
              onClick={() => handleAmount(amount)}
              className={`cursor-pointer px-[22px] py-[11px] border-2 ${selected === amount ? 'border-[#0363FB]' : ''}`}
            >
              <Wine className='w-4 h-4' /> {amount}
            </Badge>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-[15px] w-full'>
        <Input
          name="specialMessage"
          value={formData.specialMessage}
          onChange={handleInput}
          placeholder="Enter a message (optional)"
          className='bg-[#1C1D1F] border border-zinc-700 text-white'
        />
        <Input
          name="socialMediaURL"
          value={formData.socialMediaURL}
          onChange={handleInput}
          placeholder="Your social link or URL"
          className='bg-[#1C1D1F] border border-zinc-700 text-white'
        />
      </div>

      <Button onClick={support} variant='ghost' className='w-full bg-white text-white bg-[#0363FB]'>
        Support {selected} $
      </Button>
    </Badge>
  )
}

export default CreateDonation;
