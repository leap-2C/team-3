import { Spotlight } from "@/components/ui/spotlight-new";
import { FlipWords } from "@/components/ui/flip-words";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import PanelImage from "@/assets/Panel1.png";
import PanelImage2 from "@/assets/Panel2.png";
import PanelImage3 from "@/assets/Panel3.png";
import Link from "next/link";

const Home = () => {
  const words = ["creator", "artist", "people", "developer"];

  return (
    <div className="dark">
      <div className="w-full min-h-screen relative overflow-hidden bg-black/[0.96]">
        {/* Grid bg */}
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#101010_1px,transparent_1px),linear-gradient(to_bottom,#101010_1px,transparent_1px)]"
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
              favourite{" "}
              <FlipWords words={words} className="dark:text-pink-500" />
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
      <div className="w-[97%] h-[700px] rounded-3xl bg-[var(--foreground)]/95 m-auto my-20 flex justify-center items-center"></div>
      {/* END */}
      {/* Section2 */}
      <section className="w-full flex flex-col justify-center items-center gap-2 light pb-96">
        <p className="text-[var(--foreground)] font-bold text-4xl">
          Built for modern teams
        </p>
        <p className="text-[var(--foreground)]/50 text-base text-center font-medium">
          Crafted with customizability and collaboration in mind.
          <br /> Designed to impress.
        </p>
        <div className="w-5/8 flex justify-center items-center gap-6 mt-10">
          <div className="w-full h-auto aspect-4/5 bg-[#ffffff08] hover:bg-[#ffffff12] relative rounded-2xl overflow-hidden group cursor-pointer transition-all">
            <div className="w-full absolute bottom-7 flex justify-center items-center z-20">
              <p className="text-[var(--foreground)] text-lg font-bold">
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
              <p className="text-[var(--foreground)] text-lg font-bold">
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
              <p className="text-[var(--foreground)] text-lg font-bold">
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
    </div>
  );
};

export default Home;
