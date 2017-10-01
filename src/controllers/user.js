import UserSchema from '../models/User/UserSchema'

import { createToken } from '../models/User/utils/createToken'

export const Signup = (req, res, next) => {
  let {
    username,
    email,
    password,
    admin
  } = req.body
  console.log(req.body)

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

  newUser.save(function (err) {
    if (err) { return next(err) }
    // Repond to request indicating the user was created
    res.json({ token: createToken(newUser) })
  })
}

export const SignIn = (req, res, next) => {
  res.send({ token: createToken(req.user) })
}

export const AllUsers = (req, res, next) => {
  UserSchema.find({}, (err, users) => {
    if (err) { return next(err) }
    res.send(users)
  })
}
