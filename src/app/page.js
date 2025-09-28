import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <section className="min-h-screen bg-gradient-to-b from-[#ECF3FF] to-white">
    <Navbar />

    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* 좌측 텍스트 섹션 */}
        <div className="space-y-8">
          {/* 메인 헤딩 */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-gray-800 leading-10">
              이미지에 설명이 없다면<br />
              시각장애인은 내용을 알 수 없어요.
              <br /><br />
              웹 사이트를 만들 때에는 <br />
              <span className=" underline">모두가 이해할 수 있도록,</span> <br />
              모든 이미지에 ‘대체텍스트’를 넣어야 해요.
            </p>
          </div>

          {/* 대체텍스트 입력 방법 박스 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
              대체텍스트 입력 방법
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                모바일에 이미지의 의미를 중심으로 설명하는 것이 좋아요.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                이미지의 용도를 중심으로에 간단할 수 있도록 작성해야 해요.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                중복 정보를 피하고 간단 명료하게 제공하는 것이 좋아요.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                이미지가 위치한 맥락을 고려해서 설명을 작성해야 해요.
              </li>
            </ul>
          </div>
        </div>

        {/* 우측 컨텐츠 섹션 */}
        <div className="space-y-6">
          {/* 성동구 홈페이지 검색창 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">성동구 홈페이지</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                검색
              </button>
            </div>
          </div>

          {/* 광고 배너 */}
          <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  모바일 주민등록증 발급 안내
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-amber-700 text-white px-3 py-1 rounded inline-block">
                    3월 14일부터 서울시 발급 시작
                  </div>
                  <p className="text-gray-700">
                    ※ 성동구 주민등록 성동구에서만 발급한 신분 서류로 발급 가능
                  </p>
                  <div className="bg-amber-700 text-white px-3 py-1 rounded inline-block">
                    3월 28일부터 전국 마이나라 발급 가능
                  </div>
                  <p className="text-gray-700">
                    발급방법: 17세 이상 주민등록증을 발급받은 사람 중 희망자
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <Image
                  src="/메인 페이지.jpg"
                  alt="모바일 주민등록증 발급 안내 일러스트"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              <span className="text-sm text-gray-600">이번 1 다음</span>
            </div>
          </div>

          {/* 피드백 입력 영역 */}
          <div className="space-y-4">
            <textarea
              placeholder="의견과 대체텍스트를 입력해 주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                입력하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
   </section>
  );
}
