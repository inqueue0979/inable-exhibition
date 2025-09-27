'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: '뷰티', path: '/round-1/beauty' },
  { name: '출산/유아동', path: '/round-1/baby' },
  { name: '식품', path: '/round-1/food' },
  { name: '패션잡화', path: '/round-1/fashion' },
  { name: '문구/오피스', path: '/round-1/office' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-xs font-normal mb-2 mt-6 ml-1">메뉴</h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.path}
              href={category.path}
              className={`block px-3 py-2 rounded-md text-sm font-semibold transition-colors border-1 border-gray-700 ${
                pathname === category.path
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}