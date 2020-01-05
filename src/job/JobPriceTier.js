import React, { useCallback, useState } from "react";
import numeral from "numeral";
import { request } from "../common/config";
import emptyJob from "./helper";

/**
 * Display all price tier of a job
 * @param {{job: {id: Number, price_list: Array.<{price: Number, description: String}>}}} props
 */
function JobPriceTier({ job: initialJob }) {
  let job = initialJob || emptyJob;
  let [tier, setTier] = useState(0);

  let jobTierTitle =
    job.price_list.length === 3 ? ["Basic", "Standard", "Premium"] : ["Standard", "Premium"];

  let onBuy = useCallback(
    function(e) {
      e.preventDefault();

      request("/api/transaction", {
        method: "POST",
        body: JSON.stringify({
          jobId: job.id,
          price: job.price_list[tier].price
        })
      })
        .then(function() {
          alert("Ordered successfully");
        })
        .catch(function({ message }) {
          alert(message);
        });
    },
    [job.id, tier, job.price_list]
  );

  return (
    <div className="job-tiers">
      <div
        className="job-tiers__selector"
        style={{
          gridTemplateColumns: `repeat(${job.price_list.length}, 1fr)`
        }}>
        {job.price_list.map(function(_, idx) {
          return (
            <div
              key={idx}
              className={"job-tiers__choice" + (tier === idx ? " active" : "")}
              onClick={() => setTier(idx)}>
              {jobTierTitle[idx]}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "2rem" }}>
        <div className="job-tiers__more-info">
          <h2 className="job-tiers__name">{jobTierTitle[tier]}</h2>
          <h3 className="job-tiers__price">
            {numeral(job.price_list[tier].price).format("$0,0.00")}
          </h3>
        </div>
        <div className="job-tiers__description">{job.price_list[tier].description}</div>
        <button className="job-tiers__submit" onClick={onBuy}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default JobPriceTier;
