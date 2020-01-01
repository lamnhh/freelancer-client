import React from "react";
import numeral from "numeral";
import moment from "moment";

/**
 * Display a single transaction in /wallet
 * @param {{transaction: {id: Number, amount: Number, content: String, created_at: Date}}} props
 */
function RecentActivityItem({ transaction }) {
  let content = transaction.content;
  if (content === null) {
    content = transaction.amount > 0 ? "Topped up " : "Withdrew ";
    content = content + numeral(transaction.amount).format("$0,0.00");
  }
  return (
    <div className="recent-activity__item">
      <div>
        <h4>{content}</h4>
        <h5>{moment(transaction.created_at).format("dddd, MMMM Do YYYY, hh:mm")}</h5>
      </div>
      <h4>{numeral(transaction.amount).format("$ 0,0.00")}</h4>
    </div>
  );
}

export default RecentActivityItem;
