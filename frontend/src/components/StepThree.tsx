"use client";

import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { GlareCard } from "@/components/ui/glare-card";
import { useForm } from "react-hook-form";
import InputGroup from "@/components/InputGroup";
import { Button } from "@/components/ui/button";
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

type CountryOption = {
  label: string;
  value: string;
};

export type ProfileFormData = {
  cardNumber: string;
  firstName: string;
  lastName: string;
  month: string;
  year: string;
};

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface StepThreeProps {
  inputValue: {
    url: string;
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
  } = useForm<ProfileFormData>({
    defaultValues: {
      cardNumber: inputValue.cardNumber || "",
      firstName: inputValue.firstName || "",
      lastName: inputValue.lastName || "",
      month: inputValue.month || "",
      year: inputValue.year || "",
    },
  });

  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        ...country,
        label: `${getFlagEmoji(country.value)} ${country.label}`,
      }));
  }, []);

  const onSubmit = (data: ProfileFormData) => {
    setInputValue((prev: ProfileFormData) => ({ ...prev, ...data }));
    stepNext();
  };

  const months = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString()
  );
  const years = Array.from({ length: 11 }, (_, index) =>
    (2025 + index).toString()
  );

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
              <InputGroup
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
              <InputGroup
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
                  onValueChange={(value) => setValue("month", value)}
                  value={watch("month")}
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
                  onValueChange={(value) => setValue("year", value)}
                  value={watch("year")}
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
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white space-x-2 w-[400px] flex justify-center items-center"
            >
              <span>Finish</span>
            </HoverBorderGradient>
          </div>
        </div>
      </form>

      <div className="w-[470px] h-[270px]">
        <GlareCard className="bg-gradient-to-b from-blue-600 to-blue-800 w-[470px] h-[270px] border-[#969696] flex flex-col justify-between">
          <div className="flex items-center justify-between px-6">
            <div className="flex gap-1">
              <Cpu className="opacity-50" />
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
