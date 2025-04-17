import type { Metadata } from "next";
import { UserProvider } from "@/contexts/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team-3 | BuyMeCoffee",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
