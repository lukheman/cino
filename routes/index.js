var express = require('express');
var router = express.Router();

const { User } = require('../src/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('quote');
});


router.get('/about', (req, res) => {
    res.render('about', { title: 'akmal' });
});

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
    console.log(user);

    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'username tidak ditemukan'
      });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.render('login', {
        title: 'Login',
        error: 'Password salah'
      });
    }

    // Login berhasil (simulasi session, misalnya dengan req.session)
    // req.session.userId = user.id;
    res.redirect('/user/dashboard'); // redirect ke dashboard atau halaman lain
  } catch (err) {
    console.error(err);
    res.render('login', {
      title: 'Login',
      error: 'Terjadi kesalahan. Coba lagi nanti.'
    });
  }
});

module.exports = router;
