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
    <div>
      <h1>Header</h1>
      {categoryList.map(function(category) {
        return <CategoryBestSeller key={category.id} category={category}></CategoryBestSeller>;
      })}
    </div>
  );
}

export default Homepage;
