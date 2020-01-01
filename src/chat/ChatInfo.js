import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { request } from "../common/config";
import { Link } from "react-router-dom";

/**
 * Display orders from `seller` in chat box.
 * @param {{seller: String}} props
 */
function ChatInfo({ seller }) {
  let [list1, setList1] = useState([]);
  let [list2, setList2] = useState([]);

  useEffect(
    function() {
      request("/api/transaction?finished=0&seller=" + seller)
        .then(setList1)
        .catch(console.log);
    },
    [seller]
  );

  useEffect(
    function() {
      request("/api/transaction?finished=1&seller=" + seller)
        .then(setList2)
        .catch(console.log);
    },
    [seller]
  );

  let markAsFinished = useCallback(function(transactionId) {
    let password = prompt("Please re-enter your password");
    request(`/api/transaction/${transactionId}/finish`, {
      method: "POST",
      body: JSON.stringify({ password })
    })
      .then(function() {
        window.location.reload();
      })
      .catch(function({ message }) {
        alert(message);
      });
  }, []);

  return (
    <div className="chat-info">
      {list1.length > 0 ? <h1>On-going orders</h1> : <h1>No on-going order</h1>}
      <div className="chat-info__transaction--wrapper">
        {list1.length > 0 && (
          <div className="chat-info__transaction table-header">
            <span>Job name</span>
            <span>Order date</span>
            <span>Action</span>
          </div>
        )}
        {list1.map(function(transaction) {
          return (
            <div key={transaction.id} className="chat-info__transaction">
              <h3 className="job-name">{transaction.job_name}</h3>
              <h3 className="order-date">{moment(transaction.created_at).format("YYYY-MM-DD")}</h3>
              <span>
                <button type="button" onClick={() => markAsFinished(transaction.id)}>
                  Finish
                </button>
              </span>
            </div>
          );
        })}
      </div>

      {list2.length > 0 && (
        <React.Fragment>
          <h1>Past orders</h1>
          <div className="chat-info__transaction--wrapper">
            {list2.length > 0 && (
              <div className="chat-info__transaction table-header">
                <span>Job name</span>
                <span>Order date</span>
                <span>Action</span>
              </div>
            )}
            {list2.map(function(transaction) {
              return (
                <div key={transaction.id} className="chat-info__transaction">
                  <h3 className="job-name">{transaction.job_name}</h3>
                  <h3 className="order-date">
                    {moment(transaction.created_at).format("YYYY-MM-DD")}
                  </h3>
                  <span>
                    {moment().diff(transaction.finished_at) <= 86400000 * 3 && (
                      <Link to={"/refund/" + transaction.id}>
                        <button type="button">Refund</button>
                      </Link>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ChatInfo;
