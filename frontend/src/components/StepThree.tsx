"use client";

import React, { useEffect, useMemo, useState } from "react";;
import { GlareCard } from "@/components/ui/glare-card";
import { useForm } from "react-hook-form";
import ReactFlagsSelect from "react-flags-select";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Visa from "@/assets/Visa";
import { Cpu, Wifi } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import InputGroupThree from "./InputGroupThree";
import { postBankCardInfo } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export type bankCardData = {
  country?: string;
  cardNumber: string;
  firstName: string;
  lastName: string;
};

interface StepThreeProps {
  inputValue: {
    country?: string;
    cardNumber?: string;
    firstName?: string;
    lastName?: string;
    month?: string;
    year?: string;
  };
  setInputValue: any;
  stepNext: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  inputValue,
  setInputValue,
  stepNext,
}) => {
  const [selected, setSelected] = useState<string>("MN");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<bankCardData>({
    defaultValues: {
      country: inputValue.country || "MN",
      cardNumber: inputValue.cardNumber || "",
      firstName: inputValue.firstName || "",
      lastName: inputValue.lastName || "",
    },
  });
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();
  console.log(inputValue, "inputValue");

  const onSubmit = async (data: bankCardData) => {
    try {
      setInputValue((prev: bankCardData) => ({ ...prev, ...data }));

      const result = await postBankCardInfo(data, String(user?.id || ""));
      console.log("Posted successfully", result);
      console.log(data, "data");

      stepNext();
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to post bank card info:", error);
    }
  };


  const months = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString()
  );
  const years = Array.from({ length: 11 }, (_, index) =>
    (2025 + index).toString()
  );

  useEffect(() => {
    if (user) {
      setUserData(user)
      console.log("userData", user);
    }
  }, [user, isLoading])

  return (
    <div className="flex items-center justify-center w-full text-white gap-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[400px] flex flex-col place-items-center gap-8">
          <h6 className="w-full text-transparent bg-gradient-to-r from-white via-white to-blurred bg-clip-text font-bold text-[40px] text-center leading-10">
            How would you <br />
            like to be paid?
          </h6>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full col-span-6 h-[65px] rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 py-1 flex flex-col justify-center">
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => setSelected(code)}
              />
            </div>

            <div className="w-full flex gap-3">
              <InputGroupThree
                id="firstName"
                label="First Name"
                placeholder="Your first name"
                className="w-2/4"
                register={register}
                registerOptions={{
                  required: "* First name is required",
                  minLength: { value: 2, message: "* At least 2 characters" },
                }}
                error={errors.firstName?.message}
              />
              <InputGroupThree
                id="lastName"
                label="Last Name"
                placeholder="Your last name"
                className="w-2/4"
                register={register}
                registerOptions={{
                  required: "* Last name is required",
                  minLength: { value: 2, message: "* At least 2 characters" },
                }}
                error={errors.lastName?.message}
              />
            </div>

            <div className="w-full py-4 rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 flex flex-col justify-center">
              <Label className="text-[#7d7d7d] text-xs">Card Number</Label>
              <Input
                {...register("cardNumber", {
                  required: "* Card number is required",
                  minLength: { value: 16, message: "* Must be 16 digits" },
                  maxLength: { value: 16, message: "* Must be 16 digits" },
                })}
                type="number"
                placeholder="xxxx xxxx xxxx xxxx"
                className="h-auto p-0 bg-transparent border-none font-semibold text-[10px] text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-xs">
                  {errors.cardNumber.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-row gap-3">
              <div className="w-2/4">
                <Select
                >
                  <SelectTrigger className="w-full rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 py-7">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="dark max-h-[200px]">
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-2/4">
                <Select

                >
                  <SelectTrigger className="w-full h-[65px] rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 py-7">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="dark max-h-[200px]">
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center text-center dark">
            <button type="submit" className="w-full flex justify-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="dark:bg-black bg-white text-black dark:text-white space-x-2 w-[400px] flex justify-center items-center"
              >
                <span>Finish</span>
              </HoverBorderGradient>
            </button>
          </div>
        </div>
      </form>

      <div className="w-[470px] h-[270px]">
        <GlareCard className="bg-gradient-to-b from-blue-600 to-blue-800 border-[#969696] flex flex-col justify-between">
          <div className="flex items-center justify-between px-6 w-full h-14">
            <div className="flex gap-1">
              <Cpu className="opacity-50 w-5" />
              <Wifi className="rotate-90 opacity-50 w-5" />
            </div>
            <Visa />
          </div>
          <div className="px-8 pb-5">
            <p className="text-3xl font-bold mb-2">1234**********</p>
            <div className="flex items-center justify-between">
              <div className="text-lg mb-2">Expiry Date: 12/25</div>
              <div className="text-lg mb-2">CVV: 123</div>
            </div>
          </div>
        </GlareCard>
      </div>
    </div>
  );
};

export default StepThree;
