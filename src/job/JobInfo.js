import React, { useState } from "react";
import emptyJob from "./helper";
import ReviewList from "../review-list/ReviewList";
import SellerInfo from "../common/SellerInfo";
import { generateAvatar, generateCover } from "../common/placeholder-images";

/**
 * Display information (name, description, type) of a job.
 * @param {{job: { id: Number, name: String}}} props
 */
function JobInfo({ job: initialJob }) {
  let job = initialJob || emptyJob;
  let [reviewCount, setReviewCount] = useState(0);

  return (
    <div>
      <div className="breadcrumb">
        <span>GIG</span>
        <span>{job.type}</span>
      </div>
      <h2 className="job-name">{job.name}</h2>
      <div className="job-card__uploader">
        <img src={generateAvatar()} alt="Uploader of this job"></img>
        <span>{job.fullname || "Lord Chin-Chin"}</span>
      </div>
      <img alt="" src={generateCover()}></img>
      <p className="job-description">{job.description}</p>

      <h2 style={{ marginTop: "4rem" }} className="job-name">
        About The Seller
      </h2>
      <SellerInfo
        user={{ username: job.username, bio: job.user_bio }}
        horizontal={true}></SellerInfo>

      <h2 style={{ marginTop: "4rem" }} className="job-name">
        {reviewCount} Review{reviewCount > 1 ? "s" : ""}
      </h2>
      {job.id && (
        <ReviewList url={`/api/job/${job.id}/review`} setReviewCount={setReviewCount}></ReviewList>
      )}
    </div>
  );
}

export default JobInfo;
