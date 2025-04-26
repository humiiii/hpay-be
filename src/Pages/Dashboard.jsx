import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to SwiftBank, {user?.name || "User"}</h2>
      
      <div style={{ marginTop: "2rem" }}>
        <p>Select an action:</p>
        <ul>
          <li><Link to="/create-wallet">Create Wallet</Link></li>
          <li><Link to="/deposit">Deposit Funds</Link></li>
          <li><Link to="/transfer">Send Money</Link></li>
          <li><Link to="/transaction">View Transaction</Link></li>
          <li><Link to="/wallet-balance">View Wallet Balance</Link></li>
          <li><Link to="/withdraw">Withdraw Money</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;







