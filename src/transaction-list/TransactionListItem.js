import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

function TransactionStatus({ transaction }) {
  let badgeType = null;
  let text = null;

  if (!transaction.is_finished) {
    badgeType = "gray";
    text = "On-going";
  } else if (transaction.refund === null) {
    badgeType = "green";
    text = "Finished";
  } else if (transaction.refund.status === null) {
    badgeType = "orange";
    text = "Requested for refund";
  } else if (transaction.refund.status) {
    badgeType = "red";
    text = "Refunded";
  } else {
    badgeType = "green";
    text = "Finished";
  }

  return (
    <div className="badge-container">
      <span className={"badge badge-" + badgeType}>{text}</span>;
    </div>
  );
}

function TransactionListItem({ transaction }) {
  return (
    <div className="transaction-list-item">
      <span>
        <Link to={"/job/" + transaction.job_id}>
          <img
            className="transaction-list-item__image"
            src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103150660/original/e067349cc881304e0a3141d8c9d55d949892b678.png"
            alt={"Preview image for " + transaction.job_name}></img>
        </Link>
      </span>
      <span className="job-name">
        <Link to={"/job/" + transaction.job_id}>{transaction.job_name}</Link>
      </span>
      <span className="order-date">
        {moment(transaction.is_finished ? transaction.finished_at : transaction.created_at).format(
          "YYYY-MM-DD"
        )}
      </span>
      <span className="price">{numeral(transaction.price).format("$0,0.00")}</span>
      <TransactionStatus transaction={transaction}></TransactionStatus>
      <span className="action">
        <Link to={"/chat/" + transaction.seller.username}>
          <button title="Contact">Message</button>
        </Link>
      </span>
    </div>
  );
}

export default TransactionListItem;
