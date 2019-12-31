import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../common/config";
import JobInfo from "./JobInfo";
import JobPriceTier from "./JobPriceTier";

function JobPage() {
  let { id } = useParams();
  let [job, setJob] = useState(null);

  useEffect(
    function() {
      request("/api/job/" + id)
        .then(setJob)
        .catch(console.log);
    },
    [id]
  );

  return (
    <div className="job-page align-left-right">
      <JobInfo job={job}></JobInfo>
      <div>
        <JobPriceTier job={job}></JobPriceTier>
      </div>
    </div>
  );
}

export default JobPage;
