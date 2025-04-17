"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Success = () => {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 dark">
      <Spotlight />
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Successfully supported
      </h2>
      <div className="w-2/5 h-auto bg-[#151719] rounded-2xl p-5 hover:bg-[#1d1f22]  transition-all">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-auto aspect-square bg-slate-300 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://pbs.twimg.com/media/GfJQLRtW8AAAAOa.jpg)`,
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-base font-semibold text-[var(--foreground)]">
                Luka Doncic
              </p>
              <p className="text-xs font-light text-[var(--foreground)]/40 -mt-[1px]">
                buymecoffee.com/lebronjames
              </p>
            </div>
          </div>
          <div className="flex flex-col align-baseline text-right">
            <p className="text-base font-bold text-[#00FF7B]">+10$</p>
            <p className="text-xs font-light text-[var(--background)]/40 -mt-[1px]">
              10h ago
            </p>
          </div>
        </div>
        <p className="w-full mt-4 mb-2 text-sm text-[var(--foreground)]/80 text-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since....
        </p>
      </div>
      <Link href={"/explore"}>
        <Button className="mt-10">Return to Explore</Button>
      </Link>
    </BackgroundLines>
  );
};

export default Success;
