import './App.css';
import { useState } from 'react'

// const Note = {
//   id: Number;
//   title: String;
//   content: String
// };

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Title 1",
      content: "Content 1",
    },
    {
      id: 2,
       title: "Title 2",
      content: "Content 2",
    },
    {
      id: 3,
      title: "Title 3",
      content: "Content 3",
    },
    {
      id: 4,
      title: "Title 4",
      content: "Content 4",
    } 
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);

    const newNote = {
      id: notes.length+1,
      title: title,
      content: content,
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
   <div className="app-container"> 
    <form className="note-form" onSubmit={(event) => handleSubmit(event)}>
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
      <button type="submit">Add Note</button>
    </form>
    <div className="notes-grid">
      {notes.map((note)=> (
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
   </div>
  );
}

export default App;
