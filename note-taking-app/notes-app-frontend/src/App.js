import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrashAlt, FaStickyNote, FaTag } from 'react-icons/fa';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [tagText, setTagText] = useState('');

  useEffect(() => {
    // Fetch notes from backend
    axios.get('http://localhost:5001/notes')
      .then(response => {
        setNotes(response.data.notes);
      })
      .catch(error => {
        console.error('There was an error fetching notes!', error);
      });
  }, []);

  const addNote = () => {
    if (noteText.trim() !== '' && tagText.trim() !== '') {
      axios.post('http://localhost:5001/notes', { text: noteText, tag: tagText })
        .then(response => {
          setNotes([...notes, { id: response.data.id, text: noteText, tag: tagText }]);
          setNoteText('');
          setTagText('');
        })
        .catch(error => {
          console.error('There was an error adding the note!', error);
        });
    }
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5001/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the note!', error);
      });
  };

  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}><FaStickyNote /> Notes</h2>
        <div style={styles.inputContainer}>
          <div style={styles.inputGroup}>
            <FaStickyNote style={styles.icon} />
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Note"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <FaTag style={styles.icon} />
            <input
              type="text"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              placeholder="Tag"
              style={styles.input}
            />
          </div>
          <button onClick={addNote} style={styles.addButton}>
            <FaPlus /> Add Note
          </button>
        </div>
        <div style={styles.noteList}>
          {notes.map((note) => (
            <div key={note.id} style={styles.noteListItem}>
              <p>{note.text} <span style={styles.tag}>#{note.tag}</span></p>
              <button onClick={() => deleteNote(note.id)} style={styles.deleteButton}>
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styling
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f5',
  },
  sidebar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    maxWidth: '100%',
  },
  sidebarTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    marginRight: '10px',
    color: '#888',
  },
  input: {
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 20px',
    marginTop: '10px',
    fontSize: '16px',
    backgroundColor: '#007aff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  noteList: {
    marginTop: '20px',
  },
  noteListItem: {
    backgroundColor: '#fafafa',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    color: '#007aff',
    fontStyle: 'italic',
    marginLeft: '5px',
  },
};

export default App;
