"use client";

import { CircleCheck, CircleX, Link2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface StepOneProps {
  inputValue: { url: string };
  setInputValue: any;
  stepNext: () => void;
}

const StepOne = ({ inputValue, setInputValue, stepNext }: StepOneProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "");
    setInputValue((prev: { url: string }) => ({ ...prev, url: value }));
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div>
          <section className="flex flex-col justify-start">
            <p className="text-5xl py-2 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/60 to-[var(--foreground)] bg-clip-text text-transparent font-bold">
              Create Your Magic URL
            </p>
            <p className="text-base text-white/50 font-light">
              URL Cannot be edited once you created, Please choose wisely!
            </p>
          </section>
          <div className="mt-10 flex justify-center items-center gap-4">
            <div className="py-5 px-6 bg-[#161616] border border-[#3B3B3B] rounded-2xl flex flex-row justify-start items-center gap-4">
              <Link2 width={24} className="stroke-[var(--background)]/50" />
              <hr className="border-r-1 h-7 border-[var(--background)]/20" />
              <p className="text-[var(--background)]/50 text-xl">
                https://buymecoffee.mn/
              </p>
              <input
                name="url"
                type="text"
                value={inputValue.url}
                onChange={handleChange}
                className="text-2xl font-bold text-[var(--background)] outline-none -mt-1 -ml-2"
              />
            </div>
            <Button
              onClick={stepNext}
              className="py-[34px] aspect-4/3 bg-[#0363FB] hover:bg-[#0362fbde] rounded-2xl"
            >
              GO
            </Button>
          </div>
          <p className="text-sm text-[#00FF7B] mt-4 flex items-center gap-2">
            <CircleCheck width={17} />
            Magic URL is available
          </p>
          <p className="text-sm text-red-400 mt-4 flex items-center gap-2">
            <CircleX width={17} />
            Magic URL is not available
          </p>
        </div>
      </div>
    </>
  );
};

export default StepOne;
