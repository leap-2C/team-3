"use client";
import { ProfileCard } from "@/components/profileCard";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import { useState, useEffect } from "react";
import axios from "axios";
const Explore = () => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const placeholders = [
    "Search creators you'd love to support...",
    "Find your favorite creators to cheer!",
    "Who needs coffee today?",
    "Not coffee? Tea works too! Search away.",
    "Type a name to send support!",
    "Search by username, skill, or passion",
    "Tip your fav creator—start typing!",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  interface User {
    id: string;
    socialMediaURL: string;
    about: string;
    name: string;
    avatarImage: string;
    backgroundImage: string;
    // Add other properties if needed
  }

  const [users, setUsers] = useState<User[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/api/profile/explore`);

        console.log("Fetched Users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchUsers, 300); // Debounce API calls
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, API]);
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
        <div className="mt-14 w-full grid grid-cols-3 2xl:grid-cols-4 gap-10">
          {users.map((user) => (
            <ProfileCard
              key={user.id}
              socialMediaURL={user.socialMediaURL}
              about={user.about}
              name={user.name}
              id={user.id}
              avatarImage={user.avatarImage}
              backgroundImage={user.backgroundImage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
