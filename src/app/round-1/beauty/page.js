'use client';

import { useEffect, useRef } from 'react';

export default function BabyPage() {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, []);

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
          양말 제품이 존재하지 않는 메뉴예요
        </h1>
      </div>
    </div>
  );
}