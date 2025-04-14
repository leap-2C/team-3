"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Explore = () => {
  const placeholders = [
    "Search creators you'd love to support...",
    "Find your favorite creators to cheer!",
    "Who needs coffee today?",
    "Not coffee? Tea works too! Search away.",
    "Type a name to send support!",
    "Search by username, skill, or passion",
    "Tip your fav creator—start typing!",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <div className="w-full  bg-[#0b0d0e] px-[10%]">
        <div className="pt-20 flex justify-between  dark">
          <div className="text-white font-extrabold text-2xl">
            Explore Users
          </div>
          <div className="w-[500px]">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
        <div className="mt-14 w-full bg-pink-400 grid grid-cols-4  gap-10">
          <div className="bg-amber-300 h-[312px] ">1</div>
          <div className="bg-amber-300 h-[312px] ">2</div>
          <div className="bg-amber-300 h-[312px] ">3</div>
          <div className="bg-amber-300 h-[312px] ">4</div>
          <div className="bg-amber-300 h-[312px] ">5</div>
          <div className="bg-amber-300 h-[312px] ">6</div>
          <div className="bg-amber-300 h-[312px] ">7</div>
          <div className="bg-amber-300 h-[312px] ">8</div>
          <div className="bg-amber-300 h-[312px] ">9</div>
          <div className="bg-amber-300 h-[312px] ">10</div>
        </div>
      </div>
    </>
  );
};

export default Explore;
{
  /* <input
              className="placeholder-white placeholder-opacity-50 w-full focus:placeholder-opacity-0 text-blue-300 h-[312px] focus:outline-none"
              placeholder="Search"
            /> */
}
