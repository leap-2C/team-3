import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogoW from "@/assets/logo-white.png";
import { Button } from "./ui/button";
import Link from "next/link";

const AuthDialog = () => {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-6 rounded-xl font-bold hover:scale-105">
            Dashboard
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark rounded-4xl bg-[#151719]">
          <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
            <img src={LogoW.src} width={120} />
            {/* <p className="text-[var(--foreground)]/40">
					if you are not member join us now
				</p> */}
            <Link href={`/auth/sign-in?type=signin`} className="w-full">
              <Button className="w-full py-7 text-base rounded-full font-bold bg-[#282c30] hover:bg-[#282c3073] text-[var(--foreground)] mt-4">
                Sign In
              </Button>{" "}
            </Link>

            <Link href={`/auth/sign-in`} className="w-full">
              <Button className="w-full py-7 text-base rounded-full font-bold">
                Signup
              </Button>
            </Link>
            <p className="text-[var(--foreground)]/40 text-xs text-center tracking-wide mt-4">
              By tapping Sign In and using BuyMeCoffee, you agree to our{" "}
              <span className="text-[var(--foreground)]/90">Terms</span>
              {"  "}
              and{"  "}
              <span className="text-[var(--foreground)]/90">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
