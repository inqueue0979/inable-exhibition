'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [selectedDesign, setSelectedDesign] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [focusedDesignIndex, setFocusedDesignIndex] = useState(-1);
  const [focusedColorIndex, setFocusedColorIndex] = useState(-1);
  const messageRef = useRef(null);
  const designSelectRef = useRef(null);
  const colorSelectRef = useRef(null);

  // 임시 상품 데이터 (실제로는 API나 데이터베이스에서 가져올 것)
  const productData = {
    1: {
      title: "코멧 UV 99.9% 자외선(UV) 차단 초경량 5단 미니 우산 양산 겸용 + 커버포함",
      price: "29,900원",
      rating: "4.2",
      reviewCount: "128",
      imageSrc: "/round1_1.png"
    },
    2: {
      title: "베나인 여성 가죽 포켓 반지갑",
      price: "45,000원",
      rating: "4.8",
      reviewCount: "95",
      imageSrc: "/round1_2.png"
    },
    3: {
      title: "줄무늬 여성 양말 시리즈 세트",
      price: "9,000원",
      rating: "3.9",
      reviewCount: "13",
      imageSrc: "/round1_3.png"
    }
  };

  const product = productData[productId];

  // 옵션 데이터
  const designOptions = ['땡땡이', '줄무늬'];
  const colorOptions = ['네이비 / 아이보리', '멀티 컬러 (옐로우)', '멀티 컬러 (그린)', '멀티 컬러 (핑크)'];

  // alt 텍스트를 위한 변수
  const imageAlt = product ? `${product.title} 상품 사진` : '상품 사진';

  // 메시지가 표시될 때 포커스 설정
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [productId, isPurchased]);

  // 외부 클릭 시 셀렉트 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (designSelectRef.current && !designSelectRef.current.contains(event.target)) {
        setIsDesignOpen(false);
        setFocusedDesignIndex(-1);
      }
      if (colorSelectRef.current && !colorSelectRef.current.contains(event.target)) {
        setIsColorOpen(false);
        setFocusedColorIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 키보드 이벤트 핸들러
  const handleDesignKeyDown = (e) => {
    // 디버깅용 로그 (개발 중에만 사용)
    console.log('Design KeyDown:', e.key, e.code, e.which, e.keyCode);

    // 스페이스바나 엔터키로 열기/선택
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar' || e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      if (!isDesignOpen) {
        setIsDesignOpen(true);
        setFocusedDesignIndex(0);
      } else if (focusedDesignIndex >= 0) {
        setSelectedDesign(designOptions[focusedDesignIndex]);
        setIsDesignOpen(false);
        setFocusedDesignIndex(-1);
      }
    }
    // 탭으로 옵션 순환 (열린 상태에서만)
    else if (e.key === 'Tab' && isDesignOpen) {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: 역방향
        setFocusedDesignIndex((prev) => (prev - 1 + designOptions.length) % designOptions.length);
      } else {
        // Tab: 순방향
        setFocusedDesignIndex((prev) => (prev + 1) % designOptions.length);
      }
    }
    // 방향키로도 순환 (윈도우 접근성 표준)
    else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && isDesignOpen) {
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        setFocusedDesignIndex((prev) => (prev + 1) % designOptions.length);
      } else {
        setFocusedDesignIndex((prev) => (prev - 1 + designOptions.length) % designOptions.length);
      }
    }
    // ESC로 닫기
    else if (e.key === 'Escape') {
      setIsDesignOpen(false);
      setFocusedDesignIndex(-1);
    }
  };

  const handleColorKeyDown = (e) => {
    // 디버깅용 로그 (개발 중에만 사용)
    console.log('Color KeyDown:', e.key, e.code, e.which, e.keyCode);

    // 스페이스바나 엔터키로 열기/선택
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar' || e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      if (!isColorOpen) {
        setIsColorOpen(true);
        setFocusedColorIndex(0);
      } else if (focusedColorIndex >= 0) {
        setSelectedColor(colorOptions[focusedColorIndex]);
        setIsColorOpen(false);
        setFocusedColorIndex(-1);
      }
    }
    // 탭으로 옵션 순환 (열린 상태에서만)
    else if (e.key === 'Tab' && isColorOpen) {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: 역방향
        setFocusedColorIndex((prev) => (prev - 1 + colorOptions.length) % colorOptions.length);
      } else {
        // Tab: 순방향
        setFocusedColorIndex((prev) => (prev + 1) % colorOptions.length);
      }
    }
    // 방향키로도 순환 (윈도우 접근성 표준)
    else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && isColorOpen) {
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        setFocusedColorIndex((prev) => (prev + 1) % colorOptions.length);
      } else {
        setFocusedColorIndex((prev) => (prev - 1 + colorOptions.length) % colorOptions.length);
      }
    }
    // ESC로 닫기
    else if (e.key === 'Escape') {
      setIsColorOpen(false);
      setFocusedColorIndex(-1);
    }
  };

  // product/3이 아닌 경우 "존재하지 않는 상세페이지" 메시지 표시
  if (productId !== '3') {
    return (
      <div className="p-4 h-screen" style={{backgroundColor: '#ECF3FF'}}>
        <div className=" rounded-2xl flex items-center justify-center  bg-white h-full">
          <h1
            ref={messageRef}
            className="text-3xl font-bold mb-6"
            tabIndex={0}
            aria-live="polite"
            role="alert"
          >
            양말 제품이 존재하지 않는 상세페이지에요
          </h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handlePurchase = () => {
    if (selectedDesign && selectedColor) {
      setIsPurchased(true);
    }
  };

  if (isPurchased) {
    return (
      <div className="p-4 h-screen" style={{backgroundColor: '#ECF3FF'}}>
        <div className="rounded-2xl flex items-center justify-center bg-white h-full">
          <h1
            ref={messageRef}
            className="text-3xl font-bold mb-6 text-center"
            tabIndex={0}
            aria-live="polite"
            role="alert"
          >
            {product.title} ({product.price}) / {selectedDesign} / {selectedColor} 제품을 구매했어요! 
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{backgroundColor: '#ECF3FF'}}>
      {/* 상단 섹션 - 메인 상품 정보 */}
      <section className="rounded-2xl bg-white p-6 mb-4" style={{height: '45%'}} role="region" aria-labelledby="product-info">
        <div className="flex gap-8 h-full">
          {/* 왼쪽 - 상품 이미지 */}
          <div className="flex-1">
            <div className="aspect-square rounded-lg overflow-hidden" role="img" aria-labelledby="main-product-image">
              <h2 id="main-product-image" className="sr-only">메인 상품 이미지</h2>
              {product.imageSrc ? (
                <Image
                  src={product.imageSrc}
                  alt={imageAlt}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  tabIndex={0}
                  role="img"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full" role="img" aria-label="상품 이미지 없음" tabIndex={0}></div>
              )}
            </div>
          </div>

          {/* 오른쪽 - 상품 정보 */}
          <div className="flex-1 space-y-6">
            <header>
              <h1 id="product-info" className="text-2xl font-bold" tabIndex={0}>{product.title}</h1>
              <div className="text-3xl font-bold text-blue-600" role="text" tabIndex={0}>
                <span className="sr-only">상품 가격: </span>
                <span aria-label={`가격 ${product.price}`}>{product.price}</span>
              </div>
            </header>

            {/* 옵션 선택 */}
            <fieldset className="space-y-4">
              <legend className="sr-only">상품 옵션 선택</legend>

              {/* 디자인 선택 */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">디자인</label>
                <div
                  ref={designSelectRef}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  tabIndex={0}
                  role="combobox"
                  aria-expanded={isDesignOpen}
                  aria-haspopup="listbox"
                  aria-controls="design-listbox"
                  aria-activedescendant={isDesignOpen && focusedDesignIndex >= 0 ? `design-option-${focusedDesignIndex}` : undefined}
                  aria-required="true"
                  aria-label={`디자인 선택. ${selectedDesign ? `현재 선택: ${selectedDesign}` : '선택되지 않음'}`}
                  onKeyDown={handleDesignKeyDown}
                  onKeyUp={(e) => {
                    // 일부 윈도우 환경에서 keyup으로 처리되는 경우 대비
                    if ((e.key === ' ' || e.key === 'Enter') && !isDesignOpen) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onClick={() => setIsDesignOpen(!isDesignOpen)}
                >
                  {selectedDesign || '디자인 선택'}
                  <span className="float-right">▼</span>
                </div>
                {isDesignOpen && (
                  <ul
                    id="design-listbox"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                    role="listbox"
                    aria-label="디자인 옵션"
                  >
                    {designOptions.map((option, index) => (
                      <li
                        key={option}
                        id={`design-option-${index}`}
                        className={`p-2 cursor-pointer hover:bg-blue-100 ${
                          index === focusedDesignIndex ? 'bg-blue-200' : ''
                        } ${selectedDesign === option ? 'bg-blue-50 font-medium' : ''}`}
                        role="option"
                        aria-selected={selectedDesign === option}
                        aria-label={`${option}${selectedDesign === option ? ', 선택됨' : ''}`}
                        onClick={() => {
                          setSelectedDesign(option);
                          setIsDesignOpen(false);
                          setFocusedDesignIndex(-1);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 색상 선택 */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">색상</label>
                <div
                  ref={colorSelectRef}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  tabIndex={0}
                  role="combobox"
                  aria-expanded={isColorOpen}
                  aria-haspopup="listbox"
                  aria-controls="color-listbox"
                  aria-activedescendant={isColorOpen && focusedColorIndex >= 0 ? `color-option-${focusedColorIndex}` : undefined}
                  aria-required="true"
                  aria-label={`색상 선택. ${selectedColor ? `현재 선택: ${selectedColor}` : '선택되지 않음'}`}
                  onKeyDown={handleColorKeyDown}
                  onKeyUp={(e) => {
                    // 일부 윈도우 환경에서 keyup으로 처리되는 경우 대비
                    if ((e.key === ' ' || e.key === 'Enter') && !isColorOpen) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onClick={() => setIsColorOpen(!isColorOpen)}
                >
                  {selectedColor || '색상 선택'}
                  <span className="float-right">▼</span>
                </div>
                {isColorOpen && (
                  <ul
                    id="color-listbox"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                    role="listbox"
                    aria-label="색상 옵션"
                  >
                    {colorOptions.map((option, index) => (
                      <li
                        key={option}
                        id={`color-option-${index}`}
                        className={`p-2 cursor-pointer hover:bg-blue-100 ${
                          index === focusedColorIndex ? 'bg-blue-200' : ''
                        } ${selectedColor === option ? 'bg-blue-50 font-medium' : ''}`}
                        role="option"
                        aria-selected={selectedColor === option}
                        aria-label={`${option}${selectedColor === option ? ', 선택됨' : ''}`}
                        onClick={() => {
                          setSelectedColor(option);
                          setIsColorOpen(false);
                          setFocusedColorIndex(-1);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </fieldset>

            {/* 스크린리더용 라이브 영역 */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {isDesignOpen && focusedDesignIndex >= 0 && (
                `디자인 옵션: ${designOptions[focusedDesignIndex]}`
              )}
              {isColorOpen && focusedColorIndex >= 0 && (
                `색상 옵션: ${colorOptions[focusedColorIndex]}`
              )}
            </div>

            {/* 구매하기 버튼 */}
            <button
              onClick={handlePurchase}
              disabled={!selectedDesign || !selectedColor}
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                selectedDesign && selectedColor
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-describedby="purchase-requirements"
            >
              구매하기
            </button>
            <div id="purchase-requirements" className="sr-only">
              {!selectedDesign || !selectedColor
                ? '구매하려면 디자인과 색상을 모두 선택해주세요.'
                : '구매 가능한 상태입니다.'}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 섹션 - 상세 이미지 */}
      <section className="rounded-2xl bg-white p-6" style={{height: '50%'}} role="region" aria-labelledby="product-details">
        <h2 id="product-details" className="text-xl font-bold mb-6">상세 이미지</h2>

        <div className="space-y-4 overflow-auto" style={{height: 'calc(100% - 3rem)'}} role="list" aria-label="상품 옵션별 상세 이미지">
          {/* OPTION 01 이미지 */}
          <div className="w-1/2 aspect-square rounded-lg mx-auto overflow-hidden" role="listitem">
            <h3 className="sr-only">옵션 1: 네이비/아이보리 4족 세트</h3>
            <Image
              src="/round1_3_1.png"
              alt="옵션1. 네이비/아이보리 4족 세트 - 모델이 아이보리 바탕에 네이비 줄무늬가 있는 디자인의 양말을 신고 있는 모습"
              width={400}
              height={400}
              className="w-full h-full object-contain"
              tabIndex={0}
            />
          </div>

          {/* OPTION 02 이미지 */}
          <div className="w-1/2 aspect-square rounded-lg mx-auto overflow-hidden" role="listitem">
            <h3 className="sr-only">옵션 2: 멀티컬러 4족 세트</h3>
            <Image
              src="/round1_3_2.png"
              alt="옵션2. 멀티컬러 4족 세트 - 모델이 아이보리 바탕에 빨간색 줄무늬, 네이비 고무단 디자인의 양말을 신고 있는 모습"
              width={400}
              height={400}
              className="w-full h-full object-contain"
              tabIndex={0}
            />
          </div>
        </div>
      </section>
    </div>
  );
}