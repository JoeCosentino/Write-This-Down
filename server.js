const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { data } = require('./Develop/db/db.json');

function findById(id, dataArray) {
    // console.log(dataArray);
    const result = dataArray.filter(note => note.id === id);
    return result;
}

// the body param here should accept the post route's req.body, and the dataArray is the array we want to add the data too.
function createNewNote(body, dataArray) {
    const note = body;
    dataArray.push(note);
    fs.writeFileSync(
        // __dirname represents the directory of the file we execute the code in, and then linked ot he path to the db.json file
        // so path.join is literally joining those two paths so that data can be sent between them
        path.join(__dirname, './Develop/db/db.json'),
        //
        JSON.stringify({ data: dataArray }, null, 2)
    );

    // return finished code to post route for response
    return note;
}

app.get('/api/data', (req, res) => {
    let results = data;
    // console.log(req.query);
    res.json(results);
});

app.get('/api/data/:id', (req, res) => {
    const result = findById(req.params.id, data);
    // console.log(data);
    // console.log(result);
    res.json(result);
})

app.post('/api/data', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = data.length.toString();

    // add note to json file and dataArray in this function
    const note = createNewNote(req.body, data);

    // req.body is where our incoming content will be
    // console.log(note);
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});