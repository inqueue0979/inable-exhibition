'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 의도적으로 로그인 실패하도록 설정
    setShowError(true);
    setShowModal(true);
    // 포커스를 버튼에서 제거
    e.target.blur();
  };

  const closeModal = () => {
    setShowModal(false);
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

          <div className="space-y-2">
            <form onSubmit={handleLogin} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
            </form>

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
                onFocus={(e) => e.target.blur()}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>

            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
              </div>
            )}
          </div>

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
                <h3 className="text-xl font-bold text-gray-800 mb-6">로그인 실패</h3>
                <p className="text-gray-600 text-lg">로그인에 실패했습니다!<br/>비밀번호를 입력해 주세요</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}