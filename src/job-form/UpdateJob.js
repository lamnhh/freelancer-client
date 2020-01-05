import React, { useState, useEffect, useCallback } from "react";
import JobForm from "./JobForm";
import { useParams, useHistory } from "react-router-dom";
import { request } from "../common/config";
import { toast } from "react-toastify";

function UpdateJob() {
  let { id: jobId } = useParams();
  let [job, setJob] = useState(null);

  useEffect(
    function() {
      request("/api/job/" + jobId)
        .then(setJob)
        .catch(console.log);
    },
    [jobId]
  );

  let history = useHistory();

  let handleUpdate = useCallback(
    function(job) {
      request("/api/job/" + jobId, {
        method: "PATCH",
        body: JSON.stringify(job)
      })
        .then(function(job) {
          toast.success("Update successfully");
          history.push("/job/" + job.id);
        })
        .catch(function({ message }) {
          toast.error(message);
        });
    },
    [jobId, history]
  );

  if (job === null) {
    return null;
  }
  return <JobForm initialJob={job} handleSubmit={handleUpdate}></JobForm>;
}

export default UpdateJob;
