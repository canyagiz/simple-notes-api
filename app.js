import express from 'express';
import { getNotes, getNote, createNote, deleteNote, updateNote, truncateNotes } from "./database.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("this should be main page");
})

app.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const notes = await getNote(id);
    res.send(notes);
})

app.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    const newNote = await createNote(title, content);
    res.status(201).send(newNote);
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, ()=> {
    console.log('Server is running on port 8080')  // listening on port 8080
})