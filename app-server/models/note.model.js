const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String // Base64 string for images
  },
  file: {
    name: String,
    type: String,
    url: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
