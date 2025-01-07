const Note = require('../models/note.model');

const createNote = async (req, res) => {
  try {
    const { subject, title, content, image, file, tags } = req.body;
    const userId = req.user.userId;

    // Validate image size if present
    if (image && image.length > 5242880) { // 5MB limit
      return res.status(400).json({ message: 'Image size should be less than 5MB' });
    }

    const note = new Note({
      userId,
      subject,
      title,
      content,
      image,
      file,
      tags,
      date: new Date()
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const userId = req.user.userId;

    // Validate image size if present
    if (update.image && update.image.length > 5242880) { // 5MB limit
      return res.status(400).json({ message: 'Image size should be less than 5MB' });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { ...update, date: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};