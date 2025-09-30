import "../globals.css";
import Navbar_AltText from "@/components/Navbar_round1";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "이너블 - 탭 이동 및 스크린리더 체험",
  description: "정보의 바다에서 누구나 자유로이 헤엄칠 수 있도록",
};

export default function Round1Layout({ children }) {
  return (
    <>
      <Navbar_AltText />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}
