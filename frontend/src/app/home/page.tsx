import { Spotlight } from "@/components/ui/spotlight-new";
import { FlipWords } from "@/components/ui/flip-words";
import { cn } from "@/lib/utils";
import { ArrowRight, MoveRight, Rocket } from "lucide-react";
import PanelImage from "@/assets/Panel1.png";
import PanelImage2 from "@/assets/Panel2.png";
import PanelImage3 from "@/assets/Panel3.png";
import BannerImage from "@/assets/b1.png";
import Sticker from "@/assets/sticker.png";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  const words = ["creator", "artist", "people", "developer"];

  return (
    <div>
      {/* HEADER */}
      <div className="w-auto mx-7 mt-6 h-20 bg-[var(--background)] rounded-2xl flex flex-row justify-between items-center px-14">
        <div className="h-full flex flex-row items-center gap-4">
          <img src={Logo.src} width={110} />
          <ul className="ml-14 flex items-center gap-8">
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Home
            </li>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Explore
            </li>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Github
            </li>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              FAQ
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Button className="dark p-6 rounded-xl font-bold hover:scale-105">
            Sign in
          </Button>
          <Button className="p-6 rounded-xl font-bold hover:scale-105">
            Dashboard
          </Button>
        </div>
      </div>
      {/* END */}
      <div className="w-full min-h-screen relative overflow-hidden bg-black/[0.96]">
        {/* Grid bg */}
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#101010_1px,transparent_1px),linear-gradient(to_bottom,#101010_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        {/* Spotlight  */}
        <div className="absolute inset-0 z-10">
          <Spotlight />
        </div>
        {/* Content */}
        <div className="w-full h-[800px] flex items-center justify-center">
          <div className="p-4 max-w-7xl mx-auto relative z-20 w-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Support your <br />
              favourite <FlipWords words={words} className="text-pink-500" />
            </h1>
            <p className="font-normal text-base text-neutral-400 max-w-lg text-center mx-auto">
              Accept support. Start a your personal Page.It’s easier than you
              think.
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
      </div>
      {/* Section */}
      <div className="w-[97%] pb-50 pt-20 px-52 rounded-3xl bg-[var(--background)]/95 m-auto my-20 flex flex-col gap-8">
        <div className="w-full flex justify-between items-center gap-20">
          <div className="flex flex-col w-auto gap-7">
            <p className="py-2 w-24 bg-[#e0e0e0] rounded-full text-sm font-bold flex justify-center items-center">
              Support
            </p>
            <p className="text-6xl font-black w-[600px]">
              Give your audience an easy way to say thanks.
            </p>
            <p className="text-lg w-[500px]">
              <strong>Buy Me a Coffee makes supporting fun </strong>— and easy.
              In just a couple of taps, your fans can make the payment (buy you
              a coffee) and leave a message.
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
                Your projects and assets are centralized in one shared
                workspace, keeping your team organized and always up to date.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-20 h-auto bg-[#e7e7e7] rounded-3xl flex justify-between items-center mt-30">
          <div className="flex flex-col gap-8">
            <p className="py-2 px-4 w-fit bg-[#ffffff] rounded-full text-sm font-bold flex justify-center items-center">
              Designed for creators
            </p>
            <p className="text-5xl font-extrabold w-[700px]">
              We don't call them "customers" or transactions. They are your
              supporters.
            </p>
            <Button className="bg-[#0363FB] px-8 py-6 w-fit rounded-full hover:scale-105">
              Learn more
            </Button>
          </div>
          <img src={Sticker.src} width={340} />
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
      {/* END */}
      {/* Section2 */}
      <section className="w-full flex flex-col justify-center items-center gap-2 light pb-96">
        <p className="text-[var(--background)] font-bold text-4xl">
          Built for modern teams
        </p>
        <p className="text-[var(--background)]/50 text-base text-center font-medium">
          Crafted with customizability and collaboration in mind.
          <br /> Designed to impress.
        </p>
        <div className="w-5/8 flex justify-center items-center gap-6 mt-10">
          <div className="w-full h-auto aspect-4/5 bg-[#ffffff08] hover:bg-[#ffffff12] relative rounded-2xl overflow-hidden group cursor-pointer transition-all">
            <div className="w-full absolute bottom-7 flex justify-center items-center z-20">
              <p className="text-[var(--background)] text-lg font-bold">
                Track all your supporters
              </p>
            </div>
            <img
              src={PanelImage.src}
              className="w-full h-full group-hover:scale-105 transition-all duration-400 ease-in-out z-0"
            />
          </div>
          <div className="w-full h-auto aspect-4/5 bg-[#ffffff08] hover:bg-[#ffffff12] relative rounded-2xl overflow-hidden group cursor-pointer transition-all">
            <div className="w-full absolute bottom-7 flex justify-center items-center z-20">
              <p className="text-[var(--background)] text-lg font-bold">
                Discover new favorites
              </p>
            </div>
            <img
              src={PanelImage2.src}
              className="w-full h-full group-hover:scale-105 transition-all duration-400 ease-in-out z-0"
            />
          </div>{" "}
          <div className="w-full h-auto aspect-4/5 bg-[#ffffff08] hover:bg-[#ffffff12] relative rounded-2xl overflow-hidden group cursor-pointer transition-all">
            <div className="w-full absolute bottom-7 flex justify-center items-center z-20">
              <p className="text-[var(--background)] text-lg font-bold">
                Support the people
              </p>
            </div>
            <img
              src={PanelImage3.src}
              className="w-full h-full group-hover:scale-105 transition-all duration-400 ease-in-out z-0"
            />
          </div>
        </div>
      </section>
      {/* END */}
      {/* FOOOTER */}
      {/* END */}
    </div>
  );
};

export default Home;
