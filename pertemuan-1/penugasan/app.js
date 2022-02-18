const fs = require('fs');
const http = require('http');
const path = require('path');

const cvPage = fs.readFileSync('./public/html/cvPage.html');
const contactPage = fs.readFileSync('./public/html/contactPage.html');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(cvPage);
      res.end();
    }
    else if (req.url === '/contact') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(contactPage);
      res.end();
    }
    else if(req.url.match("\.css$")){
      const csspath = path.join(__dirname, 'public/css', req.url);
      const filestream = fs.createReadStream(csspath);
      res.writeHead(200, {"Content-Type":"text/css"});
      filestream.pipe(res);
    }
    else if(req.url.match("\.js$")){
      const jspath = path.join(__dirname, 'public/js', req.url);
      const filestream = fs.createReadStream(jspath);
      res.writeHead(200, {"Content-Type":"text/javascript"});
      filestream.pipe(res);
    }
    else if(req.url.match("\.jpg$")){
      const jpgpath = path.join(__dirname, 'public/assets/image', req.url);
      const filestream = fs.createReadStream(jpgpath);
      res.writeHead(200, {"Content-Type":"image"});
      filestream.pipe(res);
    }
    else if(req.url.match("\.png$")){
      const pngpath = path.join(__dirname, 'public/assets/image', req.url);
      const filestream = fs.createReadStream(pngpath);
      res.writeHead(200, {"Content-Type":"image"});
      filestream.pipe(res);
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Page Not Found');
      res.end();
    }
  } 
  else if (req.method === 'POST' && req.url === '/contact') {
    let body = '';

    req.on('data', data => {
      body += data;
      if (body.length > 1e6)
        req.socket.destroy();
      });
    
    req.on('end', () => {
      const postData = new URLSearchParams(body);
      const postString = `Full Name\t\t: ${postData.get('username')}\nEmail\t\t\t: ${postData.get('email')}\nPhone Number\t: ${postData.get('phoneNumber')}\nMessage\t\t\t: ${postData.get('message')}\n\n`;
      fs.appendFile(
        "./content/postResult.txt", postString, 'utf8', (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(contactPage);
    res.end();
  }
  else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.write('Method is not Supported');
    res.end();
  }
});

server.listen(8000);