noteTitle = document.getElementsByClassName('note-title');
noteText = document.getElementsByClassName('note-textarea');
addNote = document.getElementsByClassName('new-note');
saveNote = document.getElementsByClassName('save-note');
noteList = document.getElementsByTagName('li');

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

const getNote = (ID) =>

    fetch(`http://localhost${PORT}/api/notes/${ID}`, {
        method: 'GET',
    })
    .then((data) => {
        console.log('Successful GET request:', data);

    })
saveNote.addEventListener('click', () => {

    const newNote = {
        title: noteTitle.value.trim(),
        text: noteText.value.trim(),
        id: id.value.trim()
    };

    postNote(newNote)
        .then(alert(`Note added!`))
        .catch((err) => console.error(err))
});

noteList.addEventListener('click', (event) => {
    const element = event.target

    getNote(element)
        .then(
            noteTitle.value = element.dataset.note.title;
            noteText.value = element.dataset.note.text;
            alert(`Note displayed!`);
        )
        .catch((err) => console.error(err))
})

getNotes();