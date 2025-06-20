import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import Cookies from "js-cookie";
import Link from "next/link";
import AuthDialog from "@/components/authDialog";

const Header = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const handleDashboard = () => {
    if (!token) {
      router.push(`/auth/sign-in`);
    } else {
      router.push(`/dashboard`);
    }
  };

  const handleLogOut = () => {
    if (token) {
      Cookies.remove("token");
      window.location.reload();
    } else {
      console.log(`Error`);
    }
  };

  return (
    <div className="w-auto mx-7 mt-6 h-20 bg-[var(--background)] rounded-2xl flex flex-row justify-between items-center px-14">
      <div className="h-full flex flex-row items-center gap-4">
        <img src={Logo.src} width={110} />
        <ul className="ml-14 flex items-center gap-8">
          <Link href={`/home`}>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Home
            </li>
          </Link>
          <Link href={`/explore`}>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Explore
            </li>
          </Link>
          <Link href={`https://github.com/leap-2C/team-3`} target="_blank">
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              Github
            </li>
          </Link>
          <Link href={`/home`}>
            <li className="text-base font-semibold cursor-pointer hover:text-[var(--foreground)]/70 transition-all duration-200">
              FAQ
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <Button
            className="dark p-6 rounded-xl font-bold hover:scale-105"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        ) : (
          <Link href={`/auth/sign-in?type=signin`}>
            <Button className="dark p-6 rounded-xl font-bold hover:scale-105">
              Sign in
            </Button>
          </Link>
        )}
        {token ? (
          <Button
            className="p-6 rounded-xl font-bold hover:scale-105"
            onClick={handleDashboard}
          >
            Dashboard
          </Button>
        ) : (
          <AuthDialog />
        )}
      </div>
    </div>
  );
};

export default Header;
