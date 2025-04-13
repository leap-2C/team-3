import { Button } from "@/components/ui/button";
import { Banknote, BanknoteArrowDown, Copy, Eye, ImageUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Visa from "@/assets/Visa";
import { Checkbox } from "@/components/ui/checkbox";

const Dashboard = () => {
  return (
    <>
      <div className="w-full sm:px-5 md:px-10 lg:px-20 xl:px-60 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row gap-4 mt-20 justify-center">
          {/* Profile Widget */}
          <div className="w-4/6 h-[22rem] bg-[#0A0B0C] border-1 border-[#202325] rounded-2xl overflow-hidden">
            <div
              className="w-full h-3/7 bg-slate-400 bg-cover bg-center relative z-0 group"
              style={{
                backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/d1de32133357979.61efedb852661.jpg)`,
              }}
            >
              <div className="absolute opacity-0 right-3 top-3 px-3 py-2 bg-[var(--foreground)]/40 rounded-lg group-hover:opacity-100 transition-all cursor-pointer">
                <p className="text-xs text-[var(--background)] flex flex-row items-center gap-2">
                  <ImageUp width={14} />
                  Upload image
                </p>
              </div>
            </div>
            <div className="w-full px-6 flex justify-between mt-4">
              <div className="w-auto flex flex-row gap-3">
                <div
                  className="w-28 h-auto aspect-square rounded-full bg-slate-500 bg-cover bg-center border-6 border-[#0A0B0C] -mt-13 z-10 relative group overflow-hidden"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/736x/ba/c5/e1/bac5e153506f4957ab1f75d93f5a1b94.jpg)`,
                  }}
                >
                  <div className="absolute w-full h-full opacity-0 flex justify-center items-center  bg-[var(--foreground)]/40 group-hover:opacity-100 transition-all cursor-pointer">
                    <ImageUp
                      width={20}
                      className="stroke-[var(--background)]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-[var(--background)]">
                    Johniihon
                  </p>
                  <p className="text-xs font-light text-[var(--background)]/40 -mt-[2px]">
                    @Johny
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <Button className="bg-[#0363FB] aspect-square rounded-full font-bold px-6 hover:bg-[#0362fbb6]">
                  <Eye strokeWidth={2} />
                </Button>
                <Button className="bg-[#0363FB] aspect-square rounded-full font-bold px-6 hover:bg-[#0362fbb6]">
                  <Copy strokeWidth={2} />
                </Button>
                <Button className="dark rounded-full font-bold px-6">
                  Edit Profile
                </Button>
              </div>
            </div>
            <p className="text-xs font-light text-[var(--background)]/40 px-6 mt-6">
              About
            </p>
            <p className="text-sm font-light text-[var(--background)] px-6 w-5/7 mt-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been
            </p>
          </div>
          {/* End Profile Widget */}
          {/* Finance Widget */}
          <div className="w-2/6 h-[22rem] bg-[#0A0B0C] border border-[#202325] rounded-2xl overflow-hidden">
            <div className="w-full h-3/7 bg-[#0363FB] p-5">
              <div className="w-full h-3/4 flex justify-between items-start">
                <p className="text-xl text-[var(--background)] font-bold">
                  Jameson Cole
                </p>
                <Button className="dark rounded-full bg-[var(--foreground)] font-bold px-6">
                  Edit Card
                </Button>
              </div>
              <div className="w-full h-1/4 flex justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                  <p className="text-base text-[var(--background)]">
                    ****4324843
                  </p>
                  <p className="text-base text-[var(--background)]">12/24</p>
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
              $162,745.00
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
                    John Doe
                  </p>
                </div>
                <p className="text-sm text-[#00FF7B] font-semibold mr-3">
                  3’000$
                </p>
              </div>
            </div>
          </div>
          {/* End Finane Widget */}
        </div>
        {/* Recent Transactions */}
        <div className="w-full rounded-2xl h-auto p-6 bg-[#0A0B0C] border border-[#202325]">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg text-[var(--background)] font-bold flex items-center gap-2">
              <BanknoteArrowDown width={30} className="stroke-[#00FF7B]" />{" "}
              Recent transactions
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
          <div className="w-full h-auto bg-[#151719] rounded-2xl p-5 hover:bg-[#1d1f22]  transition-all">
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since....
            </p>
          </div>
        </div>
        {/* End Recent Transactions */}
      </div>
    </>
  );
};

export default Dashboard;
