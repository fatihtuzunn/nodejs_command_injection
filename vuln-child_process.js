const { exec } = require('child_process');
const express = require('express');
const app = express();
const path = require('path');

app.get('/read-log', (req, res) => {
  const file = req.query.file || 'default.log';

  // Vulnerable command
  const command = `type ${file}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
