const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')
const session = require('express-session') 
require('./auth')

app.use(express.json())
app.use(express.static(path.join(__dirname, "client")))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req,res,next) => {
  if(req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success', isLoggedIn, (req,res) => {
  res.send(`Welcome ${req.user.displayName}`)
})

app.get('/auth/google/failure', (req,res) => {
    res.send('Login ล้มเหลว')
})

app.listen(3000,() => {
    console.log('Server running')
})