import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateWallet() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Checking localStorage for userId:', storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
      console.log('User ID set from localStorage:', storedUserId);
      checkIfWalletExists(storedUserId); // check wallet on load
    } else {
      console.log('User ID not found in localStorage.');
    }
  }, []);

  const checkIfWalletExists = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/wallet/${id}`);
      if (response.data) {
        console.log('Wallet already exists. Redirecting to dashboard.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Wallet not found. User can create one.');
    }
  };

  const createWallet = async () => {
    if (!userId) {
      console.log('Cannot create wallet. User ID is missing.');
      setMessage('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/wallet/create', {
        userId,
      });

      console.log('Wallet creation response:', response.data);
      setMessage('Wallet created successfully!');
      navigate('/dashboard'); // redirect after successful creation
    } catch (error) {
      console.error('Error creating wallet:', error.response?.data || error.message);
      setMessage('Wallet creation failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Wallet</h2>
      <p><strong>User ID:</strong> {userId || 'Not found'}</p>

      <button onClick={createWallet}>Create Wallet</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateWallet;





