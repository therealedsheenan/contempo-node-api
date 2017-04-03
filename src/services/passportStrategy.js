import passport from 'passport'
import UserSchema from '../models/User/UserSchema'

import LocalStrategy from 'passport-local'

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const secret = process.env.SECRET_KEY

// local strategy(username, password, email)
passport.use(new LocalStrategy(function (username, password, done) {
  UserSchema.findOne({
    $or: [
      { email: username },
      { username: username }
    ]
  }, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    // if (!user.verifyPassword(password)) { return done(null, false) }
    user.verifyPassword(password, function (err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }
      return done(null, user)
    })
    return done(null, user)
  })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
}

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  UserSchema.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}))
