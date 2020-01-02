import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function HeaderDropdown({ user }) {
  let [active, setActive] = useState(false);

  let ref = useRef();

  useEffect(function() {
    function listener(e) {
      let target = e.target;
      if (target.contains(ref.current)) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    window.addEventListener("click", listener);
    return function() {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <button type="button" className="user-profile-btn">
      {user.username[0]}
      <div ref={ref} className={"header-dropdown" + (active ? " active" : "")}>
        <div className="tip"></div>
        <Link to="/user-profile">
          <p>Profile</p>
        </Link>
        <Link to={"/dashboard/" + user.username}>
          <p>Dashboard</p>
        </Link>
        <Link to="/wallet">
          <p>Wallet</p>
        </Link>
        <Link to="/ongoing">
          <p className="divider">Ongoing orders</p>
        </Link>
        <Link to="/completed">
          <p>Completed orders</p>
        </Link>
        <Link to="/logout">
          <p className="divider">Logout</p>
        </Link>
      </div>
    </button>
  );
}

export default HeaderDropdown;
