import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ViewWalletBalance = () => {
  const userId = localStorage.getItem("userId");
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchWallet = useCallback(async () => {
    if (!userId) {
      setMessage("User ID not found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:3000/wallet/${userId}`);
      setWalletBalance(data.balance);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      setMessage("Failed to fetch wallet balance.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">View Wallet Balance</h2>
      <p className="mb-4">
        <strong>Your User ID:</strong> {userId || "Not available"}
      </p>

      {loading ? (
        <p className="text-blue-500">Loading balance...</p>
      ) : walletBalance !== null ? (
        <p className="text-green-600 font-medium text-lg">
          <strong>Wallet Balance:</strong> ${walletBalance}
        </p>
      ) : (
        !message && <p>No balance information available.</p>
      )}

      {message && <p className="mt-4 text-red-600 font-medium">{message}</p>}
    </main>
  );
};

export default ViewWalletBalance;
