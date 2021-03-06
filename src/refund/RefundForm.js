import React, { useState, useEffect, useCallback } from "react";
import numeral from "numeral";
import { useParams, useHistory } from "react-router-dom";
import { request } from "../common/config";
import { toast } from "react-toastify";

function RefundForm() {
  let { id: transactionId } = useParams();

  let [transaction, setTransaction] = useState(null);
  useEffect(
    function() {
      request("/api/transaction/" + transactionId).then(setTransaction);
    },
    [transactionId]
  );

  let history = useHistory();

  let onRequest = useCallback(
    function(e) {
      e.preventDefault();

      let transactionId = e.target.transactionId.value;
      let reason = e.target.reason.value;

      request("/api/refund/" + transactionId, {
        method: "POST",
        body: JSON.stringify({ reason })
      })
        .then(function() {
          toast.success("Your refund request has been received", {
            onClose: function() {
              history.goBack();
            }
          });
        })
        .catch(function({ message }) {
          toast.error(message);
        });
    },
    [history]
  );

  return (
    <div className="refund-form--wrapper">
      <div className="refund-form--header align-left-right">
        <div className="breadcrumb">
          <span>GIG</span>
          <span>Request a refund</span>
        </div>
        <h1 className="refund-form__title">Submit a request</h1>
      </div>

      <div className="refund-form align-left-right">
        <form onSubmit={onRequest}>
          <div className="refund-form__sorry">
            <h2>Refund order</h2>
            <p>
              We are sorry you are unhappy with your order and would like a refund. To help us
              process your request immediately, please include the reason you want to refund.
            </p>

            <p>For convenience, you will find information about the transaction on the sidebar.</p>
          </div>
          <label>
            <h2>Transaction ID</h2>
            <input type="text" name="transactionId" value={transactionId} readOnly></input>
          </label>
          <label>
            <h2>Detail</h2>
            <textarea name="reason" required></textarea>
          </label>
          <div style={{ textAlign: "right" }}>
            <button type="submit">Submit Request</button>
          </div>
        </form>
        <div className="refund-form__job">
          {transaction !== null && (
            <React.Fragment>
              <h2 className="job-name">{transaction.job_name}</h2>
              <h2 className="job-type">{transaction.type}</h2>
              <h2 className="title">Price Package</h2>
              <div className="job-price">
                <h2 className="value">{numeral(transaction.price).format("$0,0.00")}</h2>
                <h2 className="desc">{transaction.price_description}</h2>
              </div>
              <h2 className="title">Job Description</h2>
              <p className="job-description">{transaction.job_description}</p>
              <h2 className="title">Freelancer's CV</h2>
              <a href={transaction.cv_url} target="_blank" rel="noopener noreferrer">
                <p className="job-cv">{transaction.cv_url}</p>
              </a>
              <a
                href={"/dashboard/" + transaction.seller.username}
                target="_blank"
                rel="noopener noreferrer">
                <button type="button">View freelancer profile</button>
              </a>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default RefundForm;
