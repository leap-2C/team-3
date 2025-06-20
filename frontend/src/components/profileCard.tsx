import { ExternalLink, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
interface ProfileCardProps {
  socialMediaURL: string;
  about: string;
  name: string;
  avatarImage: string;
  backgroundImage: string;
  id: string;
  // Add other properties if needed
}
export const ProfileCard: React.FC<ProfileCardProps> = ({
  socialMediaURL,
  about,
  name,
  avatarImage,
  backgroundImage,
  id,
}) => {
  const router = useRouter();
  const handlePush = () => {
    router.push(`/donation/${id}`);
  };
  return (
    <div
      onClick={() => handlePush()}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[var(--foreground)] hover:border-[#797979] transition-all"
    >
      <div className="relative">
        <div className="w-[362px] h-[128px] ">
          <Image
            src={backgroundImage || "/akatsuki.png"}
            alt="Banner"
            className="object-cover"
            fill
          />
        </div>

        <div className="absolute -bottom-[42px] left-4 w-[93px] h-[93px] ">
          <Image
            src={avatarImage || "/naruto.png"}
            alt="Profile"
            className="rounded-md w-[93px] h-[93px] object-cover"
            fill
          />
        </div>
        <Button className="text-xs bg-white font-bold text-black absolute right-3 bottom-4 rounded-full hover:bg-gray-100">
          View Profile
          <ExternalLink />
        </Button>
      </div>
      <div className="p-4 pt-12">
        <h2 className="font-extrabold text-xl tracking-[-3%] mt-2">@{name}</h2>
        <p className="text-[#000000] opacity-50 text-xs mt-1 font-medium">
          {about}
        </p>
        <a
          href={`https://buymecoffe.vercel.app/123${socialMediaURL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#167ab3] text-xs font-semibold mt-5 mb-2 flex items-center"
        >
          <Link2
            className="inline mr-1.5"
            color="rgba(0, 0, 0, 0.5)"
            width={16}
            height={16}
          />
          https://buymecoffe.vercel.app/{socialMediaURL}
        </a>
      </div>
    </div>
  );
};
