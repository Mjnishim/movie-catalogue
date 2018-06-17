/* eslint-disable no-undef */
function searchMovies(query, cb) {
  return fetch("/api/movie/search", {
    accept: "application/json",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(query)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function searchActors(query, cb) {
  return fetch(`/api/actors?name=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addActor(query, cb) {
  return fetch("/api/actors", {
    accept: "application/json",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(query)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addMovie(query, cb) {
  return fetch("/api/movie", {
    accept: "application/json",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(query)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export { searchMovies, searchActors, addActor, addMovie };
