import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../common/config";
import JobCard from "../job-list/JobCard";
import { Link } from "react-router-dom";

/**
 * A slider to show best sellers in a certain category
 * @param {{category: {id: Number, name: String}}} props
 */
function CategoryBestSeller({ category }) {
  let [jobList, setJobList] = useState([]);

  useEffect(
    function() {
      request("/api/job?size=4&typeId=" + category.id)
        .then(function(jobList) {
          setJobList(jobList);
        })
        .catch(console.log);
    },
    [category.id]
  );

  if (jobList.length === 0) {
    return null;
  }

  return (
    <div className="homepage-category">
      <div className="homepage-category__header">
        <h1 className="homepage-category__name">{category.name}</h1>
        <Link to={"/job-list/" + category.id}>View All In {category.name} ></Link>
      </div>
      <div className="job-list">
        {jobList.map(function(job) {
          return <JobCard key={job.id} job={job}></JobCard>;
        })}
      </div>
    </div>
  );
}

CategoryBestSeller.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};

export default CategoryBestSeller;
