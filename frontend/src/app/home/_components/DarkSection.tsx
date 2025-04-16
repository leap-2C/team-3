import PanelImage from "@/assets/Panel1.png";
import PanelImage2 from "@/assets/Panel2.png";
import PanelImage3 from "@/assets/Panel3.png";

const DarkSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-2 light mt-30">
      <p className="text-[var(--background)] font-bold text-4xl">
        Your privacy comes first
      </p>
      <p className="text-[var(--background)]/50 text-base text-center font-medium">
        Receive fan support safely without disclosing your identity or
        <br />
        address. We’ll do the heavy-lifting.
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
  );
};

export default DarkSection;
