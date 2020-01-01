import React, { useCallback } from "react";
import numeral from "numeral";

/**
 * Display a pricing option
 * @param {{price: Number, description: String}} props
 */
function PricingItem({ price, description, setPriceList }) {
  let onRemoveTier = useCallback(
    function() {
      setPriceList((p) =>
        p.filter(function(tier) {
          return price !== tier.price;
        })
      );
    },
    [price, setPriceList]
  );

  return (
    <div className="pricing-item">
      <h2>{numeral(price).format("$0,0.00")}</h2>
      <h3>
        {description}
        <button type="button" className="pricing-item__remove-btn" onClick={onRemoveTier}>
          <i className="far fa-trash-alt"></i>
        </button>
      </h3>
    </div>
  );
}

export default PricingItem;
