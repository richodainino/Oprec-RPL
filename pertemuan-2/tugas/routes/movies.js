const express = require('express');
const router = express.Router();

const { getAllMovies, createMovie, getMovie, deleteMovie, updateMovie } = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', createMovie);

router.get('/:title', getMovie);

router.delete('/:title', deleteMovie);

router.patch('/:title', updateMovie);

module.exports = router;