import React, { useCallback } from "react";
import JobForm from "./JobForm";
import { emptyJobEmptyPriceList as emptyJob } from "../job/helper";

function UploadJob() {
  let handleUpload = useCallback(function() {
    console.log("Hello");
  }, []);
  return <JobForm initialJob={emptyJob} handleSubmit={handleUpload}></JobForm>;
}

export default UploadJob;
