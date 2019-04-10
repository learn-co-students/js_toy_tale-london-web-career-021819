

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysEl = document.getElementById('toy-collection')
const oForm = document.querySelector('.add-toy-form');
const submitbttn = document.getElementById('submitit')
const deletebtn = document.getElementById('dlt')
let addToy = false

function addToyToPage (toy) {

    let cardEl = document.createElement('div')
    cardEl.className = 'card'
    cardEl.innerHTML = `
             <h2>${toy.name}</h2>
             <img src=${toy.image} class="toy-avatar" />
             <p class='likes'> ${toy.likes} Likes </p>
             <button class="like-btn">Like <3</button>
             <button class="delete-me" id="dlt">Delete</button>
                       `
    toysEl.appendChild(cardEl)

    const likeBtn = cardEl.querySelector('.like-btn')
    const likeEl = cardEl.querySelector('.likes')
    likeBtn.addEventListener('click', () => {
      toy.likes++
      likeEl.innerText = `${toy.likes} Likes`
      updateToy(toy)
      .then(() => {likeEl.innerText = `${toy.likes} Likes`})
    })

    cardEl.addEventListener("click", (event) => {
      if (event.target.className === "delete-me") {
        event.target.parentElement.remove();
        deleteToy(toy)
      }
    })
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

submitbttn.addEventListener('click', (event) => {
  event.preventDefault();

  const toy = {
  name: oForm.name.value,
  image: oForm.image.value,
  likes: 0
}
  createToy(toy)
  .then(addToyToPage(toy))
  oForm.reset()
})

function addToys (toys) {
  toys.forEach(addToyToPage)
}

  getToys()
  .then(addToys)
