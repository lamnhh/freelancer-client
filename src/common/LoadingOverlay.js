import React from "react";

function LoadingOverlayIcon() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function LoadingOverlay({ active = false }) {
  return (
    <div className={"lds-ring--wrapper" + (active ? " active" : "")}>
      <LoadingOverlayIcon></LoadingOverlayIcon>
    </div>
  );
}

export default LoadingOverlay;
