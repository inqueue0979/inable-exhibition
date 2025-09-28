import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata = {
  title: "이너블 - 대체텍스트 체험",
  description: "정보의 바다에서 누구나 자유로이 헤엄칠 수 있도록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} antialiased font-pretendard`}
      >
        {children}
      </body>
    </html>
  );
}
