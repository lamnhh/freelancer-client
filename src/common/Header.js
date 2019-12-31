import React, { useCallback, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { request } from "./config";

function Header() {
  let [categoryList, setCategoryList] = useState([]);
  useEffect(function() {
    request("/api/job-type")
      .then(setCategoryList)
      .catch(console.log);
  }, []);

  let history = useHistory();

  let onSearch = useCallback(
    function(e) {
      e.preventDefault();

      let search = e.target.search.value;
      history.push("/search/" + search);
    },
    [history]
  );

  return (
    <div className="header">
      <div className="header-top align-left-right">
        <div className="header-logo-search">
          <img
            alt=""
            src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/header/logo.11cc430.svg"></img>
          <form className="header-search" onSubmit={onSearch}>
            <input type="text" name="search"></input>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="header-actions">
          {/* <Link to="/upload-job">
            <button type="button" className="signin-btn">
              Upload Job
            </button>
          </Link> */}
          <Link to="/login">
            <button type="button" className="signin-btn">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="signup-btn">
              Join
            </button>
          </Link>
        </div>
      </div>
      <hr></hr>
      <nav className="header-navigation align-left-right">
        <ul className="category-list">
          {categoryList.map(function(category) {
            return (
              <li className="category-list__name" key={category.id}>
                <Link to={"/job-list/" + category.id}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
}

export default Header;
