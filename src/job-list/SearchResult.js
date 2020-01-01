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
      request(`/api/job?page=${page}&size=12&search=${text}`)
        .then(setJobList)
        .catch(console.log);
    },
    [page, text]
  );

  return (
    <div
      className="align-left-right"
      style={{
        paddingTop: "7rem"
      }}>
      <div className="job-list">
        {jobList.map(function(job) {
          return <JobCard key={job.id} job={job}></JobCard>;
        })}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)}>Prev</button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default SearchResult;
