import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import { request } from "../common/config";

function JobListFilteredByCategory() {
  let typeId = parseInt(useParams().typeId);
  let [jobList, setJobList] = useState([]);
  let [page, setPage] = useState(1);

  useEffect(
    function() {
      request(`/api/job?page=${page}&typeId=${typeId}`)
        .then(setJobList)
        .catch(console.log);
    },
    [page, typeId]
  );

  return (
    <div>
      {jobList.map(function(job) {
        return <JobCard key={job.id} job={job}></JobCard>;
      })}
      <button onClick={() => setPage((p) => p - 1)}>Prev</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}

export default JobListFilteredByCategory;
