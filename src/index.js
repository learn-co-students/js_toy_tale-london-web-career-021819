const url = "http://localhost:3000/toys"

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('div#toy-collection')
let addToy = false

//show toys
function displayToys(toys) {
  toys.forEach(displayToy)
}

function displayToy(toy) {
  const div = document.createElement('div')
  div.className = "card"
  div.innerHTML =
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button class="like-btn" data-toy-id="${toy.id}">Like <3</button>`

  toyCollection.appendChild(div)
}


//main button form listener
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    createToyListener()
  } else {
    toyForm.style.display = 'none'
  }
})


//Add and submit toy listener
function createToyListener() {
  addToyForm.addEventListener('submit', event => {
    event.preventDefault()
    const toy = {}
    const newToyName = addToyForm.name.value
    const newToyImage = document.querySelector('input[name="image"]').value //longer way
    toy.name = newToyName
    toy.image = newToyImage
    createToy(toy)
    .then(displayToy)
  })
}


// Edit likes listener
function globalLikesListener() {
  document.addEventListener("click", event => {
    if (event.target.className == 'like-btn') {

      const toyID = event.target.getAttribute('data-toy-id')
      const toyName = event.target.parentElement.querySelector('h2').innerHTML
      const toyImage = event.target.parentElement.querySelector('img').src

      let likesCount = parseInt(event.target.parentElement.querySelector('p').innerHTML)+1

      const toy = {
        "id": toyID,
        "name": toyName,
        "image": toyImage,
        "likes": likesCount
      }

      updateToy(toy)

      event.target.parentElement.querySelector('p').innerHTML = `${likesCount} Likes`
    }
  })
}


//*****SERVER*****

//fetch all toys from the server
function getToys() {
  return fetch(url)
    .then(response => response.json())
}

//create toy on the server
function createToy(toy) {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name,
      "image": toy.image,
      "likes": 0
    })
  }).then(response => response.json())
}

//edit (add like) toy in the server
function updateToy(toy) {
  return fetch(url + `/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(response => response.json())
}




//*****ALL FUNCTIONS*****
function init() {
  globalLikesListener()
  getToys()
    .then(displayToys)
}

init()
