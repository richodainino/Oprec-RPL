const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  editMovie,
  deleteMovie,
} = require("../controllers/movies");

router.route("/")
  .get(getAllMovies)
  .post(createMovie);
router.route("/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie)
  .put(editMovie);

module.exports = router;