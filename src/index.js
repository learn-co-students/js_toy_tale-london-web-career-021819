const toysEl = document.querySelector("#toy-collection");

const addBtn = document.querySelector("#new-toy-btn");
// form already created in this div to add a new toy
const toyForm = document.querySelector(".container");
// to show and hide the form
let addToy = false;

// adds a single toy to the page
// call this on the toys array that comes back from fetch()
function renderToy(toy) {
  const toyEl = document.createElement("div");
  // console.log("renderToy", toy);
  toyEl.className = "card";
  toyEl.id = `toy-${toy.id}`;
  toyEl.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class="likes">${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`;

  toysEl.appendChild(toyEl);
  increaseToyLikes(toy, toyEl);
}

// add many toys to the page (once fetch has executed)
function allToys(toys) {
  console.log("allToys", toys);
  toys.forEach(renderToy);
}

// get the input from the toy form:
toyForm.addEventListener("submit", event => {
  event.preventDefault();
  // debugger;
  console.log(toyForm);
  const toy = {
    name: document.querySelector("#toyForm-input-name").value,
    image: document.querySelector("#toyForm-input-url").value,
    likes: 0
  };

  createToy(toy)
    .then(renderToy)
    .then(resetForm);
});

function resetForm() {
  document.querySelector(".add-toy-form").reset();
}

// increase toy likes
function increaseToyLikes(toy, toyEl) {
  const likeBtn = toyEl.querySelector(".like-btn");
  const likeEl = toyEl.querySelector(".likes");

  likeBtn.addEventListener("click", () => {
    console.log(toy);
    toy.likes++;

    updateToy(toy).then(() => {
      likeEl.innerText = `${toy.likes} Likes`;
    });
  });
}

// pre-built button stuff:
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    // the form disappears:
    toyForm.style.display = "none";
  }
});

//

function init() {
  getToys().then(allToys);
}

init();
