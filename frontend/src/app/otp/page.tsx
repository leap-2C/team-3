"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { OTPCheck } from "@/lib/api";
import { toast } from "react-toastify";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP = () => {
  const [userData, setUserData] = useState<{} | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (user?.id && user.email) {
        const otpcheck = await OTPCheck(user.email.toString(), data.pin);
        router.push("/test");
        toast.success("Successfully verified");
      } else {
        toast.error("error occurred");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        console.error("error:", err);
      }
    }
  }

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user && isLoading) {
      setUserData(user);
    }
  }, [user, isLoading]);

  return (
    <>
      <div className="w-full h-screen bg-[var(--background)] flex justify-center items-center">
        <div className="w-full max-w-[400px] px-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl font-black">
                      Verify Email
                    </FormLabel>
                    <p className="text-sm text-[var(--foreground)]/60 mb-3">
                      Enter the code just sent to{" "}
                      <strong className="text-[var(--foreground)] font-black">
                        {user?.email}
                      </strong>{" "}
                      to verify your mail.
                    </p>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex w-full gap-4">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="flex-1 h-12 text-2xl border border-gray-300 rounded-md text-center"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-6 rounded-2xl bg-[#0363FB] hover:bg-[#0345fb]"
              >
                <ShieldCheck />
                Verify
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OTP;
