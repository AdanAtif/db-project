'use client';

import SQLPreview from '@/components/SqlPreview';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import { FaCreditCard, FaLock, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

export default function CreateAccountPage() {
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [createdAccountNumber, setCreatedAccountNumber] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType || !amount || !pin || !confirmPin) {
      toast.error('Please fill in all fields');
      return;
    }

    if (pin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }

    if (pin.length < 4 || pin.length > 6) {
      toast.error('PIN should be 4 to 6 digits');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (numericAmount < 0) {
      toast.error('Amount cannot be negative');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/createAccount', {
        accountType,
        amount: numericAmount,
        pin,
        userId,
      });

      const data = response.data;
      setCreatedAccountNumber(data.accountNumber);
      setShowSuccess(true);

      setTimeout(() => {
        setAccountType('');
        setAmount('');
        setPin('');
        setConfirmPin('');
        setShowSuccess(false);
      }, 3000);

      toast.success(`Account created successfully!`);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-8 px-8 text-white">
            <div className="flex items-center space-x-3">
              <FaCreditCard className="text-2xl" />
              <h1 className="text-2xl font-bold">Open New Account</h1>
            </div>
            <p className="mt-2 text-blue-100">Fill in the details to create your new bank account</p>
          </div>

          <form onSubmit={handleCreateAccount} className="p-8 space-y-6">
            {/* Account Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaCreditCard className="mr-2 text-blue-500" />
                Account Type
              </label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
                required
              >
                <option value="">-- Select Account Type --</option>
                <option value="saving">Savings Account</option>
                <option value="current">Current Account</option>
                <option value="debt">Credit Account</option>
              </select>
            </div>

            {/* Initial Deposit */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaMoneyBillWave className="mr-2 text-blue-500" />
                Initial Deposit
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">PKR </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full pl-12 pr-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">PAK</span>
                </div>
              </div>
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaLock className="mr-2 text-blue-500" />
                Create PIN (4-6 digits)
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
                placeholder="Enter your PIN"
                maxLength={6}
                pattern="\d{4,6}"
                required
              />
            </div>

            {/* Confirm PIN */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaLock className="mr-2 text-blue-500" />
                Confirm PIN
              </label>
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
                placeholder="Confirm your PIN"
                maxLength={6}
                pattern="\d{4,6}"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || showSuccess}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                  showSuccess ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
              >
                {loading ? (
                  <>
                    <Loader  />
                  </>
                ) : showSuccess ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Account Created!
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && createdAccountNumber && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                <p className="text-green-700 font-medium">
                  Your account number: <span className="font-mono">{createdAccountNumber}</span>
                </p>
              </div>
            )}
          </form>
        </div>

        {/* SQL Preview */}
        <div className="hidden lg:block">
          <SQLPreview
            sqlText={`-- Create new account
INSERT INTO accounts (
  user_id, 
  account_type, 
  balance, 
  pin,
  account_number,
  created_at
) 
VALUES (
  ${userId || ':user_id'}, 
  '${accountType || ':account_type'}', 
  ${amount || ':balance'}, 
  '${pin || ':pin'}',
  CONCAT('AC', FLOOR(RAND() * 1000000000)),
  NOW()
);`}
          />
        </div>
      </div>
    </div>
  );
}
