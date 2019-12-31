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
        .then(function(transaction) {
          console.log(transaction);
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
        {job.price_list.map(function({ price }, idx) {
          return (
            <div
              key={idx}
              className={"job-tiers__choice" + (tier === idx ? " active" : "")}
              onClick={() => setTier(idx)}>
              {numeral(price).format("$0,0.00")}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "2rem" }}>
        <div className="job-tiers__description">{job.price_list[tier].description}</div>
        <button className="job-tiers__submit" onClick={onBuy}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default JobPriceTier;
