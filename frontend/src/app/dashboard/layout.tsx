"use client";

import Footer from "@/components/Footer";
import LayoutComp from "@/components/LayoutComp";
import UserHeader from "@/components/UserHeader";
import { UserProvider } from "@/contexts/UserContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutComp>
      <UserProvider>
        <UserHeader />
        {children}
        <Footer />
      </UserProvider>
    </LayoutComp>
  );
}
