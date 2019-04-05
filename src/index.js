const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysEl = document.getElementById('toy-collection')
const toyUrl = 'http://localhost:3000/toys'
const addToyForm = document.querySelector('.add-toy-form')
// YOUR CODE HERE

function presentToy(toy) {
  const cardEl = document.createElement('div')
    cardEl.className = 'card'
    cardEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class='likes'>${toy.likes} likes </p>
    <button class="like-btn"> Like ❤️</button><button class="dislike-btn" style="background: black"> Dislike 💔</button>
    `
    toysEl.appendChild(cardEl)

    const likeBtn = cardEl.querySelector('.like-btn')
    const likeEl = cardEl.querySelector('.likes')
    likeBtn.addEventListener('click', () => {
      toy.likes++
      updateToy(toy)
        .then(() => {likeEl.innerText = `${toy.likes} likes`})
    })
    const disLikeBtn = cardEl.querySelector('.dislike-btn')
    const disLikeEl = cardEl.querySelector('.likes')
    disLikeBtn.addEventListener('click', () => {
      toy.likes--
      updateToy(toy)
        .then(() => {likeEl.innerText = `${toy.likes} likes`})
    })
}

function createToy(toy) {
  return fetch(toyUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function getToys() {
  return fetch(toyUrl)
    .then (res => res.json())
    .then (toys => toys.forEach(presentToy))
}

function updateToy(toy) {
  return fetch(toyUrl + `/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

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

addToyForm.addEventListener('submit', e => {
  e.preventDefault();

  const toy = {
    name: addToyForm.name.value,
    image: addToyForm.image.value,
    likes: 0
  }
  createToy(toy)
    .then(presentToy)
    addToyForm.reset()
    toyForm.style.display = 'none'
})

// OR HERE!
getToys();
