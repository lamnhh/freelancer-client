import React, { useState, useEffect } from "react";
import { request } from "../common/config";
import RecentActivityItem from "./RecentActivityItem";

function RecentActivity() {
  let [transactionList, setTransactionList] = useState([]);
  useEffect(function() {
    request("/api/wallet/history")
      .then(setTransactionList)
      .catch(console.log);
  }, []);

  return (
    <div className="recent-activity">
      {transactionList.map(function(transaction) {
        return (
          <RecentActivityItem key={transaction.id} transaction={transaction}></RecentActivityItem>
        );
      })}
    </div>
  );
}

export default RecentActivity;
