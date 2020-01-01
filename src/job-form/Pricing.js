import React from "react";
import PricingItem from "./PricingItem";

/**
 * Display pricing settings, which includes a list of { price, description }
 * @param {{priceList: Array.<{price: Number, description: String }>}} props
 */
function Pricing({ priceList, setPriceList }) {
  return (
    <div>
      {priceList.map(function({ price, description }) {
        return <PricingItem key={price} price={price} description={description}></PricingItem>;
      })}
    </div>
  );
}

export default Pricing;
