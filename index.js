const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());


let users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];


app.get('/users', (req, res) => {
  res.send(users);
});


app.get('/users/:name', (req, res) => {
  const name = req.params.name;
  const user = users.find(user => user.name === name);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
});


app.post('/users', (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).send('Name and age are required');
  }

  const newUser = { name, age };
  users.push(newUser);

  res.status(201).send(newUser);
});


app.put('/users/:name', (req, res) => {
  const name = req.params.name;
  const userIndex = users.findIndex(user => user.name === name);

  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }

  const { age } = req.body;

  if (!age) {
    return res.status(400).send('Age is required');
  }

  users[userIndex].age = age;

  res.send(users[userIndex]);
});


app.delete('/users/:name', (req, res) => {
  const name = req.params.name;
  const userIndex = users.findIndex(user => user.name === name);

  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }

  users.splice(userIndex, 1);

  res.send();
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
