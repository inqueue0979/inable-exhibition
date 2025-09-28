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
  title: "이너블 - 웹 접근성 미준수 체험",
  description: "정보의 바다에서 누구나 자유로이 헤엄칠 수 있도록",
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