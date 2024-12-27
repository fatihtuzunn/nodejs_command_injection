const { execFile } = require('child_process');
const express = require('express');
const app = express();
const path = require('path');

function isValidFilename(file) {
    return /^[a-zA-Z0-9_.-]+$/.test(file);
}

app.get('/read-log', (req, res) => {
    const file = req.query.file || 'default.log';
    if (!isValidFilename(file)) {
        return res.status(400).send('Invalid file name.');
    }
    execFile('type', [file], (err, stdout, stderr) => {
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
