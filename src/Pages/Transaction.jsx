import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transaction() {
  const userId = localStorage.getItem('userId');
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/wallet/transaction/${userId}`);
      setTransaction(response.data.transaction);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transaction History</h2>

      {loading ? (
        <p>Loading transaction...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : transaction.length === 0 ? (
        <p>No transaction found.</p>
      ) : (
        <ul>
          {transaction.map((txn) => (
            <li key={txn._id}>
              {txn.type === 'deposit' ? (
                <>Deposited <b>{txn.amount}</b></>
              ) : txn.type === 'withdraw' ? (
                <>Withdrew <b>{txn.amount}</b></>
              ) : txn.senderId === userId ? (
                <>Sent <b>{txn.amount}</b> to {txn.receiverId}</>
              ) : (
                <>Received <b>{txn.amount}</b> from {txn.senderId}</>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transaction;






