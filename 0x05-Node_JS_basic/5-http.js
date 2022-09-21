const http = require('http');

const students = require('./3-read_file_async');
const hostname = '127.0.0.1';
const port = 1245;

let app = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  }
  else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    students(process.argv[2]).then((data) => {
      res.write(`Number of students: ${data.students.length}\n`);
      res.write(`Number of students in CS: ${data.Studentsincs.length}. List: ${data.Studentsincs.join(', ')}\n`);
      res.write(`Number of students in SWE: ${data.Studentsinsw.length}. List: ${data.Studentsinsw.join(', ')}`);
      res.end();
    }).catch((err) => res.end(err.message));
  }
});

module.exports = app;
