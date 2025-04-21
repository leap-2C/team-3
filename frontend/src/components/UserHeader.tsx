import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, CreditCard, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/assets/logo-white.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { fetchCurrentUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserHeader = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const { user, isLoading } = useUser();
  interface ProfileData {
    avatarImage?: string;
    socialMediaURL?: string;
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userData, setUserData] = useState<{} | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user && user.id) {
          setUserData(user);
          const fetchedUser = await fetchCurrentUser(user.id.toString());
          setProfileData(fetchedUser);
        }
      } catch (err) {
        console.error(err);
        setProfileData(null);
      }
    };
    getUser();
  }, [user, isLoading]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://buymecoffe.vercel.app/${profileData?.socialMediaURL}`
      );
      toast.success(`Copied to clipboard`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (err) {
      console.error("Copy failed", err);
      toast.error(`Failed to copy`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };

  const handleLogOut = () => {
    if (token) {
      Cookies.remove("token");
      router.push(`/home`);
    } else {
      console.log(`Error`);
    }
  };

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 xl:px-60 flex flex-col justify-center items-center mt-10">
      <div className="w-full h-14 flex flex-row gap-4 justify-between items-center">
        <Link href="/home">
          <img src={Logo.src} className="h-10" />
        </Link>
        <div className="bg-gradient-to-r from-slate-900 via-slate-700 to-blue-900 rounded-full flex justify-center items-center p-[2px]">
          <div className="w-full h-full bg-black rounded-full flex justify-center items-center px-6 py-3">
            <ul className="w-full flex justify-center items-center gap-8 text-[var(--background)] text-sm">
              <Link href="/home">
                <li className="hover:text-[var(--background)]/70 transition-all">
                  Home
                </li>
              </Link>
              <Link href="/explore">
                <li className="hover:text-[var(--background)]/70 transition-all">
                  Explore
                </li>
              </Link>
              <Link href="https://github.com/leap-2C/team-3" target="_blank">
                <li className="hover:text-[var(--background)]/70 transition-all">
                  Github
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="h-full w-[95px] flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className="h-4/6 w-auto aspect-square cursor-pointer bg-cover bg-center bg-slate-500"
                style={{ backgroundImage: `url(${profileData?.avatarImage})` }}
              ></Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-50 dark mt-3">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    <User />
                    <span>Dashboard</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <CreditCard />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyClick}>
                  <Copy />
                  <span>Copy URL</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
