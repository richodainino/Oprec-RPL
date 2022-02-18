const { readFileSync } = require('fs');
const http = require('http');

const homePage = readFileSync('./index.html');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write(homePage);
      res.end();
    } else if (req.url === '/about') {
      res.write('about');
      res.end();
    }
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 400;
    res.write('METHOD IS NOT SUPPORTED');
    res.end();
  }
});

server.listen(8000);