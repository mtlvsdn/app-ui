import './App.css';
import { useState } from 'react'
import SearchComponent from './SearchComponent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import React, {useEffect } from 'react';

// const Note = {
//   id: Number,
//   title: String,
//   content: String,
// };

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      subject: "Matematica",
      title: "Title 1",
      content: "Content 1",
      image: null,
      file: null,
      date: new Date().toLocaleString(),
      tags: ["cool", "insiprational", "brave", "math"],
    },
    {
      id: 2,
      subject: "Informatica",
      title: "Title 2",
      content: "Content 2",
      image: null,
      file: null,
      date: new Date().toLocaleString(),
      tags: ["cool", "insiprational", "brave", "info"],
    },
    {
      id: 3,
      subject: "Economie",
      title: "Title 3",
      content: "Content 3",
      image: null,
      file: null,
      date: new Date().toLocaleString(),
      tags: ["cool", "insiprational", "brave", "economics 2.0"],
    },
    {
      id: 4,
      subject: "Contabilitate",
      title: "Title 4",
      content: "Content 4",
      image: null,
      file: null,
      date: new Date().toLocaleString(),
      tags: ["cool", "insiprational", "brave", "accounting"],
    } 
  ]);

  const isAuthenticated = false;
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // New state for the image
  const [file, setFile] = useState(null);
  const [selectedNote, setSelectedNote] = useState (null);
  const [isSorted, setIsSorted] = useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

const [filteredNotes, setFilteredNotes] = useState(notes);

const handleSearch = (searchTerm, category) => {
  if (!searchTerm.trim()) {
    setFilteredNotes(notes);
    return;
  }

  const filtered = notes.filter(note => {
    const term = searchTerm.toLowerCase().trim();
    
    switch(category) {
      case 'title':
        return note.title.toLowerCase().includes(term);
      
      case 'subject':
        return note.subject.toLowerCase().includes(term);
      
      case 'tag':
        return note.tags.some(tag => 
          tag.toLowerCase().includes(term)
        );
      
      default:
        return true;
    }
  });

  setFilteredNotes(filtered);
};

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault(); // Prevent form submission
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


  const handleSort = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      // Case-insensitive sorting
      return a.subject.localeCompare(b.subject);
    });
    setNotes(sortedNotes);
    setIsSorted(!isSorted);
  };

  const handleSortByDate = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
    setNotes(sortedNotes);
    setIsSortedByDate(!isSortedByDate);
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setSubject(note.subject);
    setTitle(note.title);
    setContent(note.content);
    setImage(note.image);
    setFile(note.file);
    setTags(note.tags || []);
  }

  const handleAddNote = async (event) => {
    event.preventDefault();
    
    const newNote = {
      subject,
      title,
      content,
      image,
      file,
      tags
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newNote)
      });
  
      if (response.ok) {
        const savedNote = await response.json();
        setNotes([savedNote, ...notes]);
        setSubject("");
        setTitle("");
        setContent("");
        setImage(null);
        setTags([]);
      } else {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleUpdateNote  = (event) => {
    event.preventDefault();
    if(!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      subject: subject,
      title: title,
      content: content,
      image: image, // Include updated image
      file: file,
      date: new Date().toLocaleString(),
      tags: tags,
    }

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
      ? updatedNote
      :note
    )

    setNotes(updatedNotesList)
    setSubject("")
    setTitle("")
    setContent("")
    setSelectedNote(null);
    setImage(null); //updates the value of the image to null
    setFile(null);
    setTags([]);
  };

  const handleCancel = () => {
    setSubject("")
    setTitle("")
    setContent("")
    setSelectedNote(null);
    setImage(null); //updates the value of the image to null
    setFile(null);
    setTags([]);
  };

  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        const updatedNotes = notes.filter((note) => note._id !== noteId);
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = () => {
      if (file.type.startsWith("image/")) {
        setImage(reader.result); // For images
      } else {
        setFile({
          name: file.name,
          type: file.type,
          url: reader.result, // Base64 or URL
        });
      }
    };
  
    reader.readAsDataURL(file);
  };
  

  return (
    <div>
      <nav className="toolbar">
      <div className="toolbar-brand">
        NotesApp
      </div>
      <div className="toolbar-content">
        <SearchComponent onSearch={handleSearch} />
        <div className="user-section">
          <span className="username">John Doe</span>
          <button className="logout-button">Log Out</button>
      </div>
</div>
    </nav>
    <div className="app-container"> 
    <div>
        <form className="note-form" onSubmit={(event) => selectedNote
          ? handleUpdateNote(event)
          : handleAddNote(event)
        }>
          <input
            value={subject}
            onChange={(event)=>setSubject(event.target.value)}
            placeholder="Subject"
            required
          ></input>
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
          <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange}></input>
          <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags (press Enter after each tag)"
              className="tag-input"
            />
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      removeTag(tag);
                    }}
                    className="tag-remove"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>

          {selectedNote ? (
            <div className='edit-buttons'>
              <button type="submit">Save</button>
              <button className="cancel_button" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>

        <div className='empty'></div>
        <button 
            className="sort-button" 
            onClick={handleSort}
          >{"Sort by Subject"}
          </button>
          <button 
            className="sort-button" 
            onClick={handleSortByDate}
          >
            Sort by Date
          </button>
      </div>

      <div className="notes-grid">
        {filteredNotes.map((note)=> (
          <div className="note-item"
          onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <div className='subject_wrapper'><h3 className='subject'>{note.subject}</h3></div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {note.image && <img src={note.image} alt="Note" style={{ width: "100%" }} />}
            {note.file && note.file.type === "application/pdf" && (
              <iframe
                src={note.file.url}
                title="PDF Preview"
                style={{ width: "100%", height: "400px" }}
              ></iframe>
            )}
            {note.file && note.file.type.includes("word") && (
              <a href={note.file.url} target="_blank" rel="noopener noreferrer">
                View or Download Word Document
              </a>
            )}
            {note.file &&
              !note.file.type.includes("image") &&
              !note.file.type.includes("pdf") &&
              !note.file.type.includes("word") && (
                <a href={note.file.url} target="_blank" rel="noopener noreferrer">
                  Download {note.file.name}
                </a>
              )}
              <div className="note-item"
              onClick={() => handleNoteClick(note)}>
              {/* ... existing note display ... */}
              <div className="note-tags">
                {note.tags && note.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
            <p className="note-date">Last modified: {note.date}</p>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}

export default App;
