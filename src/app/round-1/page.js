'use client';

import { useEffect, useRef } from 'react';

export default function BabyPage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <div className="p-4 h-screen" style={{backgroundColor: '#ECF3FF'}}>
      <div className=" rounded-2xl flex items-center justify-center  h-full">
        <div className=" text-center">
          <h1
            ref={titleRef}
            className="text-5xl font-bold mb-6"
            tabIndex={0}
            aria-live="polite"
          >
            접근성 체험 게임 1라운드
          </h1>
          <h2
            ref={subtitleRef}
            className="text-3xl font-normal mb-6"
            tabIndex={0}
            aria-live="polite"
          >
            <span className=" font-semibold">9000원짜리 노란색 줄무늬 양말</span> 구매하기
          </h2>
        </div>
      </div>
    </div>
  );
}