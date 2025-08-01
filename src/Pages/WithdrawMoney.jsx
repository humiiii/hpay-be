import React, { useState } from "react";
import axios from "axios";

const WithdrawMoney = () => {
  const [userId] = useState(localStorage.getItem("userId") || "");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const withdrawMoney = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage("Please enter a valid amount greater than zero.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("http://localhost:3000/api/wallet/withdraw", {
        userId,
        amount: parsedAmount,
      });

      setMessage(`Withdrawal successful. New balance: ${data.balance}`);
      setAmount("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Withdrawal failed. Please try again.");
      console.error("Withdrawal error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Withdraw Funds</h2>
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Enter amount to withdraw"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={withdrawMoney}
        disabled={loading}
        className={`w-full py-2 rounded text-white transition-colors ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.toLowerCase().includes("successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </main>
  );
};

export default WithdrawMoney;
