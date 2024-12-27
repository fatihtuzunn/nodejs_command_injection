const { execFile } = require('child_process');
const express = require('express');
const app = express();
const path = require('path');

app.get('/read-log', (req, res) => {
  const file = req.query.file || 'default.log';

  // Safely execute the command
  execFile('type', [file], (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: you dont have the access`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
