"use client";

import { CircleCheck, CircleX, Link2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StepOneProps {
  inputValue: { url: string };
  setInputValue: any;
  stepNext: () => void;
}

const StepOne = ({ inputValue, setInputValue, stepNext }: StepOneProps) => {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!inputValue.url) {
      setAvailable(null);
      return;
    }
    const timeout = setTimeout(() => {
      checkUrl(inputValue.url);
    }, 500); // debounces

    return () => clearTimeout(timeout);
  }, [inputValue.url]);
  const checkUrl = async (val: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/check/custom-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ socialMediaURL: val }),
      });

      const data = await res.json();
      console.log(res);
      setAvailable(data.available);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
              disabled={!available}
              className="py-[34px] aspect-4/3 bg-[#0363FB] hover:bg-[#0362fbde] rounded-2xl"
            >
              GO
            </Button>
          </div>

          {loading && <p className="text-sm text-gray-500">Checking...</p>}
          {available === true && (
            <p className="text-sm text-[#00FF7B] mt-4 flex items-center gap-2">
              <CircleCheck width={17} />
              Magic URL is available
            </p>
          )}
          {available === false && (
            <p className="text-sm text-red-400 mt-4 flex items-center gap-2">
              <CircleX width={17} />
              Magic URL is not available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepOne;