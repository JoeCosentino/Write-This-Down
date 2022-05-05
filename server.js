const express = require('express');
const app = express();

const { data } = require('./Develop/db/db.json');

app.get('/api/data', (req, res) => {
    let results = data;
    console.log(req.query);
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});