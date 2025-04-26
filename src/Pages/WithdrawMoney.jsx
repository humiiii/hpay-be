import React, { useState } from 'react';
import axios from 'axios';

function WithdrawMoney() {
  const [userId] = useState(localStorage.getItem('userId') || '');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const withdrawMoney = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/wallet/withdraw', {
        userId,
        amount: parseFloat(amount),
      });
      setMessage('Withdrawal successful. New balance: ' + response.data.balance);
      setAmount('');
    } catch (error) {
      setMessage('Withdrawal failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Withdraw Funds</h2>
      <input
        type="number"
        placeholder="Enter amount to withdraw"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={withdrawMoney}>Withdraw</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default WithdrawMoney;
