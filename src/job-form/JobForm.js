import React, { useState, useEffect, useCallback } from "react";
import { request } from "../common/config";
import Pricing from "./Pricing";

/**
 * Display a form to create/update a job
 * @param {{initialJob: { name: String, description: String, cv_url: String, type_id: Number, price_list: Array.<{price: Number, description: String}>}}} props
 */
function JobForm({ initialJob, handleSubmit }) {
  let [job, setJob] = useState({
    name: initialJob.name,
    description: initialJob.description,
    cv_url: initialJob.cv_url,
    type_id: initialJob.type_id
  });
  let [priceList, setPriceList] = useState(initialJob.price_list);

  let [categoryList, setCategoryList] = useState([]);
  useEffect(function() {
    request("/api/job-type")
      .then(setCategoryList)
      .catch(console.log);
  }, []);

  let onSubmit = useCallback(function(e) {
    e.preventDefault();
    handleSubmit({});
  }, []);

  return (
    <div className="job-form--wrapper align-left-right">
      <form className="job-form" onSubmit={onSubmit}>
        <section className="overview">
          <h1 className="section-title">Overview</h1>
          <label>
            <h3>Job Title</h3>
            <input type="text" name="name"></input>
          </label>
          <label>
            <h3>Category</h3>
            <select defaultValue={job.type_id} name="type_id">
              {categoryList.map(function(category) {
                return <option key={category.id}>{category.name}</option>;
              })}
            </select>
          </label>
        </section>

        <section className="pricing">
          <h1 className="section-title">Pricing</h1>
          <Pricing priceList={priceList} setPriceList={setPriceList}></Pricing>
        </section>

        <section className="description">
          <h1 className="section-title">Description & FAQ</h1>
          <textarea name="description" placeholder="Describe your job"></textarea>
        </section>

        <section className="certification">
          <h1 className="section-title">Cerfitication(s)</h1>
          <h3 className="section-subtitle">
            You are required to submit your curriculum vitea, resume and other certifications so we
            can validate your abitities.
          </h3>
          <h3 className="section-subtitle">
            Please put them in a single zip file and put the URL to that file here.
          </h3>
          <input type="text" name="cv_url" placeholder="URL to the zip file"></input>
        </section>

        <section className="publish">
          <h1 className="section-title">Publish</h1>

          <h3
            className="section-subtitle"
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold"
            }}>
            Congratulations!
          </h3>
          <h3 className="section-subtitle">You are almost done.</h3>
          <div className="publish-btn--wrapper">
            <button type="submit" className="publish-btn">
              Publish
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default JobForm;
