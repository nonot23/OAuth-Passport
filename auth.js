const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    try {
      if (!profile) {
        throw new Error('Failed to retrieve Google profile');
      }
      return done(null, profile); // Assuming successful authentication
    } catch (error) {
      console.error(error);
      return done(error); // Pass error to the callback
    }
}))

passport.serializeUser( (user, done) => {
    done(null, user);
})
passport.deserializeUser( (user, done) => {
    done(null, user);
})
