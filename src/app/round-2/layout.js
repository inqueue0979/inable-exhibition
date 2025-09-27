import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar_round2 from "@/components/Navbar_round2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WEBridge - 웹 접근성 미준수 체험",
  description: "웹 접근성이 준수되지 않은 사이트 체험",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar_round2 />
        {children}
      </body>
    </html>
  );
}