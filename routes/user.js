const express = require('express');
const router = express.Router();
const { User, Note } = require('../src/database');
const bcrypt = require('bcrypt');

const isAuthenticated = require('../middlewares/auth');

router.use(isAuthenticated);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/dashboard', async (req, res) => {
  let notes = await Note.findAll({
      order: [['createdAt', 'DESC']]
  });

  quotes = notes.map(note => note.toJSON());

  res.render('user/dashboard', {
    title: 'Dashboard',
    quotes
  });
});

router.post('/add-quote', async (req, res) => {
  await Note.create({ content: req.body.content });
  res.redirect('/user/dashboard');
});

router.put('/update-quote/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);

  console.log(note);

    if (!note) {
      req.flash('error', 'Quote not found');
      res.redirect('/user/dashboard');
    }

  await note.update({ content: req.body.content });
  res.redirect('/user/dashboard');
});


router.delete('/dashboard/quote/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Note.destroy({ where: { id } });
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Gagal menghapus quote:', error);
    res.status(500).send('Terjadi kesalahan saat menghapus quote.');
  }
});

module.exports = router;
