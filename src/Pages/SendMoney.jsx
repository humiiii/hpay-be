import React, { useState } from 'react';
import axios from 'axios';

function SendMoney() {
  const [userId] = useState(localStorage.getItem('userId') || '');
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');

  const sendMoney = async () => {
    try {
      await axios.post('http://localhost:3000/api/wallet/transfer', {
        senderId: userId,
        receiverId,
        amount: parseFloat(amount),
      });
      setMessage('Transfer successful');
      setReceiverId('');
      setAmount('');
    } catch (error) {
      setMessage('Transfer failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Send Money</h2>
      <input
        type="text"
        placeholder="Receiver's User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendMoney}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SendMoney;
