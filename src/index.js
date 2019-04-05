const BASE_URL = "http://localhost:3000";
const TOYS_URL = `${BASE_URL}/toys`

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitToy = toyForm.getElementsByClassName("submit")[0]
const toyDiv = document.getElementById('toy-collection')

let addToy = false



// EVENT LISTENERS    EVENT LISTENERS    EVENT LISTENERS    EVENT LISTENERS    EVENT LISTENERS    EVENT LISTENERS    

document.addEventListener('click', function(event)
{
  if (event.target.className !== 'like-btn') return
  const buttonCardId = parseInt(event.target.id);
  const thisCard = document.querySelector(`[data-id='${buttonCardId}']`)
  const likesEl = thisCard.getElementsByClassName("likes")[0];
  const likes = parseInt(likesEl.innerText)
  const newLikes = {likes: likes + 1}

  incrementLikes(buttonCardId, newLikes)
  .then(function(data)
  {
    if (data.error) {
      alert(data.error);
    }else
    {
      likesEl.innerText = `${newLikes.likes} Likes`
    }
  })

})

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


submitToy.addEventListener('click', function(event)
{
  event.preventDefault()
  const name = toyForm.getElementsByClassName("input-text")[0].value;
  const image = toyForm.getElementsByClassName("input-text")[1].value;
  toyObj = {name: name, image: image, likes: 0}
  addNewToy(toyObj)
  .then(function(data)
  {
    if(data.error)
    {
      alert(data.error)
    }else
    {
      addToyToPage(data)
    }
  })
  toyForm.style.display = "none";
})

// FUNCTIONS      // FUNCTIONS      // FUNCTIONS      // FUNCTIONS      // FUNCTIONS      

function incrementLikes(id, newLikes)
{
  return fetch(`${TOYS_URL}/${id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:
      JSON.stringify(newLikes)
  })
}

function addNewToy(toy)
{
  return fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(function(response)
  {
    return response.json()
  })
}

function getToys()
{
  return fetch(TOYS_URL)
  .then(function(response)
  {
    return response.json()
  })
}

function addToys(toys)
{
  toys.forEach(addToyToPage)
}

function addToyToPage(toy)
{
  cardEl = document.createElement('div')
  cardEl.className = 'card'
  cardEl.dataset.id = toy.id

  cardEl.innerHTML = 
  `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" style="width:250px;">
  <p class="likes">${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}-like-button">Like</button>
  `
  toyDiv.appendChild(cardEl)
}

function init()
{
  getToys()
  .then(addToys)
}

init()