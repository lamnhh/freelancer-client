import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Modal from "react-modal";
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
    setTid(transactionId);
  }, []);

  let [tid, setTid] = useState(null);

  let submitReview = useCallback(
    async function(e) {
      e.preventDefault();
      let form = e.target;

      try {
        let password = form.password.value;
        await request(`/api/transaction/${tid}/finish`, {
          method: "POST",
          body: JSON.stringify({ password })
        });

        // Add review if exists
        let review = form.review.value;
        if (review) {
          await request(`/api/transaction/${tid}/review`, {
            method: "POST",
            body: JSON.stringify({ review })
          });
        }
        window.location.reload();
      } catch ({ message }) {
        alert(message);
      }
    },
    [tid]
  );

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
                    {moment().diff(transaction.finished_at) <= 86400000 * 3 &&
                      transaction.refund === null && (
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
      <Modal
        isOpen={!!tid}
        onRequestClose={() => setTid(null)}
        style={{
          content: {
            left: "30%",
            right: "30%",
            top: "10%",
            bottom: "unset",
            padding: "0"
          }
        }}>
        <div className="review-form--wrapper">
          <div className="review-form--header">Mark order as finished</div>
          <form className="review-form" onSubmit={submitReview}>
            <label>
              <span>Do you want to add a review? (Optional)</span>
              <textarea name="review"></textarea>
            </label>
            <label>
              <span>Please enter your password to proceed</span>
              <input type="password" name="password"></input>
            </label>
            <div>
              <button className="submit-btn" type="submit">
                Continue
              </button>
              <button className="cancel-btn" type="button" onClick={() => setTid(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ChatInfo;
