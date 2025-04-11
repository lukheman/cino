function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // lanjut ke route berikutnya
  }

  // Jika belum login
  res.redirect('/login');
}

module.exports = isAuthenticated;
