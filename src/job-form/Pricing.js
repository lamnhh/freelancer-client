import React, { useCallback, useState } from "react";
import PricingItem from "./PricingItem";

/**
 * Display pricing settings, which includes a list of { price, description }
 * @param {{priceList: Array.<{price: Number, description: String }>}} props
 */
function Pricing({ priceList, setPriceList }) {
  let [price, setPrice] = useState(0);
  let [description, setDescription] = useState("");

  let onAddTier = useCallback(
    function() {
      setPriceList((p) =>
        p.concat({ price, description }).sort(function({ price: a }, { price: b }) {
          return a - b;
        })
      );
      setPrice(0);
      setDescription("");
    },
    [price, description, setPriceList]
  );

  return (
    <div>
      {priceList.map(function({ price, description }) {
        return (
          <PricingItem
            key={price}
            price={price}
            description={description}
            setPriceList={setPriceList}></PricingItem>
        );
      })}
      <div className="pricing-form">
        <div className="pricing-item">
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}></input>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        <div style={{ textAlign: "right", marginTop: "2rem" }}>
          <button type="button" className="publish-btn" onClick={onAddTier}>
            Create new pricing tier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
