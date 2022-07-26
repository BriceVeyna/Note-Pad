const express = require('express');
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);
                notes = parsedNotes;

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in adding note')
    }
});

app.get('/api/notes', (req, res) => {
    console.log(notes);
    res.json(notes);
    console.info(`${req.method} request received to get notes`);
})

app.get('/api/notes/:id', (req, res) => {
    if (req.body && req.params.id) {
        console.info(`${req.method} request received to get a single note`);
        const noteId = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = note[i];
            if(currentNote.id === noteId) {
                res.json(currentNote);
                return;
            }
        }
        res.json('Note ID not found');
    }
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);