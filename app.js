const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy 
const mongo = require('mongodb')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

mongoose.connect('mongodb://localhost/finalterm2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
mongoose.set('useCreateIndex', true) 

const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users')

const app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
require('dotenv').config()

//bodyParser middleware FROM BRADS APP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

// Express Session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
     useNewUrlParser: true,
    store: new MongoStore({
      // url: process.env.MONGODB_URI,
      mongooseConnection: mongoose.connection,
      autoReconnect: true
    }),
    cookie: {
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
)

//Connect Flash
app.use(flash())

//Passport Init
app.use(passport.initialize())
app.use(passport.session())

//ExpressValidator
app.use(
  expressValidator({
    errorFormatter: (param, message, value) => {
      const namespace = param.split('.')
      const root = namespace.shift()
      let formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }

      return {
        param: formParam,
        message: message,
        value: value
      }
    }
  })
)

//Global Variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error')
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})




module.exports = app
