import React, { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
  const userId = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransaction = async () => {
    if (!userId) {
      setError("User ID not found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/wallet/transaction/${userId}`
      );
      setTransactions(data.transaction || []);
    } catch {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [userId]);

  const renderDescription = (txn) => {
    const amount = txn.amount;
    switch (txn.type) {
      case "deposit":
        return (
          <>
            Deposited <b>{amount}</b>
          </>
        );
      case "withdraw":
        return (
          <>
            Withdrew <b>{amount}</b>
          </>
        );
      case "transfer":
        if (txn.senderId === userId) {
          return (
            <>
              Sent <b>{amount}</b> to {txn.receiverId}
            </>
          );
        }
        return (
          <>
            Received <b>{amount}</b> from {txn.senderId}
          </>
        );
      default:
        return <>Transaction of <b>{amount}</b></>;
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>

      {loading ? (
        <p className="text-center text-blue-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-600">No transactions found.</p>
      ) : (
        <ul className="space-y-4 list-disc list-inside">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="border border-gray-200 rounded p-3 hover:shadow transition-shadow"
            >
              {renderDescription(txn)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Transaction;
