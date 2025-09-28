"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/alttext_1.png", alt: "대체텍스트 예시 이미지 1" },
    { src: "/alttext_1.png", alt: "대체텍스트 예시 이미지 2" },
    { src: "/alttext_1.png", alt: "대체텍스트 예시 이미지 3" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
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
          {/* 프로그레스 바 */}
          <div className="flex justify-end mb-4">
            <div className="flex gap-1 w-1/3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                  aria-label={`이미지 ${index + 1}번으로 이동`}
                />
              ))}
            </div>
          </div>

          {/* 성동구 홈페이지 검색창 더미 UI */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-4 justify-between">
              <div className="flex items-center justify-center mb-1">
              <h3 className="text-2xl font-semibold text-gray-800 mr-4">성동구 홈페이지</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="flex-1 px-4 py-3 rounded-md focus:outline-none ring-1 ring-blue-700 pointer-events-none"
                  disabled
                  readOnly
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md pointer-events-none"
                  disabled
                >
                  검색
                </button>
              </div>
            </div>
          </div>
          <div className="mb-2 border-b-1 border-black mx-0 px-0" />
            {/* 대체텍스트 부분 사진 팝업 */}
            <div className=" p-4">
              <div className="flex items-center justify-between">
                <div className="ml-4">
                  <div className="bg-gray-200 p-4 rounded-2xl">
                    <Image
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      width={1000}
                      height={1000}
                      className="object-contain shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <button
                  onClick={prevImage}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="이전 이미지"
                >
                  이전
                </button>
                <span className="text-sm text-gray-600 mx-2">|</span>
                <button
                  onClick={nextImage}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="다음 이미지"
                >
                  다음
                </button>
              </div>
            </div>
          </div>

          {/* 대체텍스트 입력 영역 */}
          <div className=" justify-between gap-4 flex">
            <textarea
              placeholder="적절한 대체텍스트를 입력해 주세요."
              className="w-full px-4 py-3 rounded-md outline-none border-2 border-blue-500 h-12 resize-none"
            />
            <button className="bg-blue-600 text-sm font-semibold text-white w-24 px-1 py-2 rounded-md hover:bg-blue-700">
              입력하기
            </button>
          </div>
        </div>
      </div>
    </main>
   </section>
  );
}
