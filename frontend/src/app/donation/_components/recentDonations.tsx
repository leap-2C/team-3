"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Url } from "url";

type Donation = {
  amount: number;
  createdAt: string;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donor: {
    username: string;
  };
};

const DonationCard = ({ donation }: { donation: Donation }) => (
  <Badge className="flex bg-[#151719] flex-col p-4 items-start gap-4 w-full rounded-[16px] border-2 border-gray-800 ">
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-[20px] items-center">
        <div className="w-9 h-9 rounded-full bg-white" />
        <div className="flex flex-col">
          <p>{donation.donor.username}</p>
          <p className="text-white/50">{donation.socialURLOrBuyMeACoffee}</p>
        </div>
      </div>
      <div>
        <p className="text-[#00FF7B] text-base font-semibold">
          +{donation.amount}$
        </p>
        <p className="text-[10px] font-[300] text-white/50">
          {Math.floor(
            (Date.now() - new Date(donation.createdAt).getTime()) /
              (1000 * 60 * 60)
          )}
          h ago
        </p>
      </div>
    </div>
    <div className="p-2 rounded break-words whitespace-normal">
      {donation.specialMessage}
    </div>
  </Badge>
);

const RecentDonations = ({ userId }: { userId: number }) => {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API}/api/donation/received/${userId}`
        );
        setData(response.data.receivedDonations || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const visibleDonations = showAll ? data : data.slice(0, 2);

  return (
    <Badge className="p-[24px] flex flex-col items-start w-full bg-[#0A0B0C] rounded-[16px]">
      {loading ? (
        <div className="flex flex-col w-full gap-[24px]">
          <Skeleton className="w-[183px] h-[30px] rounded-full" />
          <div className="flex flex-col gap-[12px]">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[133px] rounded-[16px]"
              />
            ))}
          </div>
          <Skeleton className="w-full h-[43px]" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-white py-4  flex w-full justify-center">
          No donations yet
        </div>
      ) : (
        <div className="flex flex-col gap-[24px] w-full">
          <h1 className="font-bold text-xl">Recent Supporters</h1>
          <div className="flex flex-col gap-[12px] w-full">
            {visibleDonations.map((donation, index) => (
              <DonationCard key={index} donation={donation} />
            ))}
          </div>

          {data.length > 2 && (
            <Button
              className="bg-[#151719] text-white px-[296px] py-[12px] rounded-[21.5px]"
              variant="ghost"
              onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? "Show Less" : "See More"}
            </Button>
          )}
          <div className="px-[296px]"></div>
        </div>
      )}
    </Badge>
  );
};
export default RecentDonations;
