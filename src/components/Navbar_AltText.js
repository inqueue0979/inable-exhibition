import Link from 'next/link';
import Image from 'next/image';

export default function Navbar_AltText() {
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/alt-text"
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
        </div>
      </div>
    </nav>
  );
}