const toysUrl = 'http://localhost:3000/toys'

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// new toy form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(e) {
      e.preventDefault()
      let toy = createToy(e.target.name.value, e.target.image.value)
        .then(addCard)
      debugger;
    });
  } else {
    toyForm.style.display = 'none'
  }
})

// adding toy cards
function addCard (toy) {
  toyCollection.append(createCard(toy))
}

function createCard (toy) {
  cardEl = document.createElement('div')
  cardEl.className = 'card'
  cardEl.dataset.id = toy.id
  cardEl.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`
  return cardEl
}

// adding new toys
function createToy(name, image) {
  const body = {name: name, image: image, likes: 0}
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  }

  return fetch(toysUrl, config)
    .then(res => res.json())
}

// likes
document.addEventListener('click', function(e) {
  if (e.target.className === 'like-btn') {
    likeCount = parseInt(e.target.previousElementSibling.innerText)
    likeCount ++
    addLike(e.target.parentElement.dataset.id, likeCount)
    e.target.previousElementSibling.innerText = `${likeCount} Likes`
  }
});

function addLike (id, newCount) {
  const config = {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:
    JSON.stringify({ "likes": newCount })
  }

  fetch(`${toysUrl}/${id}`, config)
}

// page load
fetch(toysUrl)
.then(res => res.json())
.then(json => json.forEach(toy => {
  addCard(toy)
}))
