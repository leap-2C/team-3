"use client";

import RecentTransactions from "./_components/RecentTransactions";
import ProfileWidget from "./_components/ProfileWidget";
import FinanceWidget from "./_components/FinanceWidget";
import { useUser } from "@/contexts/UserContext";
import { fetchCurrentUser } from "@/lib/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const token = Cookies.get(`token`);

const Dashboard = () => {
  const [profileData, setProfileData] = useState<{
    id: string;
    name?: string;
    about?: string;
  } | null>(null);
  const [userData, setUserData] = useState<{} | null>(null);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user && user.id) {
          setUserData(user);
          const fetchedUser = await fetchCurrentUser(user.id.toString());
          setProfileData(fetchedUser);
        }
      } catch (err) {
        console.error(err);
        setProfileData(null);
      }
    };
    getUser();
  }, [user, isLoading]);

  useEffect(() => {
    if (!token) {
      redirect("/auth/sign-in");
    }
  }, []);

  return (
    <div className="w-full sm:px-5 md:px-10 lg:px-20 xl:px-60 flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-row gap-4 mt-20 justify-center">
        <ProfileWidget profileData={profileData} user={userData} />
        <FinanceWidget user={userData} />
      </div>
      <RecentTransactions user={userData} />
    </div>
  );
};

export default Dashboard;
