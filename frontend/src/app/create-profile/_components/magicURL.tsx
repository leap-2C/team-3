import React from "react";

export const MagicURL = () => {
  return (
    <>
      <div className="bg-[#08090A] w-screen h-screen flex flex-col items-center">
        <div className="text-amber-300 mt-14">3 dots</div>
        <div>
          <div className="mt-14 font-bold text-[40px] tracking-[2%] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
            Create Your Magic URL
          </div>
          <div className="mt-4 font-normal text-[14px] tracking-[2%] text-white/50  ">
            URL Cannot be edited once you created, Please choose wisely!
          </div>
        </div>
      </div>
    </>
  );
};

export default MagicURL;
