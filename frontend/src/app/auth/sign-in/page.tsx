"use client";

import SignUpForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Logo from "@/assets/logo.png";

const SignIn = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2 bg-[var(--background)]">
        <div className="relative hidden bg-muted lg:block">
          <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="w-full h-full p-0">
                  <div
                    className="w-full h-screen bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://cdn.dribbble.com/userupload/15180341/file/original-1c9380ed93f7b1444536bd9e040781b3.png)`,
                    }}
                  ></div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="w-full flex justify-center items-center mt-20 -mb-10">
            <img src={Logo.src} width={120} />
          </div>
          <div className="flex justify-center gap-2 md:justify-start"></div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
