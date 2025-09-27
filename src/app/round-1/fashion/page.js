'use client';

import { useRouter } from 'next/navigation';
import ProductCard from "@/components/ProductCard";

export default function BabyPage() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      title: "코멧 UV 99.9% 자외선(UV) 차단 초경량 5단 미니 우산 양산 겸용 + 커버포함",
      price: "8,850원",
      rating: "4.3",
      reviewCount: "1,301",
      altText: "코멧 UV 차단 미니 우산 상품 보기",
      imageSrc: "/round1_1.png"
    },
    {
      id: 2,
      title: "베나인 여성 가죽 포켓 반지갑",
      price: "35,000원",
      rating: "3.5",
      reviewCount: "220",
      altText: "베나인 여성 가죽 포켓 반지갑 상품 보기",
      imageSrc: "/round1_2.png"
    },
    {
      id: 3,
      title: "줄무늬 여성 양말 시리즈 세트",
      price: "9,000원",
      rating: "3.9",
      reviewCount: "13",
      altText: "패션 아이템 3 상품 보기",
      imageSrc: "/round1_3.png"
    }
  ];

  const handleProductClick = (product) => {
    router.push(`/round-1/fashion/product/${product.id}`);
  };

  return (
    <div className="p-4 h-screen" style={{backgroundColor: '#ECF3FF'}}>
      <div className=" rounded-2xl flex items-center justify-center  h-full bg-white">
        <div className="flex gap-6 h-full items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              reviewCount={product.reviewCount}
              altText={product.altText}
              imageSrc={product.imageSrc}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}