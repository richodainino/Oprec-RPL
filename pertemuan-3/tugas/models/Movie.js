const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide title"]
  },
  genre: {
    type: String,
    required: [true, "Must provide genre"]
  },
  releaseDate: {
    type: Date,
    required: [true, "Must provide release date"]
  },
  runningTime: {
    type: Number,
    required: [true, "Must provide running time"]
  },
  synopsis: {
    type: String,
    required: [true, "Must provide synopsis"]
  },
});

module.exports = mongoose.model("Movie", MovieSchema);