import React, { useState } from "react";
import axios from "axios";

const SendMoney = () => {
  const [userId] = useState(localStorage.getItem("userId") || "");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMoney = async () => {
    if (!receiverId.trim()) {
      setMessage("Please enter the receiver's User ID.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage("Please enter a valid amount greater than zero.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/wallet/transfer", {
        senderId: userId,
        receiverId: receiverId.trim(),
        amount: parsedAmount,
      });
      setMessage("Transfer successful.");
      setReceiverId("");
      setAmount("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Transfer failed. Please try again."
      );
      console.error("Transfer error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Send Money</h2>

      <input
        type="text"
        placeholder="Receiver's User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        disabled={loading}
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendMoney}
        disabled={loading}
        className={`w-full py-2 rounded text-white transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send"}
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

export default SendMoney;
