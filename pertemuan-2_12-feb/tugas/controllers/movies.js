const fs = require('fs');

module.exports.getAllMovies = (req, res) => {
  const searchText = req.query.search;
  const movies = getMovieData();
  
  if (searchText) {
    const searchedMovie = movies.filter(movie => {
      const regex = new RegExp(searchText, 'gi');
      return movie.title.match(regex);
    });
    
    return res.status(200).send(searchedMovie);
  }
  
  res.status(200).send(movies);
};

module.exports.createMovie = (req, res) => {
  const movieToAdd = req.body;
  let movies = getMovieData();
  
  if (!movies.some(movie => movie.title.match(movieToAdd.title))){
    movies.push(movieToAdd);
    saveMovieData(movies);
    res.status(200).send(`Movie with the title ${movieToAdd.title} added to the database!`);
  }
  else {
    res.status(409).send(`Movie with the title ${movieToAdd.title} is already in the database!`);
  }
};

module.exports.getMovie = (req, res) => {
  const selectedTitle = req.params.title;
  const movies = getMovieData();

  if (movies.some(movie => movie.title.match(selectedTitle))) {
    const matchMovie = movies.find(movie => movie.title.match(selectedTitle));
    res.status(200).send(matchMovie);
  }
  else {
    res.status(404).send(`Movie with the title ${selectedTitle} is not in the database!`);
  }
};

module.exports.deleteMovie = (req, res) => {
  const selectedTitle = req.params.title;
  let movies = getMovieData();

  if (movies.some(movie => movie.title.match(selectedTitle))) {
    movies = movies.filter(movie => !movie.title.match(selectedTitle));
    saveMovieData(movies);
    res.status(200).send(`Movie with the title ${selectedTitle} deleted from the database!`);
  }
  else {
    res.status(404).send(`Movie with the title ${selectedTitle} is not in the database!`);
  }
};

module.exports.updateMovie = (req, res) => {
  const selectedTitle = req.params.title;
  const { title, genre, releaseDate, runningTime, synopsis } = req.body;
  let movies = getMovieData();
  
  if (movies.some(movie => movie.title.match(selectedTitle))) {
    let movieToBeUpdated = movies.find(movie => movie.title.match(selectedTitle));
  
    if (title) movieToBeUpdated.title = title;
    if (genre) movieToBeUpdated.genre = genre;
    if (releaseDate) movieToBeUpdated.releaseDate = releaseDate;
    if (runningTime) movieToBeUpdated.runningTime = runningTime;
    if (synopsis) movieToBeUpdated.synopsis = synopsis;
    
    saveMovieData(movies);

    res.status(200).send(`Movie with the title ${selectedTitle} has been updated!`);
  }
  else {
    res.status(404).send(`Movie with the title ${selectedTitle} is not in the database!`);
  }
};

const saveMovieData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('movies.json', stringifyData)
}

const getMovieData = () => {
  const jsonData = fs.readFileSync('movies.json')
  return JSON.parse(jsonData)    
}