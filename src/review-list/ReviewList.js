import React, { useState, useEffect } from "react";
import moment from "moment";
import { request } from "../common/config";

/**
 * Display reviews fetched from `url`.
 * @param {{url: String, setReviewCount: Function}} props
 */
function ReviewList({ url, setReviewCount }) {
  let [reviewList, setReviewList] = useState([]);
  useEffect(
    function() {
      request(url)
        .then(function(reviewList) {
          setReviewList(reviewList);
          if (setReviewCount) {
            setReviewCount(reviewList.length);
          }
        })
        .catch(console.log);
    },
    [url, setReviewCount]
  );

  return (
    <div className="review-list">
      {reviewList.map(function(review, idx) {
        return (
          <div key={idx} className="review-list--item">
            <div>
              <span className="review-list--item__avatar">{review.username[0]}</span>
            </div>
            <div className="review-list--item__username">{review.username}</div>
            <div></div>
            <div className="review-list--item__content">{review.content}</div>
            <div></div>
            <div className="review-list--item__date">{moment().to(moment(review.created_at))}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
