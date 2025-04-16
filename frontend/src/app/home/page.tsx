"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import WhiteSection from "./_components/WhiteSection";
import DarkSection from "./_components/DarkSection";
import Header from "./_components/Header";
import Footer from "@/components/Footer";
import Hero from "./_components/Hero";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />
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
        <Hero />
      </div>
      {/* Section */}
      <WhiteSection />
      {/* END */}
      {/* Section2 */}
      <DarkSection />
      {/* END */}
      <hr className="mt-20 w-auto mx-96 border-[var(--background)]/10" />
      {/* FOOOTER */}
      <Footer />
      {/* END */}
    </div>
  );
};

export default Home;
