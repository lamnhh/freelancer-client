import React from "react";
import { Link } from "react-router-dom";

/**
 * Display a job (used in homepage or in /job-list).
 * @param {{job: {id: Number, name: String, price_list: Array.<{price, description}>}}} props
 */
function JobCard({ job }) {
  return (
    <Link to={"/job/" + job.id}>
      <h3>{job.name}</h3>
      <h4>{job.price_list.map(({ price }) => price).join(", ")}</h4>
    </Link>
  );
}

export default JobCard;
