const express = require('express');
const router = express.Router();

const {sequelize, Note} = require('../src/database')

router.get('/', async (req, res) => {

    let notes = await Note.findAll({
        order: [['createdAt', 'DESC']]
    });

    notes = notes.map(note => note.toJSON());

    res.render('note/list-note', {
        title: 'Catatan',
        notes
    });
})

router.get('/add', async (req, res) => {
    res.render('note/add-note', {
        title: 'Tambah Catatan'
    });
})

router.post('/add', async (req, res) => {

    await Note.create({ 'content': req.body.content})

    res.redirect('/note');

})

module.exports = router;
