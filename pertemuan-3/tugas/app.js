const express = require('express');
const app = express();
const movies = require("./routes/movies");
require("dotenv").config();
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

// Untuk header application/json
app.use(express.json());
// Untuk header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/movies", movies);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();