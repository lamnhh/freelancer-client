import React from "react";
import JobCard from "./JobCard";

function JobList({ jobList }) {
  return (
    <div>
      {jobList.map(function(job) {
        return <JobCard job={job}></JobCard>;
      })}
    </div>
  );
}

export default JobList;
