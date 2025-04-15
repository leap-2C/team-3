"use client";
import ProfileCard from "@/components/profileCard";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";

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
      <div className="w-full  bg-[#0b0d0e] px-[10%] min-h-screen ">
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
        <div className="mt-14 w-full grid grid-cols-4  gap-10">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
        <div className="mt-6 w-full h-96 bg-blue-300"></div>
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
