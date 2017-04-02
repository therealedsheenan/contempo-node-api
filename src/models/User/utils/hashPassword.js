import bcrypt from 'bcrypt-nodejs'

export const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, cb, (err, salt) => {
    if (err) { return cb(err, salt) }
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash)
    })
  })
}
