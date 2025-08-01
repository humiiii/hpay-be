import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const depositFunds = async () => {
    if (!userId) {
      setMessage("User ID not found. Please login again.");
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setMessage("Please enter a valid positive amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/wallet/deposit",
        {
          userId,
          amount: depositAmount,
        }
      );
      setBalance(data.balance);
      setMessage("Deposit successful.");
      setAmount("");
    } catch (error) {
      setMessage("Deposit failed. Please try again.");
      console.error("Deposit error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
      <p className="mb-4">
        <strong>Your User ID:</strong> {userId || "Not available"}
      </p>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Deposit Funds</h3>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-3"
          disabled={loading}
        />
        <button
          onClick={depositFunds}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </section>

      {balance !== null && (
        <p className="text-green-600 font-medium mb-2">
          Wallet Balance: {balance}
        </p>
      )}
      {message && <p className="text-red-600 font-medium">{message}</p>}
    </main>
  );
};

export default Dashboard;
