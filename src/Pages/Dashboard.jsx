import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome to SwiftBank, {user?.name || "User"}
      </h2>

      <section>
        <p className="mb-4 font-medium">Select an action:</p>
        <ul className="space-y-3 list-disc list-inside text-blue-600">
          <li>
            <Link to="/create-wallet" className="hover:underline">
              Create Wallet
            </Link>
          </li>
          <li>
            <Link to="/deposit" className="hover:underline">
              Deposit Funds
            </Link>
          </li>
          <li>
            <Link to="/transfer" className="hover:underline">
              Send Money
            </Link>
          </li>
          <li>
            <Link to="/transaction" className="hover:underline">
              View Transaction
            </Link>
          </li>
          <li>
            <Link to="/wallet-balance" className="hover:underline">
              View Wallet Balance
            </Link>
          </li>
          <li>
            <Link to="/withdraw" className="hover:underline">
              Withdraw Money
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
