//////////////////////////////////////////////////////
/*               FREQ USED VARIABLES                */
//////////////////////////////////////////////////////

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyColl = document.querySelector('#toy-collection')
const URL = "http://localhost:3000/toys"
let newToy = false


//////////////////////////////////////////////////////
/*                EVENT LISTENERS                   */
//////////////////////////////////////////////////////

//Show or Hide create new toy form onclick
addBtn.addEventListener('click', () => {
  newToy = !newToy
  if (newToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


//Add new toy to database and DOM on form submit
toyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let newName = toyForm.querySelector("input[name='name']").value
  let newImage = toyForm.querySelector("input[name='image']").value

  createToy(newName, newImage)
    .then(addToy)
})

//Whole document event listeners
document.addEventListener('click', (event) => {
  //Add new like to database and DOM on like button click
  if (event.target.className == "like-btn") {
    let toyId = event.target.value
    let likeCount = document.querySelector("#toy-id-" + `${toyId}` + " p").dataset.likes
    let newlikeCount = parseInt(likeCount) + 1

    createLike(toyId, newlikeCount)
      .then(addLike(toyId, newlikeCount))
  }

  //Delete a character from the database and the DOM on click
  if (event.target.className == "del-btn") {
    var conf = confirm("This will delte the character FOREVER. Are you sure?")
    if (conf == true) {
      let toyId = event.target.value

      destroyToy(toyId)
        .then(deleteToy(toyId))
    }
  }
})


//////////////////////////////////////////////////////
/*                   DOM STUFF                     */
//////////////////////////////////////////////////////

//Adds a toy to the DOM
function addToy(toy) {
  const toyDiv = document.createElement('div')
  toyDiv.className = "card"
  toyDiv.id = `toy-id-${toy.id}`

  toyDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class="toy-avatar" />
  <p data-likes='${toy.likes}'>${toy.likes} Likes </p>
  <button value="${toy.id}" class="like-btn">♡</button>
  <button value="${toy.id}" class="del-btn">Delete</button>
  `
  toyColl.appendChild(toyDiv)
}

//Loops through all toys adding them to the DOM
function addToys(toys) {
  toys.forEach(addToy)
}

//Updates like count in DOM
function addLike(toyId, newlikeCount) {
  let likeEl = document.querySelector("#toy-id-" + `${toyId}` + " p")
  likeEl.dataset.likes = newlikeCount
  likeEl.innerText = `${newlikeCount} Likes`
}

//Removes the toy from the DOM
function deleteToy(toyId) {
  let toyEl = document.querySelector("#toy-id-" + `${toyId}`)
  toyEl.remove()
}


//////////////////////////////////////////////////////
/*                   SERVER STUFF                   */
//////////////////////////////////////////////////////

//Fetches all toys from DB
function fetchToys() {
  return fetch(URL)
    .then(resp => resp.json())
}

//Creates new toy in DB
function createToy(name, image) {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }).then(resp => resp.json())
}

//Updates like count in DB
function createLike(id, newlikes) {
  return fetch(URL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newlikes
    })
  }).then(resp => resp.json())
}

//Deletes the toy from the DB
function destroyToy(toyId) {
  return fetch(URL + `/${toyId}`, {
    method: "DELETE"
  }).then(resp => resp.json())
}


//////////////////////////////////////////////////////
/*                   INITIALISE                     */
//////////////////////////////////////////////////////

//Runs the page
function initialise() {
  fetchToys()
    .then(addToys)
}

//One function to run them all.
initialise()
