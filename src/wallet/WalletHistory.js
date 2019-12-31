import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { request } from "../common/config";

function WalletHistory() {
  let [transactionList, setTransactionList] = useState([]);

  useEffect(function() {
    request("/api/wallet/history")
      .then(setTransactionList)
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>Header</h1>
      <h2>Transaction History</h2>
      {transactionList.map(function(transaction) {
        return (
          <div key={transaction.id}>
            <h3>{numeral(transaction.amount).format("$0,0.00")}</h3>
            <h3>{transaction.content}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default WalletHistory;
