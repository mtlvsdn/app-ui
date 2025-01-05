const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

// Routes
router.post('/', notesController.createNote);
router.get('/', notesController.getNotes);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;