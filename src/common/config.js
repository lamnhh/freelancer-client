import React from "react";

let BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://its-freelancer.herokuapp.com";

/**
 * Wrapper for fetch(), which includes BACKEND_URL before every endpoint.
 * This also handles errors beforehand.
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @param {Boolean} sendJson true/false, whether Content-Type is application/json or not
 */
function request(url, options = {}, sendJson = true) {
  options.headers = options.headers || {};

  // Automatically set Content-Type if sendJson is true.
  if (sendJson) {
    options.headers["Content-Type"] = "application/json";
  }

  // Automatically set Authorization header if user is already logged in.
  if (typeof localStorage !== "undefined" && localStorage.getItem("token")) {
    let token = localStorage.getItem("token");
    options.headers["Authorization"] = "Bearer " + token;
  }

  return fetch(BACKEND_URL + url, options)
    .then(function(res) {
      return res.json().then(function(json) {
        if (res.ok) {
          return json;
        }
        throw json;
      });
    })
    .catch(function(err) {
      // In case of HTTP code 500, add a message of "Internal Server Error"
      err.message = err.message || "Internal Server Error";
      throw err;
    });
}

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

export { BACKEND_URL, request, displayWithLineBreak };
