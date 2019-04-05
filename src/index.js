const TOYS = "http://localhost:3000/toys";
const NAME_INPUT = document.getElementById("toy-name-input");
const URL_INPUT = document.getElementById("toy-url-input");
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyColl = document.getElementById("toy-collection");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!

// Get the Toys
function getToys() {
  return fetch(TOYS).then(res => res.json());
}

// Display all toys
function displayToys(toys) {
  toys.forEach(displayToy);
}

// Display Toy
function displayToy(toy) {
  const CARD = document.createElement("div");
  CARD.className = "card";
  CARD.setAttribute("id", `toy-${toy.id}`);
  const H2 = document.createElement("h2");
  H2.textContent = toy.name;
  const IMAGE = document.createElement("img");
  IMAGE.className = "toy-avatar";
  IMAGE.src = toy.image;
  const PARAGRAPH = document.createElement("p");
  PARAGRAPH.setAttribute("id", `toy-likes-${toy.id}`);
  PARAGRAPH.textContent = toy.likes;
  const LIKE_BUTTON = document.createElement("button");
  LIKE_BUTTON.className = "like-btn";
  LIKE_BUTTON.dataset.toyId = toy.id;
  LIKE_BUTTON.addEventListener("click", e => {
    toy.likes++;
    like(toy.id, toy.likes);
  });
  LIKE_BUTTON.textContent = "Like <3";

  CARD.appendChild(H2);
  CARD.appendChild(IMAGE);
  CARD.appendChild(PARAGRAPH);
  CARD.appendChild(LIKE_BUTTON);

  toyColl.appendChild(CARD);
}

// SERVER SIDE
// Add toy to server and display it
function addToyToServer(name, image) {
  return fetch(TOYS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(displayToy);
}

// Increase likes

function like(toyId, likes) {
  return fetch(`${TOYS}/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes
    })
  })
    .then(resp => resp.json())
    .then(toy => {
      const likesPar = document.getElementById(`toy-likes-${toyId}`);
      likesPar.textContent = likes;
    });
}

//  Add listener and runs addToyToServer
function addListenerToCreateButton() {
  document.getElementById("add-toy-form").addEventListener("submit", e => {
    e.preventDefault();
    const [name, url] = [...e.target.querySelectorAll('input[type="text"]')]
      .map(n => n.value);
    addToyToServer(name, url);
    e.target.reset();
  });
}

function init() {
  getToys().then(displayToys);
  addListenerToCreateButton();
}

init();
