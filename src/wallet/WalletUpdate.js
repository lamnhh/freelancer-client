import React, { useCallback } from "react";
import { request } from "../common/config";

/**
 * Component to update (top up/withdraw) money.
 * @param {{action: ('topup' | 'withdraw')}} props
 */
function WalletUpdate({ action }) {
  let actionName = action === "topup" ? "Top up" : "Withdraw";

  let onUpdate = useCallback(
    function(e) {
      e.preventDefault();

      let amount = parseInt(e.target.amount.value) * (action === "topup" ? 1 : -1);
      let password = e.target.password.value;

      request("/api/wallet", {
        method: "POST",
        body: JSON.stringify({
          amount,
          password
        })
      })
        .then(function() {
          alert(actionName + " successfully");
        })
        .catch(console.log);
    },
    [action, actionName]
  );

  return (
    <div className="login-form wallet-form">
      <h2>{actionName}</h2>
      <form onSubmit={onUpdate}>
        <label className="amount-label">
          <span>Amount</span>
          <input type="text" name="amount" placeholder="$" required></input>
        </label>

        <label className="amount-label">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter password to continue"
            required></input>
        </label>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default WalletUpdate;
