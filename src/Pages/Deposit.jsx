import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const depositFunds = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/wallet/deposit', {
        userId,
        amount: parseFloat(amount),
      });

      console.log('Deposit response:', response.data);
      setBalance(response.data.balance);
      setMessage('Deposit successful');
    } catch (error) {
      console.error('Deposit error:', error.response?.data || error.message);
      setMessage('Deposit failed');
    }
  };

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      <p><strong>Your User ID:</strong> {userId}</p>

      <div style={{ marginTop: '20px' }}>
        <h3>Deposit Funds</h3>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={depositFunds}>Deposit</button>
      </div>

      {balance !== null && <p>Wallet Balance: {balance}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Dashboard;
