const http = require('http');
const getSystemInfo = require('./systemInfo');
const logVisitor = require('./logVisitor');
const getLogFile = require('./readLogFile');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/system-info') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(getSystemInfo()));
      } else if (req.url === '/log-visit') {
        const visitorData = `Visitor at ${new Date().toISOString()}`;
        logVisitor(visitorData);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Visit logged');
      } else if (req.url === '/show-log') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(getLogFile());
      } else if (req.url === '/') {
        const studentInfoPath = path.join(__dirname, 'studentInfo.html');
        fs.readFile(studentInfoPath, (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading student information');
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
          }
        });
      } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});