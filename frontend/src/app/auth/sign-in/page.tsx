"use client";

import { SignUpForm } from "@/components/RegisterForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const SignIn = () => {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2 bg-[var(--background)]">
        <div className="relative hidden bg-muted lg:block ">
          <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <div className="w-full h-screen bg-red-400">{index + 1}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div>
            <button onClick={notify}>Click me!</button>
          </div>
          <div className="flex justify-center gap-2 md:justify-start"></div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
