import { ExternalLink, Link2 } from "lucide-react";
export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm">
      <div className="relative">
        <img
          src="/akatsuki.png"
          alt="Banner"
          className="w-[362px] h-[128px] object-cover"
          //   height={128}
          //   width={362}
        />
        <div className="absolute -bottom-[42px] left-4">
          <img
            src="/naruto.png"
            alt="Profile"
            className="rounded-md w-[93px] h-[93px]"
            // width={93}
            // height={93}
          />
        </div>
        <button className="text-sm py-1 px-2 bg-white font-bold text-black absolute right-6 bottom-5 rounded-full hover:bg-gray-100">
          <span className="mr-1">View Profile</span>
          <ExternalLink
            className="inline"
            height={10}
            width={10}
            strokeWidth={3}
          />
        </button>
      </div>
      <div className="p-4 pt-12">
        <h2 className="font-extrabold text-xl tracking-[-3%]">@DefaultUser</h2>
        <p className="text-[#000000] opacity-50 text-xs mt-[15px] font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <a
          href="https://buymeacoffee.com/USER"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#167ab3] text-xs font-semibold mt-3 block">
          <Link2
            className="inline mr-1.5"
            color="rgba(0, 0, 0, 0.5)"
            width={14}
            height={14}
          />
          buymeacoffee.com/USER
        </a>
      </div>
    </div>
  );
}
