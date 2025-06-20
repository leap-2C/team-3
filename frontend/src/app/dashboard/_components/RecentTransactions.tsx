import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BanknoteArrowDown } from "lucide-react";
import { fetchCurrentUser, getReceivedDonations } from "@/lib/api";
import { formatNumber } from "@/utils/CurrencyFormatter";
import { formatDate } from "@/utils/dateFormatter";

const RecentTransactions = ({ user }: { user: any }) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [donationData, setDonationData] = useState<any[]>([]);
  const [donorProfiles, setDonorProfiles] = useState<Record<number, any>>({});
  const [filters, setFilters] = useState({
    1: false,
    5: false,
    10: false,
  });

  const showMore = () => setVisibleCount((prev) => prev + 5);

  useEffect(() => {
    const getDonations = async () => {
      if (!user?.id) return;
      try {
        const res = await getReceivedDonations(user.id.toString());
        const donations = res.receivedDonations || [];
        setDonationData(donations);

        const uniqueDonorIds: any = [
          ...new Set(donations.map((d: any) => d.donorId).filter(Boolean)),
        ];
        const donorPromises = uniqueDonorIds.map((id: any) =>
          fetchCurrentUser(id as string)
        );
        const donorResults = await Promise.all(donorPromises);
        const donorMap: Record<number, any> = {};
        uniqueDonorIds.forEach((id: any, i: any) => {
          donorMap[id] = donorResults[i];
        });
        setDonorProfiles(donorMap);
      } catch (err) {
        console.error(err);
        setDonationData([]);
      }
    };

    getDonations();
  }, [user]);

  const toggleFilter = (amount: 1 | 5 | 10) => {
    setFilters((prev) => ({ ...prev, [amount]: !prev[amount] }));
  };

  const filteredData = donationData.filter((donation) => {
    const amount = donation.amount;
    const filter1 = filters[1] && amount === 1;
    const filter5 = filters[5] && amount === 5;
    const filter10 = filters[10] && amount >= 10;

    const anyFilterActive = Object.values(filters).some(Boolean);
    return !anyFilterActive || filter1 || filter5 || filter10;
  });

  return (
    <div className="w-full rounded-2xl h-auto p-6 bg-[#0A0B0C] border border-[#202325]">
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-[var(--background)] font-bold flex items-center gap-2">
          <BanknoteArrowDown width={30} className="stroke-[#00FF7B]" />
          Recent transactions
        </p>
        <Select>
          <SelectTrigger className="w-auto dark border-none bg-[#151719] text-xs">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent className="dark p-2 space-y-2">
            {[1, 5, 10].map((val) => (
              <SelectGroup key={val}>
                <div className="flex items-center space-x-2 my-2">
                  <Checkbox
                    id={`amount-${val}`}
                    checked={filters[val as 1 | 5 | 10]}
                    onCheckedChange={() => toggleFilter(val as 1 | 5 | 10)}
                  />
                  <label
                    htmlFor={`amount-${val}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {val === 10 ? "$10+" : `$${val}`}
                  </label>
                </div>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredData.length === 0 ? (
        <div className="w-full h-full p-6 flex justify-center items-center">
          <p className="text-base text-[var(--background)]/60 font-regular">
            Currently there is no support 🥺
          </p>
        </div>
      ) : (
        filteredData.slice(0, visibleCount).map((donation) => {
          const donor = donorProfiles[donation.donorId];
          return (
            <div
              key={donation.id}
              className="w-full h-auto bg-[#151719] rounded-2xl p-5 hover:bg-[#1d1f22] transition-all mt-6"
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center bg-slate-400"
                    style={{
                      backgroundImage: `url(${donor?.avatarImage || ""})`,
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold text-[var(--background)]">
                      {donor?.name || donation.donor?.username || "Anonymous"}
                    </p>
                    <p className="text-xs font-light text-[var(--background)]/40 -mt-[1px]">
                      {donation.socialURLOrBuyMeACoffee}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <p className="text-base font-bold text-[#00FF7B]">
                    +{formatNumber(donation.amount)}$
                  </p>
                  <p className="text-xs font-light text-[var(--background)]/40 -mt-[1px]">
                    {formatDate(donation.createdAt)}
                  </p>
                </div>
              </div>
              {donation.specialMessage && (
                <p className="w-full mt-4 mb-2 text-sm text-[var(--background)]/80">
                  {donation.specialMessage}
                </p>
              )}
            </div>
          );
        })
      )}

      {visibleCount < filteredData.length && (
        <Button onClick={showMore} className="w-full mt-10 py-8 rounded-2xl">
          Show More
        </Button>
      )}
    </div>
  );
};

export default RecentTransactions;
