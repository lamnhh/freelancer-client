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
    <form onSubmit={onBuy}>
      {job.price_list.map(function({ price, description }, idx) {
        return (
          <label key={idx} className={idx === tier ? "price-tier active" : "price-tier"}>
            <input
              type="radio"
              name="tier"
              checked={tier === idx}
              onChange={() => setTier(idx)}></input>
            <span>{numeral(price).format("$0,0.00")}</span>
            <span>{description}</span>
          </label>
        );
      })}
      <button type="submit">Order</button>
    </form>
  );
}

export default JobPriceTier;
