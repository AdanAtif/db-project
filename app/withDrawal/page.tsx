"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import SQLPreview from "@/components/SqlPreview";

const WithDrawalPage = () => {
  const [accounts, setAccounts] = useState<{ accountNumber: string, accountType: string }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

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

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !amount || !pin) {
      toast.error("Please fill in all fields.");
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Withdrawal failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center gap-32">
      <div className="min-h-screen flex items-center justify-center px-4 text-black">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 py-4 px-6">
              <h1 className="text-2xl font-bold text-white">Withdraw Amount</h1>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleWithdraw}>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Fill The Form</h2>

                <div>
                  <label htmlFor="account" className="block text-sm font-medium text-gray-700">Select Account</label>
                  <select
                    id="account"
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  >
                    <option value="">-- Select Account --</option>
                    {accounts.map(acc => (
                      <option key={acc.accountNumber} value={acc.accountNumber}>
                        {acc.accountNumber} ({acc.accountType})
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-600 my-2">
                    Please select the account you want to withdraw from.
                  </p>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>

                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Enter Your PIN</label>
                  <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600"
              >
                {loading ? <Loader /> : "Withdraw"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SQLPreview
        sqlText={`UPDATE accounts SET balance = balance - ${amount || 'Amount'} WHERE account_number = '${selectedAccount || 'Account'}' AND pin = '${pin || 'Pin'}';`}
      />
    </div>
  );
};

export default WithDrawalPage;
