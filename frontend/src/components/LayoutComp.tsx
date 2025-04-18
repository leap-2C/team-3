import { ToastContainer } from "react-toastify";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { UserProvider } from "@/contexts/UserContext";

const manRope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-wrk-sans",
});

export default function LayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={manRope.variable}>
      <UserProvider>{children}</UserProvider>
      <ToastContainer />
    </div>
  );
}
