import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "./config";

function displayWithLineBreak(text) {
  if (!text) {
    text = "";
  }
  let tokens = text.split("\n");
  return tokens.map(function(token, idx) {
    return (
      <React.Fragment key={idx}>
        {idx > 0 && <br></br>}
        {token}
      </React.Fragment>
    );
  });
}

function SellerInfo({ job, horizontal = true }) {
  let [skillList, setSkillList] = useState([]);
  useEffect(
    function() {
      request(`/api/account/${job.username}/skill`)
        .then(setSkillList)
        .catch(console.log);
    },
    [job.username]
  );

  return (
    <React.Fragment>
      <div className={"seller-info" + (horizontal ? " horizontal" : "")}>
        <div>
          <span className="seller-info__avatar">{job.username[0]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <p className="seller-info__username">{job.username}</p>
          <p className="seller-info__quote">Customer Satisfaction is my top Priority</p>
          <Link to={"/chat/" + job.username}>
            <button type="button">Contact Me</button>
          </Link>
        </div>
      </div>
      <div className="seller-extra-info">
        <div className="seller-extra-info--item">
          <h2 className="seller-extra-info--item-title">Description</h2>
          <p className="seller-extra-info__description">{displayWithLineBreak(job.user_bio)}</p>
        </div>
        <div className="seller-extra-info--item">
          <h2 className="seller-extra-info--item-title">Skills</h2>
          {skillList.map(function(skill) {
            return (
              <span className="skill-card" key={skill.id}>
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SellerInfo;
