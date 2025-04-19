const express = require('express');
const router = express.Router();

const {sequelize, Note} = require('../database/model');

router.get('/', async (req, res) => {

    let notes = await Note.findAll({
        order: [['createdAt', 'DESC']]
    });

    quotes = notes.map(note => note.toJSON());

    res.render('quote/list-quote', {
        title: 'Catatan',
        quotes
    });
})


router.get('/add-quote', (req, res) => {
  res.render('quote/add-quote', {
    title: 'Tambah Quote',
  });
});

router.post('/add-quote', async (req, res) => {

  await Note.create({ content: req.body.content });
  res.redirect('user/quote');

});

module.exports = router;
