import { Button } from "@/components/ui/button";
import BannerImage from "@/assets/b1.png";
import { ArrowRight } from "lucide-react";
import Sticker from "@/assets/sticker.png";

const WhiteSection = () => {
  return (
    <div className="w-[97%] pb-50 pt-20 px-52 rounded-3xl bg-[var(--background)]/95 m-auto my-20 flex flex-col gap-8">
      <div className="w-full flex justify-between items-center gap-20 mt-10">
        <div className="flex flex-col w-auto gap-7">
          <p className="py-2 w-24 bg-[#e0e0e0] rounded-full text-sm font-bold flex justify-center items-center">
            Support
          </p>
          <p className="text-6xl font-black w-[600px]">
            Give your audience an easy way to say thanks.
          </p>
          <p className="text-lg w-[500px]">
            <strong>Buy Me a Coffee makes supporting fun </strong>— and easy. In
            just a couple of taps, your fans can make the payment (buy you a
            coffee) and leave a message.
          </p>
        </div>
        <div className="w-[400px] h-auto aspect-3/4 bg-[#ececec] rounded-2xl flex flex-col items-center">
          <div
            className="w-5/6 h-auto aspect-square bg-slate-300 mt-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${BannerImage.src})` }}
          ></div>
          <div className="w-5/6 flex flex-col mt-5 gap-2">
            <p className="text-base font-extrabold bg-[var(--background)] w-fit px-2">
              One home for all your assets
            </p>
            <p className="text-sm text-[var(--foreground)]/60">
              Your projects and assets are centralized in one shared workspace,
              keeping your team organized and always up to date.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full p-20 h-auto bg-[#e7e7e7] rounded-3xl flex justify-between items-center mt-30">
        <div className="flex flex-col gap-8">
          <p className="py-2 px-4 w-fit bg-[#ffffff] rounded-full text-sm font-bold flex justify-center items-center">
            Designed for creators
          </p>
          <p className="text-5xl font-extrabold xl:w-3/4">
            We don't call them "customers" or transactions. They are your
            supporters.
          </p>
          <Button className="bg-[#0363FB] px-8 py-6 w-fit rounded-full hover:scale-105">
            Learn more
          </Button>
        </div>
        <img src={Sticker.src} width={340} className="hidden xl:flex" />
      </div>
      <div className="w-full h-auto flex justify-center gap-5">
        <div className="w-3/4 py-18  h-auto aspect-6/3 bg-[#CAB3F8] rounded-3xl hover:scale-95 transition-all duration-200 ease-in-out flex flex-col justify-center group cursor-pointer p-12 gap-5">
          <p className="py-2 px-4 w-fit bg-[#ffffff] rounded-full text-base font-bold flex justify-center items-center">
            Support Creators
          </p>
          <p className="text-6xl font-extrabold leading-14">
            Send tips with a kind message
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Show your love
            <ArrowRight
              width={17}
              className="group-hover:ml-1 transition-all duration-300 ease-in-out"
            />
          </p>
        </div>
        <div className="w-3/4 py-18 h-auto aspect-6/3 bg-[#F2ECFD] rounded-3xl hover:scale-95 transition-all duration-200 ease-in-out flex flex-col justify-center group cursor-pointer p-12 gap-5">
          <p className="py-2 px-4 w-fit bg-[#ffffff] rounded-full text-base font-bold flex justify-center items-center">
            Custom Pages
          </p>
          <p className="text-6xl font-extrabold leading-14">
            Personalize your space with ease
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Make it yours
            <ArrowRight
              width={17}
              className="group-hover:ml-1 transition-all duration-300 ease-in-out"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhiteSection;
