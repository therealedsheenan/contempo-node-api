import jwt from 'jsonwebtoken'
import UserSchema from '../models/User/UserSchema'
import bcrypt from 'bcrypt-nodejs'
const secret = process.env.SECRET_KEY

const createUserToken = (user) => {
  return jwt.sign({
    sub: user.id,
    username: user.username,
    email: user.email
  }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })
}

const hashPassword = (password, cb) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash)
    })
  })
}

export const Signup = (req, res, next) => {
  let {
    username,
    email,
    password,
    admin
  } = req.body

  if (!email || !password) {
    return res
      .status(422)
      .send({error: 'You must provide email and password'})
  }

  // See if a user with the given email exists
  UserSchema.findOne({
    $or: [
      { email: req.body.email },
      { username: req.body.username }
    ]
  }, (err, user) => {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (user) {
      if (user.username === req.payload.username) {
        return res.status(422).send({ error: 'Username is in use' })
      }

      if (user.email === req.payload.email) {
        return res.status(422).send({ error: 'Email is in use' })
      }
    }

    // If a user with email does NOT exist, create and save user record
    const newUser = new UserSchema({
      email: email,
      username: username,
      password: password,
      admin: admin
    })

    newUser.save((err) => {
      if (err) { return next(err) }

      // Repond to request indicating the user was created
      res.json({ token: createUserToken(newUser) })
    })
  })
}
