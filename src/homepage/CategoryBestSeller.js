import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { request } from "../common/config";

/**
 * A slider to show best sellers in a certain category
 * @param {{category: {id: Number, name: String}}} props
 */
function CategoryBestSeller({ category }) {
  let [jobList, setJobList] = useState([]);

  useEffect(function() {
    request("/api/job?typeId=" + category.id)
      .then(function(jobList) {
        setJobList(jobList);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>{category.name}</h2>
      <div>
        {jobList.map(function(job) {
          return (
            <Link to={"/job/" + job.id} key={job.id}>
              <h3>{job.name}</h3>
              <h4>{job.price_list.map(({ price }) => price).join(", ")}</h4>
            </Link>
          );
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
