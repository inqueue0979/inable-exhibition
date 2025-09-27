'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // 의도적으로 로그인 실패하도록 설정
    setShowError(true);
    setTimeout(() => {
      alert('로그인에 싪패했습니다. 비밀번호를 정확하게 입력해주세요.');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* 로그인 폼 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">WEBridge</h1>
            <p className="text-gray-600">로그인</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이디
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                tabIndex={-1}
                required
              />
            </div>

            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>

          {/* 하단 링크들 */}
          <div className="text-center mt-6">
            <div className="flex justify-center gap-4 text-sm">
              <a href="#" className="text-blue-600 hover:underline">아이디 찾기</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-blue-600 hover:underline">비밀번호 찾기</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-blue-600 hover:underline">회원가입</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}