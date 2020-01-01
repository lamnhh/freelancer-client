import React from "react";
import TransactionList from "./TransactionList";

function OngoingTransactionList() {
  return (
    <div className="transaction-list__wrapper align-left-right">
      <h1 className="transaction-list__title">On-going Transactions</h1>
      <TransactionList url="/api/transaction?finished=0"></TransactionList>
    </div>
  );
}

export default OngoingTransactionList;
