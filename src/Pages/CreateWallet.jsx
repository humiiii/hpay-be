import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";

const CreateWallet = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const createWallet = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data: walletCheckData } = await api.get("/user/wallet");

      if (walletCheckData.hasWallet) {
        setMessage("You already have a wallet.");
        return;
      }

      const { data: createResponse } = await api.post("/wallet/create");

      setMessage("Wallet created successfully!");

      if (createResponse.wallet?._id) {
        localStorage.setItem("walletId", createResponse.wallet._id);
      }

      navigate("/dashboard");
    } catch (error) {
      const errMsg =
        error.response?.data?.message === "Wallet already exists"
          ? "You already have a wallet."
          : "Wallet creation failed. Please try again.";
      setMessage(errMsg);

      console.error("Error creating wallet:", error.response?.data || error.message);
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
};

export default CreateWallet;
