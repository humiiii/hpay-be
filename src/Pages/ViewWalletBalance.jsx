import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewWalletBalance = () => {
  const userId = localStorage.getItem('userId');
  const [walletBalance, setWalletBalance] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch wallet balance
  const fetchWallet = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/wallet/${userId}`);
      setWalletBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      setMessage('Failed to fetch wallet balance');
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>View Wallet Balance</h2>
      <p><strong>Your User ID:</strong> {userId}</p>

      {walletBalance !== null ? (
        <p><strong>Wallet Balance:</strong> ${walletBalance}</p>
      ) : (
        <p>Loading balance...</p>
      )}

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default ViewWalletBalance;
