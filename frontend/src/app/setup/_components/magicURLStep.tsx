import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Link2 } from "lucide-react";
interface MagicURLProps {
  setStep: Dispatch<SetStateAction<string>>;
}
export const MagicURL: React.FC<MagicURLProps> = ({ setStep }) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    searchRef.current?.focus(); // Auto-focus on load
  }, []);
  const handleClickBlue = () => {
    setStep("ProfileSetup");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Space") {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      const submitButton = document.getElementById(
        "submitButton"
      ) as HTMLButtonElement;
      submitButton.click();
    }
  };
  return (
    <>
      <div>
        <div className="mt-14 font-bold text-5xl tracking-[2%] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 leading-[70px]">
          Create Your Magic URL
        </div>
        <div className="mt-4 font-normal text-base tracking-[2%] text-white/50  ">
          URL Cannot be edited once you created, Please choose wisely!
        </div>
        <div className="flex gap-4 mt-4">
          <div className="border-[0.5px] border-[#3b3b3b] bg-accent-foreground w-lg rounded-2xl flex items-center h-14 gap-4">
            <Link2 className="ml-4 w-10 h-auto aspect-square opacity-50 stroke-white/50" />
            <div className="border-r border-[#3b3b3b] h-7"></div>
            <span className="text-white opacity-50 text-lg">
              https://buymecoffee.mn/
            </span>
            <input
              onKeyDown={handleKeyDown} //Enter darahad button darj baigaatai adilhan :)
              ref={searchRef}
              className="text-white focus:outline-none -ml-3 text-xl font-bold"></input>
          </div>
          <button
            id="submitButton"
            onClick={handleClickBlue}
            className="text-white rounded-2xl flex justify-center items-center bg-[#0363fb] w-20 text-[14px] hover:cursor-pointer">
            GO
          </button>
        </div>
      </div>
    </>
  );
};

export default MagicURL;
