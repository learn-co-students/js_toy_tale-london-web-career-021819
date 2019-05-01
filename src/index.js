const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionPlace = document.querySelector("#toy-collection")
let addToy = false

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


//1. Get information from server
const getToys = () => fetch("http://localhost:3000/toys")
                .then(resp => resp.json())
//2.Render Information
  //2a. Render 1 toy
const renderToy = toy => {
  toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
  <h2>'${toy.name}'</h2>
  <img src = '${toy.image}' class='toy-avatar'/>
  <p>${toy.likes}</p>
  <button class='like-btn'>Like</button>
  `
  toyCollectionPlace.append(toyCard)
  //like button

  likeToy(toyCard, toy)
}
      //LIKE toy function
const likeToy = (toyCard, toy) => {
  const likeButton = toyCard.querySelector('.like-btn')
  const likes = toyCard.querySelector('p')
  // debugger
  let number = parseInt(`${toy.likes}`)
  toyCard.addEventListener('click', () => {
    number ++
    return fetch(`http://localhost:3000/toys/${toy.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({likes: number})
    }
    ).then(res => res.json).then(likes.innerText = number)
    }
 )}



  //2b. Render all Toys
const renderToys = toys => {
  toys.forEach(toy => renderToy(toy))
}

//3.Submit new toy
  //3a. Find the form
  const newToyForm = document.querySelector('.add-toy-form')
  //3b. Add event listener
  newToyForm.addEventListener('submit', event => {
    event.preventDefault()
    const toy = {
                  name: newToyForm.name.value,
                  image: newToyForm.image.value,
                  likes: 0
                }
    newToy(toy)
    renderToy(toy)
  })

  //3c. function used to post the information to the server
const newToy = toy => {
  return fetch('http://localhost:3000/toys',
        {
        method: 'POST',
        headers:
          {'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        body: JSON.stringify(toy)
        })
      .then(resp => resp.json())
  }



//initialize
init = () => {
  getToys().then((toys) => renderToys(toys))
}

init()
