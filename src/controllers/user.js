import UserSchema from '../models/User/UserSchema'
import { hashPassword } from '../models/User/utils/hashPassword'
import { createToken } from '../models/User/utils/createToken'

export const Signup = (req, res, next) => {
  let {
    username,
    email,
    password,
    admin
  } = req.body

  if (!email || !password || !username) {
    return res
      .status(422)
      .send({error: 'You must provide email and password'})
  }

  const newUser = new UserSchema({
    email: email,
    username: username,
    password: password,
    admin: admin
  })

  hashPassword(password, (err, hash) => {
    if (err) { return err }
    // assign generated hash to newUser
    newUser.password = hash

    newUser.save((err) => {
      if (err) { return next(err) }
      // Repond to request indicating the user was created
      res.json({ token: createToken(newUser) })
    })
  })
}
