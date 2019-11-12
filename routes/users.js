const express = require('express');
const router = express.Router();


const User = require('../models/user')


// Home
router.get('/', (req, res) => {
  res.render('/')
})

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

//Profile
router.get('/profile', (req, res) => {
  res.render('profile')
})

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Register User
router.post('/register', (req, res) => {
  console.log(req.body)

  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  //Validation
  req.checkBody('name', 'Put in a name bro').notEmpty()
  req.checkBody('email','Put in a email bro').notEmpty().isEmail()
  req.checkBody('username', 'I need a username').notEmpty()
  req.checkBody('password','I need a password').notEmpty()
  req.checkBody('password2','Passwords do not match').equals(req.body.password)


  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors_msg', 'NEW ERROR')
    // res.redirect('/register')

    res.render('register', {errors:errors})
  } else {
    let newUser = new username({
      name: name,
      email: email,
      username: username,
      password: password
    })

    User.create(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
      
    });

    req.flash('success_msg', 'You can now log in')

    res.redirect('/users/login')
  }
  
});

module.exports = router;
