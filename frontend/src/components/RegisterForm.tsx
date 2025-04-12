"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldUser, Mail, Lock, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import axios from "axios";

const API_URL = process.env.API_URL;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/sign-up`, data, {
        withCredentials: true,
      });
      setIsLoading(false);

      const token = res.data.data.token;
      Cookies.set("token", token, { expires: 7, path: "/" });
      router.push("/home");
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const notify = () => toast("Wow so easy!");

  return (
    <form
      className={cn("flex flex-col gap-6 w-full", className)}
      {...props}
      onSubmit={fetchSignUp}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-extrabold">Create an Account</h1>
        <p className="text-balance text-sm text-[var(--foreground)]/40 -mt-2">
          Please enter your details wisely
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Tabs defaultValue="signup" className="w-3/4">
          <TabsList className="grid grid-cols-2 h-14 rounded-2xl w-full mb-4">
            <TabsTrigger value="signup" className="rounded-2xl">
              Signup
            </TabsTrigger>
            <TabsTrigger value="signin" className="rounded-2xl">
              Sign In
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup" className="flex flex-col gap-4 w-full">
            <div className="bg-[var(--background)] rounded-2xl border-[#EEEEEE] border-2 w-full flex flex-row justify-center items-center gap-4 py-1">
              <Mail width={23} strokeWidth={1.5} className="ml-5" />
              <hr className="border-r-1 border-[#EEEEEE] h-8" />
              <div className="flex flex-col w-full py-2 px-1">
                <p className="text-[10px] text-[var(--foreground)]/50 font-bold -mb-[2px]">
                  Email Address
                </p>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="your@mail.com"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-[var(--background)] text-sm text-[var(--foreground)] shadow-none w-full h-6 border-none pl-0 rounded-none font-bold focus-visible:ring-0"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-7 bg-[#0363FB] hover:bg-[#0362fbe1] rounded-2xl font-semibold"
              disabled={isLoading}
              onClick={notify}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </TabsContent>
          <TabsContent value="signin" className="w-full flex flex-col gap-4">
            <div className="bg-[var(--background)] rounded-2xl border-[#EEEEEE] border-2 w-full flex flex-row justify-center items-center gap-4 py-1">
              <UserRound width={23} strokeWidth={1.5} className="ml-5" />
              <hr className="border-r-1 border-[#EEEEEE] h-8" />
              <div className="flex flex-col w-full py-2 px-1">
                <p className="text-[10px] text-[var(--foreground)]/50 font-bold -mb-[2px]">
                  Name
                </p>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="eg. John"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-[var(--background)] text-sm text-[var(--foreground)] shadow-none w-full h-6 border-none pl-0 rounded-none font-bold focus-visible:ring-0"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-7 bg-[#0363FB] hover:bg-[#0362fbe1] rounded-2xl font-semibold"
              disabled={isLoading}
              onClick={notify}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
