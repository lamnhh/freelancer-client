import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";

/**
 * Find min and max price of a job, used to display in job-card as, for example,
 * $1000 - $3000.
 * @param {{price_list: Array.<{price: Number, description: String}>}} job
 */
function findPriceRange({ price_list }) {
  let minPrice = price_list[0].price;
  let maxPrice = minPrice;

  for (let i = 1; i < price_list.length; ++i) {
    minPrice = Math.min(minPrice, price_list[i].price);
    maxPrice = Math.max(maxPrice, price_list[i].price);
  }

  return [minPrice, maxPrice].map(function(price) {
    return numeral(price).format("$0,0");
  });
}

/**
 * Display a job (used in homepage or in /job-list).
 * @param {{job: {id: Number, name: String, price_list: Array.<{price, description}>}}} props
 */
function JobCard({ job }) {
  let [minPrice, maxPrice] = findPriceRange(job);
  return (
    <Link to={"/job/" + job.id} className="job-card">
      <img
        className="job-card__image"
        src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103150660/original/e067349cc881304e0a3141d8c9d55d949892b678.png"
        alt={"Preview image for " + job.name}></img>
      <div className="job-card__uploader">
        <img
          src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/84200a96950dbf2b7500c413aedc80bd-1517158761152/9d5ec520-2b74-4bee-91e4-42831a432b16.jpg"
          alt="Uploader of this job"></img>
        <span>{job.fullname || "Lord Chin-Chin"}</span>
      </div>
      <div className="job-card__description">
        <h3>{job.name}</h3>
        <div style={{ textAlign: "right" }}>
          <img
            alt=""
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/pro_experience_perseus/apps/pro-badge-outline-2.0.f84c499.svg"></img>
        </div>
      </div>
      <div className="job-card__price">
        {minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`}
      </div>
    </Link>
  );
}

export default JobCard;
