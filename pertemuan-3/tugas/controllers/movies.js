const Movie = require("../models/Movie");

// Metode POST
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ movie: movie });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const searchText = req.query.search;
    const regex = new RegExp(searchText, 'gi');
    const movies = await Movie.find({ title: regex });
    res.status(200).json({
      success: true,
      data: {
        movies: movies,
        amount: movies.length,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const movie = await Movie.findOne({ _id: movieID });
    if (!movie) {
      return res.status(404).json({ msg: `No movie with id: ${movieID}` });
    }
    res.status(200).json({ movie: movie });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const movie = await Movie.findOneAndDelete({ _id: movieID });
    if (!movie) {
      return res.status(404).json({ msg: `No movie with id: ${movieID}` });
    }
    res.status(200).json({ movie: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* Metode PATCH */
const updateMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const movie = await Movie.findOneAndUpdate({ _id: movieID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ msg: `No movie with id: ${movieID}` });
    }
    res.status(200).json({ movie: movie });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* Metode PUT */
const editMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const movie = await Movie.findOneAndUpdate({ _id: movieID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!movie) {
      return res.status(404).json({ msg: `No movie with id: ${movieID}` });
    }
    res.status(200).json({ movie: movie });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie, editMovie };