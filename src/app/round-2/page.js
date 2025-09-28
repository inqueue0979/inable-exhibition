'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Round2HomePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    router.push('/round-2/login');
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push('/round-2/login');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100" style={{height: 'calc(100vh - 64px)'}}>
      <div className="container mx-auto pt-4 h-full flex flex-col justify-between">
        {/* 메인 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">WEBridge</h1>
          <p className="text-xl text-gray-600 mb-8">효율적인 웹 접근성 자가 진단 솔루션</p>

          {/* 솔루션 버튼들 */}
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={handleButtonClick} className="transition-transform hover:scale-105">
              <Image
                src="/button-1.png"
                alt="솔루션 버튼 1"
                width={120}
                height={60}
                className="rounded-lg shadow-md"
              />
            </button>

            <button onClick={handleButtonClick} className="transition-transform hover:scale-105">
              <Image
                src="/button-2.png"
                alt="솔루션 버튼 2"
                width={120}
                height={60}
                className="rounded-lg shadow-md"
              />
            </button>

            <button onClick={handleButtonClick} className="transition-transform hover:scale-105">
              <Image
                src="/button-3.png"
                alt="솔루션 버튼 3"
                width={120}
                height={60}
                className="rounded-lg shadow-md"
              />
            </button>

            <button onClick={handleButtonClick} className="transition-transform hover:scale-105">
              <Image
                src="/button-4.png"
                alt="솔루션 버튼 4"
                width={120}
                height={60}
                className="rounded-lg shadow-md"
              />
            </button>

            <button onClick={handleButtonClick} className="transition-transform hover:scale-105">
              <Image
                src="/button-5.png"
                alt="솔루션 버튼 5"
                width={120}
                height={60}
                className="rounded-lg shadow-md"
              />
            </button>
          </div>
        </div>

        {/* 하단 목업 이미지 */}
        <div className="mt-6 flex justify-center">
          <div className="w-4/5">
            <Image
              src="/webridge-mockup.png"
              alt="WEBridge 목업 이미지"
              width={800}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-8">
            <div className="bg-white rounded-lg p-12 max-w-md mx-8 relative shadow-2xl">
              {/* X 닫기 버튼 */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-6">알림</h3>
                <p className="text-gray-600 text-lg">로그인 후 이용 가능합니다</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}