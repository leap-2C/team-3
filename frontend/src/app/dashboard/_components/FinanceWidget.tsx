import React, { useEffect, useState } from "react";
// import EditCreditCard from "./EditCreditCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Visa from "@/assets/Visa";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBalance, getBankCardInfo } from "@/lib/api";
import { formatNumber } from "@/utils/CurrencyFormatter";

const FinanceWidget = (props: any) => {
  const { user } = props;
  const [hideInfo, setHideInfo] = useState(false);
  interface BankInfo {
    firstName: string;
    cardNumber: string;
    expiryDate: string;
  }

  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  interface Balance {
    totalAmount: number;
  }

  const [balance, setBalance] = useState<Balance | null>(null);

  const handleInfoHide = () => {
    setHideInfo((prev) => !prev);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user && user.id) {
          const res = await getBankCardInfo(user.id);
          setBankInfo(res?.data?.[0]);
          const bal = await getBalance(user.id);
          setBalance(bal);
        }
      } catch (err) {
        console.error(err);
        setBankInfo(null);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className="w-2/6 h-[22rem] bg-[#0A0B0C] border border-[#202325] rounded-2xl overflow-hidden">
      <div className="w-full h-3/7 bg-[#0363FB] p-5">
        <div className="w-full h-3/4 flex justify-between items-start">
          <p className="text-xl text-[var(--background)] font-bold">
            {hideInfo ? ` *****` : bankInfo?.firstName || "-"}
          </p>
          {/* <EditCreditCard /> */}
          <Button onClick={handleInfoHide} className="dark z-40">
            <Eye />
          </Button>
        </div>
        <div className="w-full h-1/4 flex justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <p className="text-base text-[var(--background)]">
              {" "}
              {hideInfo ? ` ******` : bankInfo?.cardNumber || "-"}
            </p>
            <p className="text-base text-[var(--background)]">
              {" "}
              {hideInfo ? ` **/**` : bankInfo?.expiryDate || "-"}
            </p>
          </div>
          <Visa />
        </div>
      </div>
      <div className="w-full px-5 flex justify-between items-center mt-4">
        <p className="text-sm text-[var(--background)]/70 font-light">
          Total Earning
        </p>
        <Select>
          <SelectTrigger className="w-auto dark border-none bg-[#151719] text-xs">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="dark">
            <SelectGroup>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p className="text-4xl text-[var(--background)] font-extrabold px-5">
        {hideInfo ? ` ***.**` : `$${formatNumber(balance?.totalAmount)}`}
      </p>
      <div className="px-6 mt-5 flex flex-col gap-2">
        <p className="text-xs text-[var(--background)]/70 font-light">
          Top Donator
        </p>
        <div className="w-56 h-11 rounded-full bg-[#14181A] p-[7px] flex justify-between items-center hover:ml-2 transition-all">
          <div className="flex flex-row gap-3 items-center h-full">
            <div
              className="w-auto h-full aspect-square bg-slate-200 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://www.pfpgeeks.com/static/images/funny-pfp/webp/funny-pfp-7.webp)`,
              }}
            ></div>
            <p className="text-sm text-[var(--background)] font-semibold">
              {hideInfo ? ` *** **` : `John Doe`}
            </p>
          </div>
          <p className="text-sm text-[#00FF7B] font-semibold mr-3">
            {" "}
            {hideInfo ? ` ***` : `3000$`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceWidget;
