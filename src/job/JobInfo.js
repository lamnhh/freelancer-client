import React from "react";
import emptyJob from "./helper";

/**
 * Display information (name, description, type) of a job.
 * @param {{job: { id: Number, name: String}}} props
 */
function JobInfo({ job: initialJob }) {
  let job = initialJob || emptyJob;
  return (
    <div>
      <h2>{job.name}</h2>
      <h2>{job.description}</h2>
      <h2>{job.type}</h2>
    </div>
  );
}

export default JobInfo;
