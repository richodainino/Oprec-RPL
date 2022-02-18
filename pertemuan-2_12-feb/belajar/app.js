const express = require('express');
const app = express();

const settings = require('./routes/settings');
const dashboard = require('./routes/dashboard');
const blogs = require('./routes/blogs');

const port = 8000;

app.use('/', dashboard);
app.use('/blogs', blogs);
app.use('/settings', settings);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});