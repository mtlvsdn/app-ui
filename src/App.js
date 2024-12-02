import './App.css';
import { useState } from 'react'

// const Note = {
//   id: Number,
//   title: String,
//   content: String,
// };

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Title 1",
      content: "Content 1",
      image: null,
    },
    {
      id: 2,
      title: "Title 2",
      content: "Content 2",
      image: null,
    },
    {
      id: 3,
      title: "Title 3",
      content: "Content 3",
      image: null,
    },
    {
      id: 4,
      title: "Title 4",
      content: "Content 4",
      image: null,
    } 
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // New state for the image
  const [selectedNote, setSelectedNote] = useState (null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote  = (event) => {
    event.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);

    const newNote = {
      id: notes.length+1,
      title: title,
      content: content,
      image: image, // Include image in the new note
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setImage(null); //sets a new image as null value
  };

  const handleUpdateNote  = (event) => {
    event.preventDefault();
    if(!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
      image: image, // Include updated image
    }

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
      ? updatedNote
      :note
    )

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null);
    setImage(null); //updates the value of the image to null
  };

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
    setImage(null); //updates the value of the image to null
  };

  const deleteNote = (event, noteId) => {
    event.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result); // Store image as a base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
   <div className="app-container"> 
    <form className="note-form" onSubmit={(event) => selectedNote
      ? handleUpdateNote(event)
      : handleAddNote(event)
    }>
      <input
        value={title}
        onChange={(event)=>setTitle(event.target.value)}
        placeholder="Title"
        required
      ></input>
      <textarea
        value={content}
        onChange={(event)=>setContent(event.target.value)}
        placeholder="Content"
        rows={10}
        required
      ></textarea>
       <input type="file" accept="image/*" onChange={handleImageChange}></input>

      {selectedNote ? (
        <div className='edit-buttons'>
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
    <div className="notes-grid">
      {notes.map((note)=> (
        <div className="note-item"
        onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(event) => deleteNote(event, note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {note.image && <img src={note.image} alt="Note" style={{ width: "100%" }} />}
        </div>
      ))}
    </div>
   </div>
  );
}

export default App;
