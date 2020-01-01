import React, { useState, useEffect } from "react";
import numeral from "numeral";
import Modal from "react-modal";
import { request } from "../common/config";
import RecentActivity from "./RecentActivity";
import WalletUpdate from "./WalletUpdate";

Modal.setAppElement("#root");

function WalletPage() {
  let [balance, setBalance] = useState(0);
  useEffect(function() {
    request("/api/wallet")
      .then(function({ balance }) {
        setBalance(balance);
      })
      .catch(console.log);
  }, []);

  let [action, setAction] = useState(null);

  return (
    <div className="wallet-page--wrapper align-left-right">
      <div className="wallet-page">
        <h1 className="balance-title">Balance</h1>
        <h2 className="balance-value">{numeral(balance).format("$ 0,0.00")}</h2>
        <div className="balance-actions">
          <button type="button" title="Top up your wallet" onClick={() => setAction("topup")}>
            <img alt="" src={"/img/topup-ico.svg"}></img>
            <span>Top up</span>
          </button>
          <button
            type="button"
            title="Withdraw money into your bank account"
            onClick={() => setAction("withdraw")}>
            <img alt="" src={"/img/withdraw-ico.svg"}></img>
            <span>Withdraw</span>
          </button>
        </div>
        <h1 className="balance-title">Recent Activity</h1>
        <RecentActivity></RecentActivity>
        <Modal
          isOpen={!!action}
          onRequestClose={() => setAction(null)}
          style={{
            content: {
              top: "20%",
              bottom: "unset",
              left: "35%",
              right: "35%"
            }
          }}>
          <WalletUpdate action={action}></WalletUpdate>
        </Modal>
      </div>
    </div>
  );
}

export default WalletPage;
