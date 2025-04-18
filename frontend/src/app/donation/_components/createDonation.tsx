"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wine } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const CreateDonation = ({ userId }: { userId: number;  }) => {
const params = useParams()
const receiverId = Number(params?.id);


console.log(receiverId);

const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [userData, setUserData] = useState<{ name: string; avatarImage: string }>({ name: '', avatarImage: '' });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/current-user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchUserData();
  }, [userId]);

  const [selected, setSelected] = useState<number>(1);
  const [formData, setFormData] = useState({
    specialMessage: "",
    socialMediaURL: ""
  });

  const handleAmount = (amount: number) => setSelected(amount);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const route = useRouter();

  const support = async () => {
   

    const send = {
      amount: selected,
      specialMessage: formData.specialMessage,
      socialURLOrBuyMeACoffee: formData.socialMediaURL,
      donorId: userId,
      recipientId: receiverId,
    }

    try {
      await axios.post(`http://localhost:8000/api/donation/create-donation`, send);
      toast.success("Donation successful! 🎉");

      // Save the necessary data to localStorage
      const donationData = {
        name: userData.name,  // User's name
        avatarImage: userData.avatarImage,  // User's avatar image
        amount: selected,  // Selected donation amount
        specialMessage: formData.specialMessage,  // Special message
        sentDate: new Date().toISOString(),  // Date of donation
      };
      
      localStorage.setItem("donation", JSON.stringify(donationData));

      // Redirect to success page
      route.push(`/success/${receiverId}`);
      
      // Reset the form
      setSelected(1);
      setFormData({ specialMessage: "", socialMediaURL: "" });
    } catch (err) {
      toast.error("Failed to donate.");
      console.error(err);
    }
  }

  const customAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const custom = parseFloat(e.target.value);
    if (!isNaN(custom)) {
      setSelected(custom);
    }
  }

  return (
    <Badge className='bg-[#0A0B0C] w-fit h-fit p-[30px] flex flex-col items-start gap-[35px] rounded-[16px] border-2 border-gray-800'>
      <h1 className='font-bold text-[20px]'>Buy Vodka</h1>
      <div className='flex flex-row gap-2 items-center'>
        <div>
          <p className='text-[14px] font-medium mb-2'>Select amount</p>
          <div className='flex gap-2 flex-wrap w-fit'>
            {[1, 5, 10].map((amount) => (
              <Badge
                key={amount}
                onClick={() => handleAmount(amount)}
                className={`cursor-pointer px-[22px] py-[11px] border-2 ${selected === amount ? 'border-[#0363FB]' : ''}`}
              >
                <Wine className='w-4 h-4' />$ {amount}
              </Badge>
            ))}
          </div>
        </div>
        <div className='w-min'>
          <p className='text-[14px] font-medium mb-2'>Custom amount</p>
          <Badge className='w-min'>
            <Input
              className='bg-transparent text-center w-min'
              type="number"
              placeholder="custom amount"
              onChange={customAmount}
            />
          </Badge>
        </div>
      </div>
      <div className='flex flex-col gap-[15px] w-full'>
        <p>Special Message</p>
        <Input
          name="specialMessage"
          value={formData.specialMessage}
          onChange={handleInput}
          placeholder="Please write special message from bottom of your heart"
          className='bg-[#1C1D1F] border border-zinc-700 text-white w-full h-[200px] text-center'
        />
        <p>Enter your social media URL</p>
        <Input
          name="socialMediaURL"
          value={formData.socialMediaURL}
          onChange={handleInput}
          placeholder='social media url'
          className='bg-[#1C1D1F] border border-zinc-700 text-white w-full'
        />
      </div>
      <Button onClick={support} variant='ghost' className='w-full bg-white text-white bg-[#0363FB]'>
        Support {selected} $
      </Button>
    </Badge>
  )
}

export default CreateDonation;
