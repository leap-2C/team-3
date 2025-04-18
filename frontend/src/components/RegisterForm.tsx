"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { validateSignUp, validateSignIn } from "@/utils/validateAuth";
import FormHeader from "@/components/auth/FormHeader";
import InputField from "@/components/auth/InputField";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { useUser } from "@/contexts/UserContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  const { setUser, user } = useUser();

  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState(type || "signup");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    setData({ username: "", email: "", password: "", confirmPassword: "" });
    setErrors({ username: "", email: "", password: "", confirmPassword: "" });
  }, [activeTab]);

  const fetchAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validate = activeTab === "signup" ? validateSignUp : validateSignIn;
    const { isValid, errors: newErrors } = validate(data);

    if (!isValid) {
      setErrors({
        username: newErrors.username || "",
        email: newErrors.email || "",
        password: newErrors.password || "",
        confirmPassword: newErrors.confirmPassword || "",
      });
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = activeTab === "signup" ? "signup" : "signin";
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      );
      console.log(`FUNCTION`);
      const request = axios.post(`${API_URL}/api/auth/${endpoint}`, data, {
        withCredentials: true,
      });
      const res = (await Promise.race([request, timeout])) as {
        data: {
          data: {
            accessToken: string;
            user: any;
          };
        };
      };
      console.log(`END`);
      const token = res.data.data.accessToken;
      const userData = res.data.data.user;
      Cookies.set("token", token, { expires: 999, path: "/" });
      Cookies.set("user", JSON.stringify(userData), {
        expires: 999,
        path: "/",
      });
      setUser(userData);
      if (endpoint === "signup") {
        router.push(`/test`);
      }
      router.push(`/home`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Network error");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 w-full", className)}
      {...props}
      onSubmit={fetchAuth}
    >
      <FormHeader activeTab={activeTab} />
      <div className="w-full flex flex-col justify-center items-center">
        <Tabs
          defaultValue={activeTab}
          className="w-3/4"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 h-14 rounded-2xl w-full mb-4">
            <TabsTrigger value="signup" className="rounded-2xl">
              Signup
            </TabsTrigger>
            <TabsTrigger value="signin" className="rounded-2xl">
              Sign In
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup" className="flex flex-col gap-4 w-full">
            <InputField
              icon="user"
              label="Username"
              name="username"
              placeholder="Pick a cool username"
              value={data.username}
              onChange={handleChange}
              error={errors.username}
            />
            <InputField
              icon="mail"
              label="Email Address"
              name="email"
              placeholder="your@mail.com"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              icon="lock"
              label="Password"
              name="password"
              type="password"
              placeholder="***"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <PasswordRequirements password={data.password} />
            <InputField
              icon="lock"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="***"
              value={data.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#0363FB] hover:bg-[#0362fbe1] rounded-2xl font-semibold text-white disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </TabsContent>
          <TabsContent value="signin" className="w-full flex flex-col gap-4">
            <InputField
              icon="user"
              label="Username"
              name="username"
              placeholder="eg. John"
              value={data.username}
              onChange={handleChange}
              error={errors.username}
              required
            />
            <InputField
              icon="lock"
              label="Password"
              name="password"
              type="password"
              placeholder="***"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#0363FB] hover:bg-[#0362fbe1] rounded-2xl font-semibold text-white disabled:opacity-50 text-sm"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}

export default SignUpForm;
