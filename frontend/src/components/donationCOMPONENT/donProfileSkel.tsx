

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import React from 'react'

const donProfileSkel = () => {

        return (
          <div className="w-fit flex flex-col gap-[12px]">
  
      
          
            <Badge className="px-[42px] py-[27px] flex flex-col gap-[30px] rounded-[16px] bg-[#0A0B0C]">
              <div className="flex justify-between items-center gap-[157.11px]">
                <div className="flex items-center gap-[30px]">
                  <div className="rounded-full border-3 w-[116px] h-[116px] flex justify-center items-center">
                    <Skeleton className="rounded-full w-[116px] h-[116px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-[120px] h-[20px]" />
                    <Skeleton className="w-[100px] h-[12px]" />
                  </div>
                </div>
                <div className="flex gap-[17px]">
                  <Skeleton className="w-[40px] h-[40px] rounded-full" />
                  <Skeleton className="w-[100px] h-[40px] rounded-full" />
                </div>
              </div>
      
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="w-[60px] h-[12px]" />
                <Skeleton className="w-full h-[40px]" />
              </div>
            </Badge>
      
            {/* Social Media Card Skeleton */}
            <Badge className="px-[42px] py-[27px] rounded-[16px] font-[400] flex justify-between w-full bg-[#0A0B0C]">
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-[120px] h-[12px]" />
                <Skeleton className="w-[200px] h-[14px]" />
              </div>
              <Skeleton className="w-[30px] h-[30px]" />
            </Badge>
          </div>
        );
      }
  


export default donProfileSkel
