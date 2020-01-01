import React from "react";
import TransactionList from "./TransactionList";

function CompletedTransactionList() {
  return (
    <div className="transaction-list__wrapper align-left-right">
      <h1 className="transaction-list__title">Completed orders</h1>
      <TransactionList url="/api/transaction?finished=1"></TransactionList>
    </div>
  );
}

export default CompletedTransactionList;
