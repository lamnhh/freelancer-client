import React, { useState, useEffect } from "react";
import { request } from "./config";

function Footer() {
  let [categoryList, setCategoryList] = useState([]);

  useEffect(function() {
    request("/api/job-type")
      .then(setCategoryList)
      .catch(console.log);
  }, []);

  return (
    <footer className="footer-wrapper align-left-right">
      <div className="footer">
        <div className="footer-column">
          <h2>Categories</h2>
          {categoryList.slice(0, 6).map(function({ name }) {
            return <h3 key={name}>{name}</h3>;
          })}
        </div>
        <div className="footer-column">
          <h2>About</h2>
          <h3>Careers</h3>
          <h3>Press & News</h3>
          <h3>Partnerships</h3>
          <h3>Privacy Policy</h3>
          <h3>Terms of Service</h3>
        </div>
        <div className="footer-column">
          <h2>Support</h2>
          <h3>Help & Support</h3>
          <h3>Trust & Safety</h3>
          <h3>Selling on GIG</h3>
          <h3>Buying on GIG</h3>
        </div>
        <div className="footer-column">
          <h2>Community</h2>
          <h3>Events</h3>
          <h3>Blog</h3>
          <h3>Forum</h3>
          <h3>Podcast</h3>
          <h3>Affiliates</h3>
        </div>
      </div>
      <hr></hr>
      <div className="footer-low">
        <img
          alt=""
          src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/footer/logo.313c747.svg"></img>
        <span className="copyright">© GIG International Ltd. 2020</span>
      </div>
    </footer>
  );
}

export default Footer;
