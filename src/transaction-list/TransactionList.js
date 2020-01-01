import React, { useState, useEffect, useContext } from "react";
import { request } from "../common/config";
import TransactionListItem from "./TransactionListItem";
import AppContext from "../AppContext";

/**
 * Display a list of transactions
 * @param {{url: String}} props
 */
function TransactionList({ url }) {
  let [transactionList, setTransactionList] = useState([]);

  useEffect(
    function() {
      request(url)
        .then(setTransactionList)
        .catch(console.log);
    },
    [url]
  );

  let [tab, setTab] = useState(0);
  let { user } = useContext(AppContext);

  let shownList = transactionList.filter(function(transaction) {
    if (tab === 1) {
      return transaction.buyer !== user.username;
    }
    return transaction.buyer === user.username;
  });

  return (
    <div className="transaction-list">
      <div className="transaction-list-tab-nav">
        <div
          className={"transaction-list-tab" + (tab === 0 ? " active" : "")}
          onClick={() => setTab(0)}>
          My orders
        </div>
        <div
          className={"transaction-list-tab" + (tab === 1 ? " active" : "")}
          onClick={() => setTab(1)}>
          Orders to me
        </div>
      </div>
      <div className="transaction-list-item">
        <span></span>
        <span></span>
        <span>ORDER DATE</span>
        <span>TOTAL</span>
        <span>ACTIONS</span>
      </div>
      {shownList.map(function(transaction) {
        return (
          <TransactionListItem
            key={transaction.id}
            isMine={tab === 0}
            transaction={transaction}></TransactionListItem>
        );
      })}
    </div>
  );
}

export default TransactionList;
