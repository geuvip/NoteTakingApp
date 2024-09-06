const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors()); // CORS ayarlarını yap
app.use(express.json());

// Dummy data
let notes = [
  { id: 1, text: 'Sample note', tag: 'Important' },
];

// Get notes
app.get('/notes', (req, res) => {
  res.json({ notes });
});

// Add note
app.post('/notes', (req, res) => {
  const { text, tag } = req.body;
  const newNote = { id: Date.now(), text, tag };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete note
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
