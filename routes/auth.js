const express = require('express');

const router = express.Router();

const { User } = require('../database/model');

const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    error: null
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'username tidak ditemukan'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = password === user.password;

    if (!isMatch) {
      return res.render('login', {
        title: 'Login',
        error: 'Password salah'
      });
    }

    // Login berhasil (simulasi session, misalnya dengan req.session)
    req.session.userId = user.id;
    res.redirect('/user/dashboard'); // redirect ke dashboard atau halaman lain
  } catch (err) {
    res.render('login', {
      title: 'Login',
      error: 'Terjadi kesalahan. Coba lagi nanti.'
    });
  }
});

module.exports = router;
