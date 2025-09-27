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
      title: "패션 아이템 2",
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
      <div className="rounded-2xl bg-white p-6 mb-4" style={{height: '45%'}}>
        <div className="flex gap-8 h-full">
          {/* 왼쪽 - 상품 이미지 */}
          <div className="flex-1">
            <div className="aspect-square rounded-lg overflow-hidden">
              {product.imageSrc ? (
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full"></div>
              )}
            </div>
          </div>

          {/* 오른쪽 - 상품 정보 */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-3xl font-bold text-blue-600">{product.price}</p>

            {/* 옵션 선택 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">디자인</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                >
                  <option style={{display: 'none'}}
                  value="">디자인 선택</option>
                  <option value="땡땡이">땡땡이</option>
                  <option value="줄무늬">줄무늬</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">색상</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="" style={{display: 'none'}}>색상 선택</option>
                  <option value="네이비 / 아이보리">네이비 / 아이보리</option>
                  <option value="멀티 컬러 (옐로우)">멀티 컬러 (옐로우)</option>
                  <option value="멀티 컬러 (그린)">멀티 컬러 (그린)</option>
                  <option value="멀티 컬러 (핑크)">멀티 컬러 (핑크)</option>
                </select>
              </div>
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
            >
              구매하기
            </button>
          </div>
        </div>
      </div>

      {/* 하단 섹션 - 상세 이미지 */}
      <div className="rounded-2xl bg-white p-6" style={{height: '50%'}}>
        <h2 className="text-xl font-bold mb-6">상세 이미지</h2>

        <div className="space-y-4 overflow-auto" style={{height: 'calc(100% - 3rem)'}}>
          {/* OPTION 01 이미지 */}
          <div className="w-1/2 aspect-square rounded-lg mx-auto overflow-hidden">
            <Image
              src="/round1_3_1.png"
              alt="양말 상세 이미지 1"
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>

          {/* OPTION 02 이미지 */}
          <div className="w-1/2 aspect-square rounded-lg mx-auto overflow-hidden">
            <Image
              src="/round1_3_2.png"
              alt="양말 상세 이미지 2"
              width={400}
              height={400}
              className="w-full h-full  object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}