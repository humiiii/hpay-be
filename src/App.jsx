import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CreateWallet from "./Pages/CreateWallet";
import Deposit from "./Pages/Deposit";
import SendMoney from "./Pages/SendMoney";
import WithdrawMoney from "./Pages/WithdrawMoney";
import Transaction from "./Pages/Transaction";
import ViewWalletBalance from "./Pages/ViewWalletBalance";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-wallet" element={<CreateWallet />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transfer" element={<SendMoney />} />
          <Route path="/withdraw" element={<WithdrawMoney />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/view-balance" element={<ViewWalletBalance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
