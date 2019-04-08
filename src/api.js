
function getToys () {
  return fetch('http://localhost:3000/toys/')
  .then(response => response.json())
 }

 function createToy (toy) {
  return fetch('http://localhost:3000/toys/', {
   method: "POST",
   headers: {
     "Content-Type": "application/json"
   },
   body: JSON.stringify(toy)
 }).then(response => response.json())
 }

 function deleteToy (toy) {
   return fetch('http://localhost:3000/toys/' + `/${toy.id}`, {
     method: "DELETE",
   }).then(response => response.json())
 }

 function updateToy(toy) {
   return fetch('http://localhost:3000/toys/' + `/${toy.id}` , {
     method: 'PATCH',
     headers: {    "Content-Type": "application/json" },
     body: JSON.stringify(toy)
   }).then(response => response.json())
 }
