const Note = require('../models/note.model');

const createNote = async (req, res) => {
  try {
    const { subject, title, content, image, file, tags } = req.body;
    const userId = req.user.userId; // From auth middleware

    const note = new Note({
      userId,
      subject,
      title,
      content,
      image,
      file,
      tags
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
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

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      update,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
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