'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [selectedDesign, setSelectedDesign] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);

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

  // alt 텍스트를 위한 변수
  const imageAlt = product ? `${product.title} 상품 사진` : '상품 사진';

  // product/3이 아닌 경우 "존재하지 않는 상세페이지" 메시지 표시
  if (productId !== '3') {
    return (
      <div className="p-4 h-screen" style={{backgroundColor: '#ECF3FF'}}>
        <div className=" rounded-2xl flex items-center justify-center  bg-white h-full">
          <h1 className="text-3xl font-bold mb-6">양말 제품이 존재하지 않는 상세페이지에요</h1>
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
          <h1 className="text-3xl font-bold mb-6 text-center">
            {product.title} ({product.price}) / {selectedDesign} / {selectedColor}<br/>
            제품을 구매했어요!
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
              <div>
                <label htmlFor="design-select" className="block text-sm font-medium mb-2">디자인</label>
                <select
                  id="design-select"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  aria-required="true"
                >
                  <option style={{display: 'none'}}
                  value="">디자인 선택</option>
                  <option value="땡땡이">땡땡이</option>
                  <option value="줄무늬">줄무늬</option>
                </select>
              </div>

              <div>
                <label htmlFor="color-select" className="block text-sm font-medium mb-2">색상</label>
                <select
                  id="color-select"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  aria-required="true"
                >
                  <option value="" style={{display: 'none'}}>색상 선택</option>
                  <option value="네이비 / 아이보리">네이비 / 아이보리</option>
                  <option value="멀티 컬러 (옐로우)">멀티 컬러 (옐로우)</option>
                  <option value="멀티 컬러 (그린)">멀티 컬러 (그린)</option>
                  <option value="멀티 컬러 (핑크)">멀티 컬러 (핑크)</option>
                </select>
              </div>
            </fieldset>

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