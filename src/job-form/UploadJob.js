import React, { useCallback } from "react";
import JobForm from "./JobForm";
import { emptyJobEmptyPriceList as emptyJob } from "../job/helper";
import { request } from "../common/config";
import { useHistory } from "react-router-dom";

function UploadJob() {
  let history = useHistory();
  let handleUpload = useCallback(
    function(job) {
      request("/api/job", {
        method: "POST",
        body: JSON.stringify(job)
      })
        .then(function(job) {
          alert("Upload successfully");
          history.push("/job/" + job.id);
        })
        .catch(function({ message }) {
          alert(message);
        });
    },
    [history]
  );
  return (
    <div className="gray-bg">
      <JobForm initialJob={emptyJob} handleSubmit={handleUpload}></JobForm>
    </div>
  );
}

export default UploadJob;
