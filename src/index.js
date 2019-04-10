document.addEventListener("DOMContentLoaded", () => {
  renderToys()
});

const toys_url = 'http://localhost:3000/toys'
const toyCon = document.querySelector('#toy-collection')
const toyFrm = document.querySelector('.add-toy-form')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

toyFrm.querySelector('.submit').addEventListener('click', (event) =>{
  const toy = {
    name: toyFrm.name.value,
    image: toyFrm.image.value,
    likes: 0
  }
  createToy(toy)
  renderToy(toy)

})

let addToy = false
//
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!

//get toys from api
function getToys() {
  return fetch(toys_url)
  .then(resp => resp.json())
}

//add a single toy

function renderToy(toy) {
  divEL = document.createElement('div')
  divEL.className = 'card'
  divEL.innerHTML = `

  <h2>${toy.name}</h2>
  <img src='${toy.image}'class="toy-avatar" />
  <p class = "likes">${toy.likes} </p>
  <button class="like-btn">Like <3</button>

  `
  toyCon.appendChild(divEL)

  const likeBtn = divEL.querySelector('.like-btn')
  const toyLikes = divEL.querySelector('.likes')
  likeBtn.addEventListener('click', (event) =>{
    toy.likes ++
    toyLikes.innerHTML =
    `
    <p class = "likes">${toy.likes} </p>
    `

    updateToy(toy)
  })
}

function renderToys() {
  getToys()
  .then(toys => toys.forEach(renderToy))
}


function createToy(toy) {
  return fetch(toys_url, {
    method: 'POST',
    headers: { 'Content-type':'application/json' },
    body: JSON.stringify(toy)
  })
}

function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-type':'application/json' },
    body: JSON.stringify(toy)
  })
}
