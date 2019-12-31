import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../common/config";

function WalletPage() {
  let [balance, setBalance] = useState(0);

  useEffect(function() {
    request("/api/wallet")
      .then(function({ balance }) {
        setBalance(balance);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>Header</h1>
      <h2>Balance: {balance}</h2>
      <div>
        <Link to="/wallet/history">
          <button>View transaction history</button>
        </Link>
        <Link to="/wallet/topup">
          <button>Top up</button>
        </Link>
        <Link to="/wallet/withdraw">
          <button>Withdraw money</button>
        </Link>
      </div>
    </div>
  );
}

export default WalletPage;
