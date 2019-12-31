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
function request(url, options, sendJson = true) {
  if (sendJson) {
    options.headers = options.headers || {};
    options.headers["Content-Type"] = "application/json";
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

export { BACKEND_URL, request };
