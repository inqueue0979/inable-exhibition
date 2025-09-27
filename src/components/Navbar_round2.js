import Link from 'next/link';
import Image from 'next/image';

export default function Navbar_round2() {
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/round-2"
            className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={36}
                height={36}
                className="h-8 w-auto mr-2"
              />
              <p className=' font-bold text-2xl'>WEBridge</p>
            </Link>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/round-2/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}