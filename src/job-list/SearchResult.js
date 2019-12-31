import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../common/config";
import JobCard from "./JobCard";

function SearchResult() {
  let { text } = useParams();
  let [jobList, setJobList] = useState([]);
  let [page, setPage] = useState(1);

  useEffect(
    function() {
      request(`/api/job?page=${page}&search=${text}`)
        .then(setJobList)
        .catch(console.log);
    },
    [page, text]
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

export default SearchResult;
