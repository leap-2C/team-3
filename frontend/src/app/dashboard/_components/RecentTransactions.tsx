import { useState } from "react";
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

const transactions = Array.from({ length: 20 });

const RecentTransactions = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="w-full rounded-2xl h-auto p-6 bg-[#0A0B0C] border border-[#202325]">
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-[var(--background)] font-bold flex items-center gap-2">
          <BanknoteArrowDown width={30} className="stroke-[#00FF7B]" /> Recent
          transactions
        </p>
        <Select>
          <SelectTrigger className="w-auto dark border-none bg-[#151719] text-xs">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent className="dark p-2">
            <SelectGroup>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $1
                </label>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {transactions.slice(0, visibleCount).map((_, index) => (
        <div
          key={index}
          className="w-full h-auto bg-[#151719] rounded-2xl p-5 hover:bg-[#1d1f22] transition-all mt-6"
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-auto aspect-square bg-slate-300 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://pbs.twimg.com/media/GfJQLRtW8AAAAOa.jpg)`,
                }}
              ></div>
              <div className="flex flex-col">
                <p className="text-base font-semibold text-[var(--background)]">
                  Luka Doncic
                </p>
                <p className="text-xs font-light text-[var(--background)]/40 -mt-[1px]">
                  buymecoffee.com/lebronjames
                </p>
              </div>
            </div>
            <div className="flex flex-col align-baseline text-right">
              <p className="text-base font-bold text-[#00FF7B]">+10$</p>
              <p className="text-xs font-light text-[var(--background)]/40 -mt-[1px]">
                10h ago
              </p>
            </div>
          </div>
          <p className="w-full mt-4 mb-2 text-sm text-[var(--background)]/80 text-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>
        </div>
      ))}

      {visibleCount < transactions.length && (
        <Button onClick={showMore} className="w-full mt-10 py-8 rounded-2xl">
          Show More
        </Button>
      )}
    </div>
  );
};

export default RecentTransactions;
