import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import { request } from "../common/config";

function JobListFilteredByCategory() {
  let typeId = parseInt(useParams().typeId);
  let [jobList, setJobList] = useState([]);
  let [page, setPage] = useState(1);
  let [category, setCategory] = useState({ name: "" });

  useEffect(
    function() {
      request(`/api/job?page=${page}&typeId=${typeId}`)
        .then(setJobList)
        .catch(console.log);
    },
    [page, typeId]
  );

  useEffect(
    function() {
      request(`/api/job-type/${typeId}`)
        .then(setCategory)
        .catch(console.log);
    },
    [typeId]
  );

  return (
    <div
      className="align-left-right"
      style={{
        paddingTop: "3.2rem"
      }}>
      <div className="breadcrumb">
        <span>GIG</span>
        <span>{category.name}</span>
      </div>
      <h1
        style={{
          margin: "1rem 0 3rem 0",
          fontSize: "3.2rem"
        }}>
        {category.name}
      </h1>

      <div className="job-list">
        {jobList.map(function(job) {
          return <JobCard key={job.id} job={job}></JobCard>;
        })}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          <i className="fa fa-chevron-left"></i>
        </button>
        <button onClick={() => setPage((p) => p + 1)}>
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default JobListFilteredByCategory;
