noteTitle = document.getElementsByClassName('note-title');
noteText = document.getElementsByClassName('note-textarea');
addNote = document.getElementsByClassName('new-note');
saveNote = document.getElementsByClassName('save-note');

const emptyNote = () => {
    noteTitle.value = '';
    noteText.value = '';
};

const postNote = (note) =>
    
    fetch(`http://localhost${PORT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Successful POST request:', data);

        emptyNote();
        return data;
    })
    .catch((error) => {
        console.log('Error in POST request:', error);
    });

const getNotes = () =>

    fetch(`http://localhost${PORT}`, {
        method: 'GET',
    })
    .then((data) => {
        console.log('Successful GET request:', data);

    })
saveNote.addEventListener('click', () => {

    const newNote = {
        title: noteTitle.value.trim(),
        text: noteText.value.trim()
    };

    postNote(newNote)
        .then(alert(`Note added!`))
        .catch((err) => console.error(err))
});

getNotes();