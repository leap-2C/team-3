"use client";
import { useState } from "react";
import MagicURL from "./_components/magicURLStep";
import ProfileSetup from "./_components/profileSetupStep";
import CardSetup from "./_components/cardSetupStep";
const CreateProfile = () => {
  const [step, setStep] = useState("magicURL");
  return (
    <>
      <div className="bg-[#08090A] w-screen h-screen flex flex-col items-center">
        <div className="text-amber-300 mt-14">3 dots</div> 

        {step === "magicURL" && <MagicURL setStep={setStep} />}
        {step === "ProfileSetup" && <ProfileSetup setStep={setStep} />}
        {step === "CardSetup" && <CardSetup setStep={setStep} />}
      </div>
    </>
  );
};

export default CreateProfile;
