import Boom from 'boom'
import bcrypt from 'bcrypt'

import UserSchema from '../UserSchema'

const verifyCredentials = (req, res) => {
  const password = req.payload.password

  UserSchema.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (user) => {
    if (user) {
      bcrypt.compare(password, user.password, (isValid) => {
        if (isValid) {
          res(user)
        } else {
          res(Boom.badRequest('Incorrect password!'))
        }
      })
    } else {
      res(Boom.badRequest('Incorrect username or email!'))
    }
  })
}

export default verifyCredentials
