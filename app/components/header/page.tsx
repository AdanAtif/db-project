'use client';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="text-lg font-semibold text-gray-800">Acorns</span>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <a href="#" className="hover:text-gray-900">Transfer</a>
            <a href="#" className="hover:text-gray-900">Deposit</a>
            <a href="#" className="hover:text-gray-900">WithDrawal</a>
          </nav>
          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">SignUp</a>
            <a
              href="#"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            >
             Log in
            </a>
          </div>
        </div>
      </header>
  );
}

