import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SellerInfo from "../common/SellerInfo";
import { request } from "../common/config";
import JobCard from "../job-list/JobCard";
import ReviewList from "../review-list/ReviewList";

function Dashboard() {
  let { username } = useParams();
  let [user, setUser] = useState({ username: "", fullname: "", bio: "" });

  useEffect(
    function() {
      request("/api/account/" + username)
        .then(setUser)
        .catch(console.log);
    },
    [username]
  );

  let [jobList, setJobList] = useState([]);
  useEffect(
    function() {
      request("/api/job?count=-1&seller=" + username)
        .then(setJobList)
        .catch(console.log);
    },
    [username]
  );

  return (
    <div className="dashboard align-left-right">
      <div className="seller-info--wrapper">
        <SellerInfo user={user} horizontal={false}></SellerInfo>
      </div>
      <div>
        <section className="dashboard-job-list">
          <h1 className="section-title">{username}'s Jobs</h1>
          <div className="job-list job-list-2">
            {jobList.map(function(job) {
              return <JobCard key={job.id} job={job}></JobCard>;
            })}
          </div>
        </section>
        <section className="dashboard-review-list">
          <h1 className="section-title">Reviews as Seller</h1>
          <ReviewList url={`/api/account/${username}/review`}></ReviewList>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
