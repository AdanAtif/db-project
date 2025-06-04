'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaHome,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaWallet,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setHasProfile(false);
    setUserInitial("");
    router.push("/auth/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => router.push("/")}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <FaWallet className="text-white text-sm" />
              </div>
              <span className="text-lg font-bold text-gray-800 hidden sm:block">
                NIIT Bank
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => router.push("/transfer")}
              className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1"
            >
              <FaExchangeAlt className="text-sm" />
              <span>Transfer</span>
            </button>
            <button 
              onClick={() => router.push("/deposit")}
              className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1"
            >
              <FaMoneyBillWave className="text-sm" />
              <span>Deposit</span>
            </button>
            <button 
              onClick={() => router.push("/withDrawal")}
              className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1"
            >
              <FaMoneyBillWave className="text-sm rotate-180" />
              <span>Withdraw</span>
            </button>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userId ? (
              <>
                {!hasProfile && (
                  <button
                    onClick={() => router.push("/createAccount")}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition flex items-center space-x-2 shadow-md"
                  >
                    <FaUserPlus className="text-sm" />
                    <span>Create Account</span>
                  </button>
                )}
                <button
                  onClick={() => router.push("/profile")}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium flex items-center justify-center hover:shadow-md transition"
                  title="Profile"
                >
                  {userInitial ? userInitial : <FaUserCircle className="text-xl" />}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-red-600 transition flex items-center space-x-2"
                  title="Logout"
                >
                  <FaSignOutAlt />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => router.push("/auth/signup")} 
                  className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1"
                >
                  <FaUserPlus className="text-sm" />
                  <span>Sign Up</span>
                </button>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition flex items-center space-x-2 shadow-md"
                >
                  <FaSignInAlt className="text-sm" />
                  <span>Log in</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                router.push("/");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
            >
              <FaHome />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                router.push("/transfer");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
            >
              <FaExchangeAlt />
              <span>Transfer</span>
            </button>
            <button
              onClick={() => {
                router.push("/deposit");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
            >
              <FaMoneyBillWave />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => {
                router.push("/withDrawal");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
            >
              <FaMoneyBillWave className="rotate-180" />
              <span>Withdraw</span>
            </button>

            <div className="border-t border-gray-200 pt-4 mt-4">
              {userId ? (
                <>
                  {!hasProfile && (
                    <button
                      onClick={() => {
                        router.push("/createAccount");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mb-2 flex items-center space-x-2"
                    >
                      <FaUserPlus />
                      <span>Create Account</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FaUserCircle />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push("/auth/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2 mb-2"
                  >
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </button>
                  <button
                    onClick={() => {
                      router.push("/auth/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                  >
                    <FaSignInAlt />
                    <span>Log in</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}