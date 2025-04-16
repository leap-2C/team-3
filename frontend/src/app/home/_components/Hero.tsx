import { FlipWords } from "@/components/ui/flip-words";
import { Rocket } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const words = ["creator", "artist", "people", "developer"];
  return (
    <div className="w-full h-[800px] flex items-center justify-center">
      <div className="p-4 max-w-7xl mx-auto relative z-20 w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Support your <br />
          favourite <FlipWords words={words} className="text-pink-500" />
        </h1>
        <p className="font-normal text-base text-neutral-400 max-w-lg text-center mx-auto">
          Accept support. Start a your personal Page.It’s easier than you think.
        </p>
        <Link href={`/auth/sign-in`}>
          <button className="mt-10 relative inline-flex h-12 w-36 hover:w-44 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-0 group transition-all duration-200 ease-in-out">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Rocket
                width={16}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
              />
              <p className="-ml-5 group-hover:ml-0 transition-all duration-200 ease-in-out">
                Start My Page
              </p>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
