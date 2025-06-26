// seed.js
use("test_db");
const users = [
  {
    "_id": "01",
    "email": "user1@pnp.com",
    "name": "user1",
    "noteIds": ["101", "111"]
  },
  {
    "_id": "02",
    "email": "user2@pnp.com",
    "name": "user2",
    "noteIds": ["106"]
  },
  {
    "_id": "03",
    "email": "user3@pnp.com",
    "name": "user3",
    "noteIds": ["102", "113"]
  },
  {
    "_id": "04",
    "email": "user4@pnp.com",
    "name": "user4",
    "noteIds": ["107"]
  },
  {
    "_id": "05",
    "email": "user5@pnp.com",
    "name": "user5",
    "noteIds": ["103"]
  },
  {
    "_id": "06",
    "email": "user6@pnp.com",
    "name": "user6",
    "noteIds": ["108"]
  },
  {
    "_id": "07",
    "email": "user7@pnp.com",
    "name": "user7",
    "noteIds": ["104", "112"]
  },
  {
    "_id": "08",
    "email": "user8@pnp.com",
    "name": "user8",
    "noteIds": ["109"]
  },
  {
    "_id": "09",
    "email": "user9@pnp.com",
    "name": "user9",
    "noteIds": ["105"]
  },
  {
    "_id": "10",
    "email": "user10@pnp.com",
    "name": "user10",
    "noteIds": ["110"]
  }
]
const notes = [
{
  "_id": "101",
  "title": "Dept. of Mathematics",
  "content": "Considering Imaginary Numbers. LHS no more equal to RHS",
  "author": "user1",
  "tags": ["#maths","#imaginary_numbers"],
  "createdAt": "2025-06-17T15:00:09Z"
},
{
  "_id": "102",
  "title": "Dept. of Physics",
  "content": "New Observation: extra Force detected",
  "author": "user3",
  "tags": ["#physics","#force", "#new", "#finding"],
  "createdAt": "2025-06-17T15:17:44Z"
},
{

  "_id": "103",
  "title": "Dept. of E-Commerce",
  "content": "Update the Merchandise List, with article No: 44555 and 77788",
  "author": "user5",
  "tags": ["#ecommerce","#list", "#merchandise", "#44555", "#77788"],
  "createdAt": "2025-06-18T06:02:43Z"
},
{
  "_id": "104",
  "title": "HR",
  "content": "Training New Recruit in Physics Dept.",
  "author": "user7",
  "tags": ["#physics","#new", "#recruit", "#training", "#hr"],
  "createdAt": "2025-06-18T06:19:20Z"
},
{
  "_id": "105",
  "title": "Dept. of Computer Science",
  "content": "A new bug found. Will Update soon",
  "author": "user9",
  "tags": ["#new","#bug", "#cs"],
  "createdAt": "2025-06-18T07:02:11Z"
},
{
  "_id": "106",
  "title": "Dept. of Mathematics",
  "content": "Possible solution. Factor in squares.",
  "author": "user2",
  "tags": ["#maths","#imaginary_numbers", "#solution"],
  "createdAt": "2025-06-18T07:05:09Z"
},
{
  "_id": "107",
  "title": "Dept. of Physics",
  "content": "Were apparatus calibrated?",
  "author": "user4",
  "tags": ["#physics","#apparatus"],
  "createdAt": "2025-06-18T08:55:01Z"
},
{
  "_id": "108",
  "title": "Dept. of E-Commerce",
  "content": "We do not have them in Inventory!",
  "author": "user6",
  "tags": ["#ecommerce","#inventory"],
  "createdAt": "2025-06-18T09:00:37Z"
},
{
  "_id": "109",
  "title": "HR",
  "content": "Considering Imaginary Numbers. LHS no more equal to RHS",
  "author": "user8",
  "tags": ["#hr","#new_recruit"],
  "createdAt": "2025-06-18T09:11:11Z"

},
{
  "_id": "110",
  "title": "Dept. of Computer Science",
  "content": "Bug: Can be reason for unsual Observation",
  "author": "user10",
  "tags": ["#cs","#bug", "#physics"],
  "createdAt": "2025-06-18T09:28:08Z"
},
{
  "_id": "111",
  "title": "Dept. of Mathematics",
  "content": "Already tried! No Luck. Need a Second Opinion",
  "author": "user1",
  "tags": ["#maths","#help"],
  "createdAt": "2025-06-18T09:30:51Z"
},
{
  "_id": "112",
  "title": "HR",
  "content": "Prof. Downry is",
  "author": "user7",
  "tags": ["#hr","#recruit"],
  "createdAt": "2025-06-18T09:35:36Z"
},
{
  "_id": "113",
  "title": "Dept. of Physics",
  "content": "We will until the bug is fixed",
  "author": "user3",
  "tags": ["#physics","#cs", "#bug"],
  "createdAt": "2025-06-18T09:43:43Z"
}

]

users.forEach(user => {
  db.users.insertOne(user); // Replace `users` with your collection
});

notes.forEach(note => {
  db.notes.insertOne(note); // Replace `users` with your collection
});
