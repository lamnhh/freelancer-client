import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { request } from "../common/config";
import RecentActivity from "./RecentActivity";

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
    <div className="wallet-page--wrapper align-left-right">
      <div className="wallet-page">
        <h1 className="balance-title">Balance</h1>
        <h2 className="balance-value">{numeral(balance).format("$ 0,0.00")}</h2>
        <div className="balance-actions">
          <Link to="/wallet/topup">
            <button type="button" title="Top up your wallet">
              <img alt="" src={"/img/topup-ico.svg"}></img>
              <span>Top up</span>
            </button>
          </Link>
          <Link to="/wallet/withdraw">
            <button type="button" title="Withdraw money into your bank account">
              <img alt="" src={"/img/withdraw-ico.svg"}></img>
              <span>Withdraw</span>
            </button>
          </Link>
        </div>
        <h1 className="balance-title">Recent Activity</h1>
        <RecentActivity></RecentActivity>
      </div>
    </div>
  );
}

export default WalletPage;
