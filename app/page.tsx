// import Image from 'next/image';
// import { FaGraduationCap, FaPiggyBank, FaChartLine, FaHandHoldingUsd } from 'react-icons/fa';

// export default function AcornsLanding() {
//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
//             <FaGraduationCap className="mr-2" />
//             <span className="text-sm font-medium">Financial Learning Platform</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//             Learn Banking Fundamentals <br /> with <span className="text-blue-600">NIIT Bank</span>
//           </h1>
//           <p className="text-lg text-gray-600 mb-8 max-w-lg">
//             Master real-world financial skills through our interactive banking simulator. 
//             Practice account management, transactions, and investments in a risk-free environment.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <a
//               href="/signup"
//               className="px-8 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
//             >
//               Start Learning Free
//             </a>
//             <a
//               href="/demo"
//               className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium text-lg rounded-lg hover:bg-blue-50 transition"
//             >
//               Watch Demo
//             </a>
//           </div>
//         </div>

//         {/* Right Content */}
//         <div className="relative">
//           <div className="absolute -left-8 -top-8 w-24 h-24 bg-blue-100 rounded-full"></div>
//           <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-100 rounded-full"></div>
//           <Image
//             src="/banking.jpg"
//             alt="Banking Learning Platform"
//             width={800}
//             height={533}
//             className="relative z-10 mx-auto rounded-xl shadow-xl border-8 border-white"
//             priority
//           />
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//           What You'll Learn
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Feature 1 */}
//           <div className="bg-blue-50 p-6 rounded-xl">
//             <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
//               <FaPiggyBank className="text-2xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Account Management</h3>
//             <p className="text-gray-600">
//               Learn to open, manage, and optimize different types of bank accounts.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="bg-green-50 p-6 rounded-xl">
//             <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='text-2xl'>
//             <path d="M0 168v-16c0-13.3 10.7-24 24-24h360V80c0-21.4 25.9-32 41-17l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80C410 272 384 261.5 384 240v-48H24c-13.3 0-24-10.7-24-24zm488 152H128v-48c0-21.3-25.9-32.1-41-17l-80 80c-9.4 9.4-9.4 24.6 0 33.9l80 80C102.1 464 128 453.4 128 432v-48h360c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24z"/></svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Transactions</h3>
//             <p className="text-gray-600">
//               Practice deposits, withdrawals, transfers, and understand transaction flows.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="bg-yellow-50 p-6 rounded-xl">
//             <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
//               <FaChartLine className="text-2xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Budgeting</h3>
//             <p className="text-gray-600">
//               Master budgeting techniques and financial planning with real-world scenarios.
//             </p>
//           </div>

//           {/* Feature 4 */}
//           <div className="bg-purple-50 p-6 rounded-xl">
//             <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
//               <FaHandHoldingUsd className="text-2xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Loans & Credit</h3>
//             <p className="text-gray-600">
//               Understand how loans, credit scores, and interest rates work in practice.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
//           How Our Learning Platform Works
//         </h2>
//         <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
//           Our simulated banking environment gives you hands-on experience without real financial risk.
//         </p>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Step 1 */}
//           <div className="text-center">
//             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
//               <span className="text-2xl font-bold">1</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
//             <p className="text-gray-600">
//               Sign up with your student credentials to access the banking simulator.
//             </p>
//           </div>

//           {/* Step 2 */}
//           <div className="text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
//               <span className="text-2xl font-bold">2</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Modules</h3>
//             <p className="text-gray-600">
//               Work through interactive lessons with guided financial scenarios.
//             </p>
//           </div>

//           {/* Step 3 */}
//           <div className="text-center">
//             <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
//               <span className="text-2xl font-bold">3</span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Freely</h3>
//             <p className="text-gray-600">
//               Experiment with different financial strategies in our risk-free environment.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Ready to Master Your Financial Skills?
//         </h2>
//         <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//           Join thousands of students who are building financial confidence with our interactive banking platform.
//         </p>
//         <a
//           href="/signup"
//           className="inline-block px-10 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
//         >
//           Get Started Now - It's Free
//         </a>
//       </div>
//     </div>
//   );
// }

import Image from 'next/image';
import { 
  FaGraduationCap, 
  FaPiggyBank, 
  FaChartLine, 
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaUniversity,
  FaCalculator,
  FaMobileAlt,
  FaShieldAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { FiCreditCard, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function AcornsLanding() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
            <FaGraduationCap className="mr-2" />
            <span className="text-sm font-medium">Financial Learning Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Learn Banking Fundamentals <br /> with <span className="text-blue-600">NIIT Bank</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Master real-world financial skills through our interactive banking simulator. 
            Practice account management, transactions, and investments in a risk-free environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Start Learning Free
            </a>
            <a
              href="/demo"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium text-lg rounded-lg hover:bg-blue-50 transition"
            >
              Watch Demo
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-blue-100 rounded-full"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-100 rounded-full"></div>
          <Image
            src="/banking.jpg"
            alt="Banking Learning Platform"
            width={800}
            height={533}
            className="relative z-10 mx-auto rounded-xl shadow-xl border-8 border-white"
            priority
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
              <FaPiggyBank className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Account Management</h3>
            <p className="text-gray-600">
              Learn to open, manage, and optimize different types of bank accounts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <FaExchangeAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Transactions</h3>
            <p className="text-gray-600">
              Practice deposits, withdrawals, transfers, and understand transaction flows.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-yellow-50 p-6 rounded-xl">
            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
              <FaChartLine className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Budgeting</h3>
            <p className="text-gray-600">
              Master budgeting techniques and financial planning with real-world scenarios.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
              <FaHandHoldingUsd className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loans & Credit</h3>
            <p className="text-gray-600">
              Understand how loans, credit scores, and interest rates work in practice.
            </p>
          </div>
        </div>
      </div>

      {/* Loan Management Feature */}
      <div className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
              <FaUniversity className="mr-2" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Loan Management Simulator
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our upcoming loan management module will help you understand:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <FaCalculator className="text-sm" />
                </div>
                <span className="text-gray-700">Loan EMI calculations and amortization schedules</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <FaChartLine className="text-sm" />
                </div>
                <span className="text-gray-700">Impact of interest rates and loan terms</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <FaShieldAlt className="text-sm" />
                </div>
                <span className="text-gray-700">Loan application process and documentation</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <FaMobileAlt className="text-sm" />
                </div>
                <span className="text-gray-700">Prepayment options and foreclosure scenarios</span>
              </li>
            </ul>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center">
              Notify Me When Available
              <FiMail className="ml-2" />
            </button>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -left-8 -top-8 w-24 h-24 bg-green-100 rounded-full z-0"></div>
            <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Image
                src="/managment.png" // Replace with your actual loan simulator image
                alt="Loan Management Simulator Preview"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="mt-4 text-center text-sm text-gray-500">
                Preview of our upcoming loan management simulator
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How Our Learning Platform Works
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our simulated banking environment gives you hands-on experience without real financial risk.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
            <p className="text-gray-600">
              Sign up with your student credentials to access the banking simulator.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Modules</h3>
            <p className="text-gray-600">
              Work through interactive lessons with guided financial scenarios.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Freely</h3>
            <p className="text-gray-600">
              Experiment with different financial strategies in our risk-free environment.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Master Your Financial Skills?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students who are building financial confidence with our interactive banking platform.
        </p>
        <a
          href="/signup"
          className="inline-block px-10 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          Get Started Now - It's Free
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiCreditCard className="mr-2" />
                NIIT Bank
              </h3>
              <p className="text-gray-400 mb-4">
                Empowering students with practical financial education through interactive banking simulations.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Learning Modules</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Bank Accounts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Transactions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Budgeting</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Loans & Credit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Investments</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Financial Calculators</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Tutorial Videos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Glossary</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiMail className="text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400">support@niitbank.edu</span>
                </li>
                <li className="flex items-start">
                  <FiPhone className="text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400">+1 (800) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <FiMapPin className="text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400">NIIT University, Financial Education Dept.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} NIIT Bank Learning Platform. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}