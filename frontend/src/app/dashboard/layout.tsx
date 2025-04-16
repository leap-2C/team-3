"use client";

import Footer from "@/components/Footer";
import LayoutComp from "@/components/LayoutComp";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutComp>
      {children}
      <Footer />
    </LayoutComp>
  );
}
