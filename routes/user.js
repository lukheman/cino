const express = require('express');
const router = express.Router();
const { User, Note } = require('../src/database');
const bcrypt = require('bcrypt');

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

router.get('/dashboard/add-quote', (req, res) => {
  res.render('user/add-quote', {
    title: 'Tambah Quote',
  });
});

router.post('/dashboard/add-quote', async (req, res) => {
  console.log(req.body.content);
  await Note.create({ content: req.body.content });
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
