"use client";

import Footer from "@/components/Footer";
import LayoutComp from "@/components/LayoutComp";
import { UserProvider } from "@/contexts/UserContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutComp>
      <UserProvider>
        {children}
        <Footer />
      </UserProvider>
    </LayoutComp>
  );
}
