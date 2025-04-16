"use client";

import RecentTransactions from "./_components/RecentTransactions";
import ProfileWidget from "./_components/ProfileWidget";
import FinanceWidget from "./_components/FinanceWidget";
import { fetchCurrentUser } from "@/lib/api";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [profileData, setProfileData] = useState<{
    id: string;
    name?: string;
    about?: string;
  } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      setProfileData(user);
    };
    getUser();
  }, []);
  return (
    <>
      <div className="w-full sm:px-5 md:px-10 lg:px-20 xl:px-60 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row gap-4 mt-20 justify-center">
          {/* Profile Widget */}
          <ProfileWidget profileData={profileData} />
          {/* End Profile Widget */}
          {/* Finance Widget */}
          <FinanceWidget />
          {/* End Finane Widget */}
        </div>
        {/* Recent Transactions */}
        <RecentTransactions />
        {/* End Recent Transactions */}
      </div>
    </>
  );
};

export default Dashboard;
