"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [altText, setAltText] = useState("");
  const [evaluationState, setEvaluationState] = useState("input"); // "input" | "evaluating" | "result" | "history"
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const images = useMemo(() => [
    { src: "/alttext_1.png", alt: "대체텍스트 예시 이미지 1" },
    { src: "/alttext_2.png", alt: "대체텍스트 예시 이미지 2" },
    { src: "/alttext_3.png", alt: "대체텍스트 예시 이미지 3" }
  ], []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // 이미지를 base64로 변환하는 함수
  const imageToBase64 = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('이미지 변환 오류:', error);
      return null;
    }
  };

  // 히스토리 조회 함수
  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiBaseUrl}/history?limit=50&offset=0`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // 현재 이미지와 같은 이미지 데이터를 가진 기록들만 필터링
      const currentImageBase64 = await imageToBase64(images[currentImageIndex].src);
      const filteredHistory = data.history.filter(item =>
        item.image_data === currentImageBase64
      );

      setHistoryData(filteredHistory);
    } catch (error) {
      console.error('히스토리 조회 오류:', error);
      alert('히스토리 조회 중 오류가 발생했습니다. 서버가 실행 중인지 확인해 주세요.');
    } finally {
      setHistoryLoading(false);
    }
  }, [currentImageIndex, images]);

  // 이미지가 변경되고 히스토리 상태일 때 히스토리를 다시 불러오기
  useEffect(() => {
    if (evaluationState === "history") {
      fetchHistory();
    }
  }, [currentImageIndex, evaluationState, fetchHistory]);

  // 대체텍스트 평가 API 호출 함수
  const evaluateAltText = async () => {
    if (!altText.trim()) {
      alert('대체텍스트를 입력해 주세요.');
      return;
    }

    setEvaluationState("evaluating");

    try {
      // 현재 이미지를 base64로 변환
      const imageBase64 = await imageToBase64(images[currentImageIndex].src);

      if (!imageBase64) {
        throw new Error('이미지 변환에 실패했습니다.');
      }

      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alt_text: altText,
          image_data: imageBase64
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setEvaluationResult(result);
      setEvaluationState("result");
    } catch (error) {
      console.error('평가 오류:', error);
      alert('평가 중 오류가 발생했습니다. 서버가 실행 중인지 확인해 주세요.');
      setEvaluationState("input");
    }
  };
  return (
   <section className="min-h-screen bg-gradient-to-b from-[#ECF3FF] to-white">
    <Navbar />

    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* 좌측 텍스트 섹션 */}
        <div className="space-y-8">
          {evaluationState === "input" && (
            <>
              {/* 메인 헤딩 */}
              <div className="space-y-4">
                <p className="text-2xl font-bold text-gray-800 leading-10">
                  이미지에 설명이 없다면<br />
                  시각장애인은 내용을 알 수 없어요.
                  <br /><br />
                  웹 사이트를 만들 때에는 <br />
                  <span className=" underline">모두가 이해할 수 있도록,</span> <br />
                  모든 이미지에 &apos;대체텍스트&apos;를 넣어야 해요.
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
            </>
          )}

          {evaluationState === "evaluating" && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-xl font-semibold text-gray-800">
                  WEBridge 대체텍스트 AI가<br />
                  입력하신 대체텍스트의 적절성을 검사 중이에요
                </p>
              </div>
            </div>
          )}

          {evaluationState === "result" && evaluationResult && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                평가 결과
              </h2>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">적절성 평가</h3>
                  <p className="text-gray-800 font-medium">{evaluationResult.grade}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">평가 이유</h3>
                  <p className="text-gray-700">{evaluationResult.reason}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">WEBridge AI 제안</h3>
                  <p className="text-gray-700">{evaluationResult.improvement}</p>
                </div>
              </div>

              <div className="text-center space-x-4">
                <button
                  onClick={() => {
                    if (evaluationState === "history") {
                      setEvaluationState("result");
                    } else {
                      setEvaluationState("history");
                      fetchHistory();
                    }
                  }}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    evaluationState === "history"
                      ? "bg-gray-700 text-white hover:bg-gray-800"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  히스토리
                </button>
                <button
                  onClick={() => {
                    setEvaluationState("input");
                    setEvaluationResult(null);
                    setAltText("");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  다시 평가하기
                </button>
              </div>
            </div>
          )}

          {evaluationState === "history" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                현재 이미지의 대체텍스트 생성 히스토리
              </h2>

              {historyLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">히스토리를 불러오는 중...</span>
                </div>
              ) : historyData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">현재 이미지에 대한 히스토리가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {historyData.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-blue-600">
                          평가 #{historyData.length - index}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleString('ko-KR')}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">입력된 대체텍스트</h4>
                          <p className="text-gray-800 bg-gray-50 p-3 rounded border text-sm">
                            {item.alt_text}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-1 text-sm">이미지 유형</h4>
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {item.image_type}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-1 text-sm">적절성 평가</h4>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              item.compliant === 0 ? 'bg-green-100 text-green-800' :
                              item.compliant === 1 ? 'bg-yellow-100 text-yellow-800' :
                              item.compliant === 2 ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.grade}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-1 text-sm">평가 이유</h4>
                          <p className="text-gray-600 text-xs">{item.reason}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-1 text-sm">WEBridge AI 제안</h4>
                          <p className="text-gray-600 text-xs">{item.improvement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center space-x-4">
                <button
                  onClick={() => {
                    setEvaluationState("result");
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  평가 결과 보기
                </button>
                <button
                  onClick={() => setEvaluationState("input")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  새로운 평가하기
                </button>
              </div>
            </div>
          )}
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
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
            <button
              onClick={evaluateAltText}
              className="bg-blue-600 text-sm font-semibold text-white w-24 px-1 py-2 rounded-md hover:bg-blue-700"
            >
              입력하기
            </button>
          </div>
        </div>
      </div>
    </main>

   </section>
  );
}
