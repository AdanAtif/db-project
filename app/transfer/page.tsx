"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import SQLPreview from "@/components/SqlPreview";

const TransferPage = () => {
  const [accounts, setAccounts] = useState<{ accountNumber: string, accountType: string }[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
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

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !recipientAccount || !amount || !pin) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.patch('/api/transfer', {
        fromAccount: selectedAccount,
        toAccount: recipientAccount,
        amount: parseFloat(amount),
        pin,
      });
      toast.success("Transfer successful!");
      setRecipientAccount('');
      setAmount('');
      setPin('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center gap-32">
      <div className="min-h-screen flex items-center justify-center px-4 text-black">
        <div className="w-full min-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 py-4 px-6">
              <h1 className="text-2xl font-bold text-white">Transfer Money</h1>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleTransfer}>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Fill The Form</h2>
                <div>
                  <label htmlFor="account" className="block text-sm font-medium text-gray-700">Select Your Account</label>
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
                </div>

                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Account Number</label>
                  <input
                    type="text"
                    id="recipient"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
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
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Enter Your Pin</label>
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
                {loading ? <Loader /> : "Transfer"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SQLPreview
        sqlText={`UPDATE accounts SET balance = balance - ${amount || 'Amount'} WHERE account_number = '${selectedAccount || 'FromAccount'}' AND pin = '${pin || 'Pin'}';\nUPDATE accounts SET balance = balance + ${amount || 'Amount'} WHERE account_number = '${recipientAccount || 'ToAccount'}';`}
      />
    </div>
  );
};

export default TransferPage;
