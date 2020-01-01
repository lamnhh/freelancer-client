import React from "react";

/**
 * Display a pricing option
 * @param {{price: Number, description: String}} props
 */
function PricingItem({ price, description }) {
  return (
    <div>
      <h2>{price}</h2>
      <h3>{description}</h3>
    </div>
  );
}

export default PricingItem;
