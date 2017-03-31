import Boom from 'boom'

import UserSchema from '../UserSchema'

const verifyUniqueUser = (req, res) => {
  UserSchema.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (user) => {
    if (user) {
      if (user.username === req.payload.username) {
        res(Boom.badRequest('Username taken'))
        return
      }

      if (user.email === req.payload.email) {
        res(Boom.badRequest('Email taken'))
        return
      }
    }
    res(req.payload)
  })
}

export default verifyUniqueUser
