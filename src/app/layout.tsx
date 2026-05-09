import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReferralCapture } from "@/components/ReferralCapture";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bain Squared — AI Automation Assessment",
  description: "Find out where AI automation fits your business and what to do first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-canvas text-text-primary font-sans">
        <ReferralCapture />
        {children}
      </body>
    </html>
  );
}
