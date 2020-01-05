import React, { useCallback, useContext } from "react";
import JobForm from "./JobForm";
import { emptyJobEmptyPriceList as emptyJob } from "../job/helper";
import { request } from "../common/config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../AppContext";

function UploadJob() {
  let { startLoading, stopLoading } = useContext(AppContext);
  let history = useHistory();
  let handleUpload = useCallback(
    function(job) {
      startLoading();
      request("/api/job", {
        method: "POST",
        body: JSON.stringify(job)
      })
        .then(function(job) {
          toast.success("Upload successfully");
          history.push("/job/" + job.id);
        })
        .catch(function({ message }) {
          toast.error(message);
        })
        .then(function() {
          stopLoading();
        });
    },
    [history, startLoading, stopLoading]
  );
  return (
    <div className="gray-bg">
      <JobForm initialJob={emptyJob} handleSubmit={handleUpload}></JobForm>
    </div>
  );
}

export default UploadJob;
