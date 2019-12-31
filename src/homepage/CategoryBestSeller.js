import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../common/config";
import JobCard from "../job-list/JobCard";

/**
 * A slider to show best sellers in a certain category
 * @param {{category: {id: Number, name: String}}} props
 */
function CategoryBestSeller({ category }) {
  let [jobList, setJobList] = useState([]);

  useEffect(
    function() {
      request("/api/job?typeId=" + category.id)
        .then(function(jobList) {
          setJobList(jobList);
        })
        .catch(console.log);
    },
    [category.id]
  );

  return (
    <div>
      <h2>{category.name}</h2>
      <div>
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
