const express = require('express');
const router = express.Router();
const { Note, User } = require('../../database/model');

const isAuthenticated = require('../../middlewares/authenticated');

router.use(isAuthenticated);

// Create a Note
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    authorId = req.session.userId;

    const user = await User.findByPk(authorId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const note = await Note.create({ content, authorId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all Notes (with User details)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single Note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Note
router.put('/:id', async (req, res) => {
  try {
    const { content, authorId } = req.body;
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (authorId) {
      const user = await User.findByPk(authorId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }
    await note.update({ content, authorId });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    await note.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
