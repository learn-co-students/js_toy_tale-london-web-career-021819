// SERVER STUFF:
const TOYS_URL = "http://localhost:3000/toys";
// get toys from the server:
function getToys() {
  return fetch(TOYS_URL).then(resp => resp.json());
}

// create toy on the server with form input:
function createToy(toy) {
  return fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json());
}

// update toy / increase toy likes
function updateToy(toy) {
  return fetch(TOYS_URL + `/${toy.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toy)
  }).then(resp => resp.json());
}
