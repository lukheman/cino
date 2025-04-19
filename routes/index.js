var express = require('express');
var router = express.Router();

const { User } = require('../database/model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('quote');
});


// router.get('/about', (req, res) => {
//     res.render('about', { title: 'akmal' });
// });


module.exports = router;
