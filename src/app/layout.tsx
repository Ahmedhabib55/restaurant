import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import React from "react";
import { StoreProvider } from "@/context/store";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tutlab ay",
  description:
    "Tutlab ay is a platform for ordering food and drinks, enjoy your meal!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
