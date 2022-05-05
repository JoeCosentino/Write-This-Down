const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

const { data } = require('./Develop/db/db.json');

function findById(id, dataArray) {
    console.log(dataArray);
    const result = dataArray.filter(note => note.id === id);
    return result;
}

app.get('/api/data', (req, res) => {
    let results = data;
    // console.log(req.query);
    res.json(results);
});

app.get('api/data/:id', (req, res) => {
    const result = findById(req.param.id, data);
    console.log(data);
    console.log(result);
    res.json(result);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});