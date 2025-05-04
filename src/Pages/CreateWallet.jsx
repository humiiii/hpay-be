import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";

function CreateWallet() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const createWallet = async () => {
    setLoading(true);
    try {
      await api.post(`/wallet/create`);
      setMessage("Wallet created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error creating wallet:",
        error.response?.data || error.message
      );
      setMessage("Wallet creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Wallet</h2>

        {loading ? (
          <p className="text-center text-blue-500">Processing...</p>
        ) : (
          <button
            onClick={createWallet}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Wallet
          </button>
        )}

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default CreateWallet;
