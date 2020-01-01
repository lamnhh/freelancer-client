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
      <div className="breadcrumb">
        <span>GIG</span>
        <span>{job.type}</span>
      </div>
      <h2 className="job-name">{job.name}</h2>
      <div className="job-card__uploader">
        <img
          src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/84200a96950dbf2b7500c413aedc80bd-1517158761152/9d5ec520-2b74-4bee-91e4-42831a432b16.jpg"
          alt="Uploader of this job"></img>
        <span>{job.fullname || "Lord Chin-Chin"}</span>
      </div>
      <img
        alt=""
        src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs2/98429895/original/9a7c8dc5094709b180341d6ba2e1ba6942dfc195/create-custom-logotype-for-your-business.png"></img>
      <p className="job-description">{job.description}</p>
    </div>
  );
}

export default JobInfo;
