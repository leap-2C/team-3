"use client";

import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FormData = {
  url: string;
  username: string;
  firstName: string;
  lastName: string;
  about: string;
  cardNumber: string;
  month: string;
  year: string;
  country: string;
};

const Profile = () => {
  const [stepState, setStepState] = useState(0);
  const [inputValue, setInputValue] = useState<FormData>({
    url: "",
    username: "",
    firstName: "",
    lastName: "",
    about: "",
    cardNumber: "",
    month: "",
    year: "",
    country: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const { stepState: savedStep, ...savedValues } = JSON.parse(savedData);
      setStepState(savedStep || 0);
      setInputValue((prev) => ({
        ...prev,
        ...savedValues,
        cardNumber: "",
        month: "",
        year: "",
        country: "",
      }));
    }
  }, []);

  useEffect(() => {
    const { cardNumber, month, year, country, ...dataToSave } = inputValue;

    localStorage.setItem(
      "formData",
      JSON.stringify({ ...dataToSave, stepState })
    );
  }, [inputValue, stepState]);

  const stepNext = () => {
    if (stepState < 2) setStepState((prev) => prev + 1);
  };

  const stepBack = () => {
    if (stepState > 0) setStepState((prev) => prev - 1);
  };

  return (
    <div>
      <div className="w-full min-h-screen relative overflow-hidden bg-black/[0.96]">
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#101010_1px,transparent_1px),linear-gradient(to_bottom,#101010_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="relative z-20 w-full h-screen flex flex-col justify-center items-center">
          <div className="w-96 absolute flex justify-between items-center top-15">
            <hr className="absolute border-1 border-[var(--background)]/20 w-full top-1/2 transform -translate-y-1/2 z-0" />
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-6 aspect-square rounded-full relative flex justify-center items-center z-20 ${
                  stepState >= step ? "bg-[#0363FB]" : "bg-[#3f3f3f]"
                }`}
              >
                <p className="absolute top-10 text-xs text-[var(--background)] whitespace-nowrap">
                  Step {step + 1}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full">
            {stepState === 0 && (
              <StepOne
                inputValue={inputValue}
                setInputValue={setInputValue}
                stepNext={stepNext}
              />
            )}
            {stepState === 1 && (
              <StepTwo
                inputValue={inputValue}
                setInputValue={setInputValue}
                stepNext={stepNext}
              />
            )}
            {stepState === 2 && (
              <StepThree
                inputValue={inputValue}
                setInputValue={setInputValue}
                stepNext={stepNext}
              />
            )}
          </div>

          {stepState > 0 && (
            <div className="absolute bottom-10 left-20 p-3 aspect-square rounded-lg bg-[#161616] border border-[#3B3B3B] flex justify-center items-center cursor-pointer group">
              <ChevronLeft
                width={30}
                className="stroke-[#7D7D7D] group-hover:pr-2 transition-all"
                onClick={stepBack}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
