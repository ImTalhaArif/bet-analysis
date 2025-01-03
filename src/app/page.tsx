"use client"; 
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [betDetails, setBetDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [pick, setPick] = useState('');
  const [message, setMessage] = useState('');
  const [performance, setPerformance] = useState<any>(null);

  const handleLockBet = async () => {
    try {
      const response = await axios.post('agents', {
        userId,
        betDetails,
        amount: parseFloat(amount),
        pick,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error locking bet.');
    }
  };

  const handleGetPerformance = async () => {
    try {
      const response = await axios.get(`agents?userId=${userId}`);
      setPerformance(response.data);
    } catch (error) {
      setMessage('Error fetching performance.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col items-center p-4 text-gray-100">
      <h1 className="text-3xl font-extrabold mb-6">Bet Agent Dashboard</h1>

      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Place Your Bet</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Bet Details"
          value={betDetails}
          onChange={(e) => setBetDetails(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Pick"
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleLockBet}
          className="bg-indigo-600 text-white p-3 rounded-lg w-full mt-3 hover:bg-indigo-700 transition"
        >
          Lock Bet
        </button>
      </div>

      {message && <p className="mt-4 text-lg font-medium text-green-200">{message}</p>}

      <button
        onClick={handleGetPerformance}
        className="bg-green-500 text-white p-3 rounded-lg w-full max-w-lg mt-6 hover:bg-green-600 transition"
      >
        Get Performance Update
      </button>

      {performance && (
        <div className="bg-white shadow-lg p-6 mt-6 rounded-lg w-full max-w-lg">
          <h2 className="text-lg font-bold text-gray-800">Performance Update</h2>
          <p className="text-gray-700">Total Amount: <span className="font-medium text-gray-900">${performance.totalAmount}</span></p>
          <ul className="mt-4 space-y-2">
            {performance.bets.map((bet: any, index: number) => (
              <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm text-gray-800">
                {bet.betDetails} - <span className="font-medium">${bet.amount}</span> (<span className="italic">{bet.pick}</span>)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
