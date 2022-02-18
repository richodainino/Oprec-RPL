const express = require('express');
const app = express();
const port = 8000;

const path = require('path');

const moviesRoutes = require('./routes/movies');
const newMoviePage = path.join(__dirname, 'public/html/new-movie.html');

// Untuk header application/json
app.use(express.json());
// Untuk header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use('/movies', moviesRoutes);
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(newMoviePage);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});