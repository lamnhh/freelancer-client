import React, { useState, useEffect } from "react";
import { request } from "../common/config";
import CategoryBestSeller from "./CategoryBestSeller";

function Homepage() {
  let [categoryList, setCategoryList] = useState([]);

  useEffect(function() {
    request("/api/job-type")
      .then(setCategoryList)
      .catch(console.log);
  }, []);

  return (
    <React.Fragment>
      <div className="homepage-cover">
        <h1 className="align-left-right">
          Work with verified, exceptional talent, hand-vetted for stellar quality and service.
        </h1>
        <img
          alt=""
          style={{
            width: "100%",
            maxHeight: "40rem",
            objectFit: "cover",
            objectPosition: "center center"
          }}
          src="https://fiverr-res.cloudinary.com/w_iw_div_1,q_100,f_auto/general_assets/pro_experience/assets/images/f1/desktop_main_banner.jpg"></img>
      </div>
      <div className="align-left-right">
        {categoryList.map(function(category) {
          return <CategoryBestSeller key={category.id} category={category}></CategoryBestSeller>;
        })}
      </div>
    </React.Fragment>
  );
}

export default Homepage;
