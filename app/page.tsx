import Image from 'next/image';

export default function AcornsLanding() {
  return (
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Acorns helps you <br /> grow your money
          </h1>
          <p className="text-gray-600 mb-6">
            Take control with all-in-one investment, retirement, checking, and more.
          </p>
          <a
            href="#"
            className="px-6 py-3 bg-green-500 text-white font-medium text-lg rounded-lg hover:bg-green-600 transition"
          >
            Get started
          </a>
        </div>

        {/* Right Content */}
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-green-100 rounded-full"></div>
          <Image
            src="/banking.jpg"
            alt="Acorns Mobile"
            width={800}
            height={533}
            className="relative z-10 mx-auto"
          />
        </div>
      </div>
  );
}
