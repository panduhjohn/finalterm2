const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'My crappy lil app' });
});

router.get('/main', (req, res, next) => {
  res.render('main', { title: 'My crappy main page' })
})

// router.get('/login', (req, res) => {
   // req.flash('success_msg', 'User successfully logged in')
//   res.render('login')
// })

router.get('/register', (req, res) => {
  res.render('register')
})



router.get('/dashboard', (req, res) => {
  
  

  res.render('dashboard')
})

module.exports = router;
