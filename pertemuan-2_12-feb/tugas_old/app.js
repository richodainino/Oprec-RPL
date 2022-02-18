const path = require('path');

const express = require('express');
const app = express();
const port = 8000;

let movies = [];

const newMoviePage = path.join(__dirname, 'public/html/new-movie.html');

// Untuk header application/json
app.use(express.json());
// Untuk header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.post('/movie', (req, res) => {
  const movie = req.body;
  
  movies.push(movie);
  console.log(movies);

  res.status(200).send('Movie is added to the database');
});

app.get('/', (req, res) => {
  res.status(200).sendFile(newMoviePage);
});

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.listen(port, () => {
  console.log(`Movies API is listening on port ${port}`);
});