'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import SQLPreview from '@/components/SqlPreview';
import { FaCreditCard, FaMoneyBillWave, FaLock, FaPiggyBank ,} from 'react-icons/fa';

const DepositPage = () => {
  const [accounts, setAccounts] = useState<{ accountNumber: string; accountType: string; balance: string }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedAccountBalance, setSelectedAccountBalance] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const id = Number(storedUserId);
      setUserId(id);
      fetchAccounts(id);
    }
  }, []);

  const fetchAccounts = async (userId: number) => {
    try {
      const response = await axios.post('/api/account', { userId });
      setAccounts(response.data.accounts);
    } catch (error) {
      toast.error('Failed to fetch accounts.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedAccount) {
      const account = accounts.find(acc => acc.accountNumber === selectedAccount);
      if (account) {
        setSelectedAccountBalance(account.balance);
      }
    } else {
      setSelectedAccountBalance(null);
    }
  }, [selectedAccount, accounts]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (!selectedAccount || !amount || !pin) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Amount must be a positive number.');
      return;
    }

    if (pin.length < 4 || pin.length > 6) {
      toast.error('PIN must be 4 to 6 digits.');
      return;
    }

    setLoading(true);
    try {
      await axios.patch('/api/deposit', {
        accountNumber: selectedAccount,
        amount: numericAmount,
        pin,
      });

      toast.success('✅ Deposit successful!');
      setAmount('');
      setPin('');
      if (userId) fetchAccounts(userId); // Refresh balance
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Deposit failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Deposit Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-6 px-8">
            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">Deposit Money</h1>
            </div>
          </div>

          <form onSubmit={handleDeposit} className="p-8 space-y-6">
            {/* Select Account */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaCreditCard className="mr-2 text-green-500" />
                Select Account
              </label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border bg-gray-50"
                required
              >
                <option value="">-- Select Account --</option>
                {accounts.map((acc) => (
                  <option key={acc.accountNumber} value={acc.accountNumber}>
                    {acc.accountNumber} ({acc.accountType}) - PKR {acc.balance}
                  </option>
                ))}
              </select>
              {selectedAccountBalance && (
                <p className="text-sm text-gray-600 mt-1">
                  Current Balance: <span className="font-semibold">PKR {selectedAccountBalance}</span>
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaMoneyBillWave className="mr-2 text-green-500" />
                Deposit Amount
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">PKR </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full pl-10 pr-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 p-3 border bg-gray-50"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaLock className="mr-2 text-green-500" />
                Transaction PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border bg-gray-50"
                placeholder="Enter your PIN"
                maxLength={6}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <FaMoneyBillWave className="mr-2" />
                    Deposit Funds
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* SQL Preview */}
        <div className="hidden lg:block">
          <SQLPreview
            sqlText={`-- Deposit to account
UPDATE accounts 
SET balance = balance + ${amount || ':amount'} 
WHERE account_number = '${selectedAccount || ':account'}' 
AND pin = '${pin || ':pin'}';

-- Record transaction
INSERT INTO deposits (account_number, amount, timestamp)
VALUES ('${selectedAccount || ':account'}', ${amount || ':amount'}, NOW());`}
          />
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
