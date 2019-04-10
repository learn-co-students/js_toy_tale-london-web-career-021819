const toysURL = "http://localhost:3000/toys"
const toyFormInput = document.getElementById('add-toy-form')

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

function addNewToyButtonListener(){
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let submitbutton = document.getElementById('submit')
    submitbutton.addEventListener('click', event => {
      event.preventDefault()
        let editedToy = {
          name: toyFormInput.name.value,
          image: toyFormInput.image.value,
          likes: 0
        }
        createToy(editedToy)
        .then(response => renderPage())
        toyFormInput.reset()
  } ) }
  else {
    toyForm.style.display = 'none'
  } } )
}

/// FETCH DOGS
function fetchToys() {
  return fetch(toysURL)
  .then(response => response.json())
}

/// ADD NEW TOY
function createToy (toy) {
	return fetch(toysURL,{
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
    }).then(resp => resp.json())
}

/// UPDATE LIKES
function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-type':'application/json' },
    body: JSON.stringify(toy)
  })
}

/// CREATE TOY GRID
function createToyGrid(toy){
  let gridEl = document.getElementById('toy-collection')

  let toyEl = document.createElement('div')
  toyEl.dataset.id = toy.id
  toyEl.className = 'card'
  toyEl.innerHTML = ` <h2> ${toy.name}</h2>
                      <img src=${toy.image} class="toy-avatar" />
                      <p class="likes" id="likes-${toy.name}"> ${toy.likes} Likes </p>
                      <button id="like-button-${toy.name}" class="like-btn"> Like <3</button>
                    `
  gridEl.appendChild(toyEl)

  const likeBtn = toyEl.querySelector('.like-btn')
  const likeEl = toyEl.querySelector('.likes')
   likeBtn.addEventListener('click', () => {
     toy.likes++
     likeEl.innerText = `${toy.likes} Likes`
     updateToy(toy)
     .then(() => {likeEl.innerText = `${toy.likes} Likes`} ) } )
}

/// RENDER PAGE
function renderPage() {
  document.getElementById('toy-collection').innerHTML = ""
  fetchToys()
  .then(toys => toys.
  forEach(toy => createToyGrid(toy)))
}

//// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  renderPage()
  addNewToyButtonListener()
})
