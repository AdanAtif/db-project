"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import SQLPreview from "@/components/SqlPreview";
import { FaArrowUp, FaMoneyBillWave, FaCreditCard, FaLock } from "react-icons/fa";

const WithDrawalPage = () => {
  const [accounts, setAccounts] = useState<{ accountNumber: string, accountType: string, balance: string }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedAccountBalance, setSelectedAccountBalance] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
      fetchAccounts(Number(storedUserId));
    }
  }, []);

  const fetchAccounts = async (userId: number) => {
    try {
      const response = await axios.post('/api/account', { userId });
      setAccounts(response.data.accounts);
    } catch (error) {
      toast.error("Failed to fetch accounts.");
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

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !amount || !pin) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (selectedAccountBalance && parseFloat(amount) > parseFloat(selectedAccountBalance)) {
      toast.error("Insufficient funds");
      return;
    }

    setLoading(true);
    try {
      await axios.patch('/api/withdraw', {
        accountNumber: selectedAccount,
        amount: parseFloat(amount),
        pin,
      });
      toast.success("Withdrawal successful!");
      setAmount('');
      setPin('');
      if (userId) fetchAccounts(userId); // Refresh account data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Withdrawal failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Withdrawal Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-500 py-6 px-8">
            <div className="flex items-center space-x-3">
              <FaArrowUp className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">Cash Withdrawal</h1>
            </div>
          </div>
          
          <form onSubmit={handleWithdraw} className="p-8 space-y-6">
            {/* Account Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaCreditCard className="mr-2 text-red-500" />
                From Account
              </label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border bg-gray-50"
                required
              >
                <option value="">-- Select Your Account --</option>
                {accounts.map(acc => (
                  <option key={acc.accountNumber} value={acc.accountNumber}>
                    {acc.accountNumber} ({acc.accountType}) - PKR {acc.balance}
                  </option>
                ))}
              </select>
              {selectedAccountBalance && (
                <p className="text-sm text-gray-600 mt-1">
                  Available Balance: <span className="font-semibold">PKR {selectedAccountBalance}</span>
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FaMoneyBillWave className="mr-2 text-red-500" />
                Withdrawal Amount
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">PKR </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full pl-10 pr-12 rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 p-3 border bg-gray-50"
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
                <FaLock className="mr-2 text-red-500" />
                Transaction PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border bg-gray-50"
                placeholder="Enter your 4-digit PIN"
                maxLength={4}
                pattern="\d{4}"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <Loader  />
                  </>
                ) : (
                  <>
                    <FaArrowUp className="mr-2" />
                    Withdraw Money
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* SQL Preview */}
        <div className="hidden lg:block">
          <SQLPreview
            sqlText={`-- Deduct from account
UPDATE accounts 
SET balance = balance - ${amount || ':amount'} 
WHERE account_number = '${selectedAccount || ':accountNumber'}' 
AND pin = '${pin || ':pin'}';

-- Record withdrawal transaction
INSERT INTO withdrawals (account_number, amount, timestamp)
VALUES ('${selectedAccount || ':accountNumber'}', ${amount || ':amount'}, NOW());`}
          />
        </div>
      </div>
    </div>
  );
};

export default WithDrawalPage;