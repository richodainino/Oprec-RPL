const express = require('express');
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const config = require('./config');

// Untuk header application/json
app.use(express.json());
// Untuk header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(config.dbUri);
    app.listen(config.port, console.log(`Server is listening on port ${config.port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();