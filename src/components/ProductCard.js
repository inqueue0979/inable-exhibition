'use client';

import Image from 'next/image';

export default function ProductCard({ title, price, rating, reviewCount, altText, onClick, imageSrc }) {
  const handleClick = () => {
    if (onClick) {
      onClick({ title, price, rating, reviewCount });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="flex-1 border border-gray-300 rounded-lg p-4 bg-white h-3/4 flex flex-col cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={altText || `${title} 상품 카드. 가격 ${price}, 평점 ${rating}점, 리뷰 ${reviewCount}개`}
    >
      <div className="aspect-square rounded-lg mb-4 overflow-hidden" aria-hidden="true">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full"></div>
        )}
      </div>
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      <p className="text-blue-600 font-medium text-md mb-2">{price}</p>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">평점 {rating}/5</span>
        <span className="text-gray-600 text-sm">리뷰({reviewCount})</span>
      </div>
    </div>
  );
}