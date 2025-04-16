import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import LogoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-96 bg-gradient-to-b from-[#000000] via-[#10111236] to-[#10111265] -mt-48"></div>
      <div className="w-full h-[800px] bg-[#10111265] pt-50 flex flex-col items-center">
        <Separator className="bg-[var(--background)]/10" />
        <div className="border-r border-l w-3/4 h-full border-[var(--background)]/10 flex flex-col p-26">
          <div className="w-full flex justify-between items-start">
            <img src={LogoWhite.src} width={150} />
            <div className="flex gap-20">
              <ul className="flex flex-col justify-start text-[#89898A] gap-3">
                <li className="text-sm text-white">Documentation</li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Getting Started
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Components
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  API playground
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Pricing
                </li>
              </ul>
              <ul className="flex flex-col justify-start text-[#89898A] gap-3">
                <li className="text-sm text-white">Resources</li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Customers
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Enterprise
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Request review
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Integrations
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Guides
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Templates
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Wall of Love
                </li>
              </ul>
              <ul className="flex flex-col justify-start text-[#89898A] gap-3">
                <li className="text-sm text-white">Company</li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Careers
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Blog
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Security
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Feedback
                </li>
              </ul>
              <ul className="flex flex-col justify-start text-[#89898A] gap-3">
                <li className="text-sm text-white">Legal</li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Privacy Policy
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Terms of Service
                </li>
                <li className="text-sm hover:text-white font-semibold cursor-pointer">
                  Responsible Disclosure
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-24">
            <div className="py-1 w-36 border border-[#89898A] rounded-full flex items-center justify-center gap-3">
              <div className="h-2 w-auto aspect-square bg-[#00FF7B] rounded-full"></div>
              <p className="text-xs text-[#89898A]">All systems normal</p>
            </div>
            <p className="text-sm text-[#89898A] font-bold">
              © 2025 Team-3 Project.
            </p>
            <div className="w-36 flex justify-end">
              <Github className="stroke-[#89898A] fill-[#89898A] hover:stroke-white hover:fill-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
